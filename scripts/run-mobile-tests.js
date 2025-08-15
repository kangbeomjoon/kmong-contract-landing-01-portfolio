#!/usr/bin/env node

/**
 * 모바일 섹션 테스트 최적화 실행 스크립트
 * Android/iOS 디바이스별 병렬 실행 및 성능 보고서 생성
 */

const { execSync, spawn } = require('child_process');
const fs = require('fs');
const path = require('path');

// 테스트 설정
const TEST_CONFIG = {
  // 모바일 디바이스 프로젝트들
  mobileProjects: [
    'Android Chrome - Galaxy S21',
    'Android Chrome - Pixel 5',
    'iOS Safari - iPhone 12',
    'iOS Safari - iPhone 12 Pro'
  ],
  
  // 태블릿 디바이스 프로젝트들
  tabletProjects: [
    'Android Tablet - Galaxy Tab',
    'iOS Safari - iPad'
  ],
  
  // 테스트 스위트별 설정
  testSuites: {
    'visual-regression': {
      file: 'tests/e2e/mobile-sections-visual-regression.spec.ts',
      timeout: 120000, // 2분
      retries: 2
    },
    'animation-performance': {
      file: 'tests/e2e/mobile-animation-performance.spec.ts',
      timeout: 180000, // 3분
      retries: 1
    },
    'cross-platform': {
      file: 'tests/e2e/cross-platform-compatibility.spec.ts',
      timeout: 90000, // 1.5분
      retries: 2
    }
  }
};

// 컬러 출력 헬퍼
const colors = {
  reset: '\x1b[0m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m'
};

function colorLog(color, message) {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

// 디렉토리 생성 확인
function ensureDirectoryExists(dirPath) {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
    colorLog('cyan', `✓ Created directory: ${dirPath}`);
  }
}

// 테스트 결과 디렉토리 초기화
function initializeTestDirectories() {
  const dirs = [
    'tests/screenshots/actual',
    'tests/screenshots/baseline',
    'tests/reports',
    'tests/performance'
  ];
  
  dirs.forEach(ensureDirectoryExists);
}

// Playwright 서버 시작 확인
async function checkPlaywrightServer() {
  try {
    const response = await fetch('http://localhost:3001/');
    return response.ok;
  } catch (error) {
    return false;
  }
}

// 개발 서버 시작
function startDevServer() {
  return new Promise((resolve, reject) => {
    colorLog('cyan', '🚀 Starting development server...');
    
    const server = spawn('npm', ['run', 'dev'], {
      stdio: 'pipe',
      env: { ...process.env, PORT: '3001' }
    });
    
    let serverReady = false;
    
    server.stdout.on('data', (data) => {
      const output = data.toString();
      if (output.includes('Local:') && !serverReady) {
        serverReady = true;
        colorLog('green', '✓ Development server is ready');
        resolve(server);
      }
    });
    
    server.stderr.on('data', (data) => {
      const error = data.toString();
      if (error.includes('EADDRINUSE')) {
        colorLog('yellow', '⚠ Server already running on port 3001');
        resolve(null); // 서버가 이미 실행 중
      }
    });
    
    setTimeout(() => {
      if (!serverReady) {
        colorLog('yellow', '⚠ Server startup timeout - assuming already running');
        resolve(null);
      }
    }, 15000);
  });
}

// 단일 테스트 스위트 실행
function runTestSuite(suiteName, projects = null, options = {}) {
  return new Promise((resolve, reject) => {
    const suite = TEST_CONFIG.testSuites[suiteName];
    if (!suite) {
      reject(new Error(`Unknown test suite: ${suiteName}`));
      return;
    }
    
    const projectFlag = projects ? `--project="${projects.join('" --project="')}"` : '';
    const timeoutFlag = `--timeout=${suite.timeout}`;
    const retriesFlag = `--retries=${suite.retries}`;
    
    const command = `npx playwright test ${suite.file} ${projectFlag} ${timeoutFlag} ${retriesFlag} --reporter=html,line,json`;
    
    colorLog('blue', `\n🧪 Running ${suiteName} tests...`);
    colorLog('cyan', `Command: ${command}`);
    
    const startTime = Date.now();
    
    try {
      const result = execSync(command, { 
        stdio: 'inherit',
        cwd: process.cwd(),
        timeout: suite.timeout + 30000 // 추가 버퍼 시간
      });
      
      const duration = Date.now() - startTime;
      colorLog('green', `✓ ${suiteName} completed in ${Math.round(duration / 1000)}s`);
      resolve({ success: true, duration });
    } catch (error) {
      const duration = Date.now() - startTime;
      colorLog('red', `✗ ${suiteName} failed after ${Math.round(duration / 1000)}s`);
      resolve({ success: false, duration, error: error.message });
    }
  });
}

// 테스트 결과 분석
function analyzeTestResults() {
  try {
    // HTML 보고서 경로 확인
    const reportPath = path.join(process.cwd(), 'playwright-report', 'index.html');
    if (fs.existsSync(reportPath)) {
      colorLog('cyan', `📊 HTML Report: file://${reportPath}`);
    }
    
    // JSON 결과 분석
    const jsonResultPath = path.join(process.cwd(), 'test-results.json');
    if (fs.existsSync(jsonResultPath)) {
      const results = JSON.parse(fs.readFileSync(jsonResultPath, 'utf8'));
      
      const summary = {
        total: results.suites?.reduce((acc, suite) => acc + suite.specs?.length || 0, 0) || 0,
        passed: 0,
        failed: 0,
        skipped: 0
      };
      
      // 결과 통계 계산
      results.suites?.forEach(suite => {
        suite.specs?.forEach(spec => {
          spec.tests?.forEach(test => {
            if (test.results?.[0]?.status === 'passed') summary.passed++;
            else if (test.results?.[0]?.status === 'failed') summary.failed++;
            else if (test.results?.[0]?.status === 'skipped') summary.skipped++;
          });
        });
      });
      
      colorLog('cyan', '\n📈 Test Results Summary:');
      colorLog('green', `  ✓ Passed: ${summary.passed}`);
      colorLog('red', `  ✗ Failed: ${summary.failed}`);
      colorLog('yellow', `  ⊘ Skipped: ${summary.skipped}`);
      colorLog('blue', `  📊 Total: ${summary.total}`);
      
      return summary;
    }
  } catch (error) {
    colorLog('yellow', `⚠ Could not analyze test results: ${error.message}`);
  }
  
  return null;
}

// 스크린샷 정리 및 비교
function organizeScreenshots() {
  const actualDir = path.join(process.cwd(), 'tests', 'screenshots', 'actual');
  const baselineDir = path.join(process.cwd(), 'tests', 'screenshots', 'baseline');
  
  if (!fs.existsSync(actualDir)) return;
  
  const actualFiles = fs.readdirSync(actualDir);
  const devices = [...TEST_CONFIG.mobileProjects, ...TEST_CONFIG.tabletProjects];
  
  colorLog('cyan', '\n📸 Screenshot Summary:');
  
  devices.forEach(device => {
    const deviceFiles = actualFiles.filter(file => file.includes(device.replace(/[^a-zA-Z0-9]/g, '')));
    if (deviceFiles.length > 0) {
      colorLog('blue', `  ${device}: ${deviceFiles.length} screenshots`);
    }
  });
  
  // 기준선 이미지 복사 (첫 실행시)
  if (!fs.existsSync(baselineDir) || fs.readdirSync(baselineDir).length === 0) {
    ensureDirectoryExists(baselineDir);
    actualFiles.forEach(file => {
      const srcPath = path.join(actualDir, file);
      const destPath = path.join(baselineDir, file);
      fs.copyFileSync(srcPath, destPath);
    });
    colorLog('green', '✓ Baseline screenshots created');
  }
}

// 성능 보고서 생성
function generatePerformanceReport(testResults) {
  const reportDir = path.join(process.cwd(), 'tests', 'reports');
  ensureDirectoryExists(reportDir);
  
  const report = {
    timestamp: new Date().toISOString(),
    testResults,
    devices: {
      mobile: TEST_CONFIG.mobileProjects,
      tablet: TEST_CONFIG.tabletProjects
    },
    summary: {
      totalDuration: testResults.reduce((acc, result) => acc + (result.duration || 0), 0),
      successRate: testResults.filter(r => r.success).length / testResults.length * 100
    }
  };
  
  const reportPath = path.join(reportDir, `mobile-test-report-${Date.now()}.json`);
  fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));
  
  colorLog('cyan', `\n📋 Performance report saved: ${reportPath}`);
  return report;
}

// 메인 실행 함수
async function main() {
  const args = process.argv.slice(2);
  const mode = args[0] || 'all';
  
  console.log('\n🎭 Mobile Sections Test Runner\n');
  
  // 디렉토리 초기화
  initializeTestDirectories();
  
  // 개발 서버 시작
  const server = await startDevServer();
  
  try {
    let testResults = [];
    
    switch (mode) {
      case 'visual':
        colorLog('magenta', '🎨 Running Visual Regression Tests');
        testResults.push(await runTestSuite('visual-regression', TEST_CONFIG.mobileProjects));
        break;
        
      case 'performance':
        colorLog('magenta', '⚡ Running Animation Performance Tests');
        testResults.push(await runTestSuite('animation-performance', TEST_CONFIG.mobileProjects));
        break;
        
      case 'compatibility':
        colorLog('magenta', '🔄 Running Cross-Platform Compatibility Tests');
        testResults.push(await runTestSuite('cross-platform', [...TEST_CONFIG.mobileProjects, ...TEST_CONFIG.tabletProjects]));
        break;
        
      case 'mobile':
        colorLog('magenta', '📱 Running All Mobile Tests');
        for (const [suiteName] of Object.entries(TEST_CONFIG.testSuites)) {
          testResults.push(await runTestSuite(suiteName, TEST_CONFIG.mobileProjects));
        }
        break;
        
      case 'all':
      default:
        colorLog('magenta', '🚀 Running Complete Test Suite');
        for (const [suiteName] of Object.entries(TEST_CONFIG.testSuites)) {
          testResults.push(await runTestSuite(suiteName, [...TEST_CONFIG.mobileProjects, ...TEST_CONFIG.tabletProjects]));
        }
        break;
    }
    
    // 결과 분석
    const summary = analyzeTestResults();
    organizeScreenshots();
    const report = generatePerformanceReport(testResults);
    
    // 최종 결과 출력
    const successCount = testResults.filter(r => r.success).length;
    const totalCount = testResults.length;
    
    colorLog('cyan', '\n🏁 Test Execution Complete');
    colorLog(successCount === totalCount ? 'green' : 'yellow', 
      `Success Rate: ${successCount}/${totalCount} (${Math.round(successCount/totalCount*100)}%)`);
    
    if (summary) {
      const passRate = summary.total > 0 ? Math.round(summary.passed / summary.total * 100) : 0;
      colorLog(passRate >= 90 ? 'green' : passRate >= 70 ? 'yellow' : 'red',
        `Test Pass Rate: ${passRate}%`);
    }
    
    process.exit(successCount === totalCount ? 0 : 1);
    
  } catch (error) {
    colorLog('red', `\n❌ Test execution failed: ${error.message}`);
    process.exit(1);
  } finally {
    // 서버 정리
    if (server && server.kill) {
      server.kill('SIGTERM');
      colorLog('cyan', '🛑 Development server stopped');
    }
  }
}

// CLI 도움말
if (process.argv.includes('--help') || process.argv.includes('-h')) {
  console.log(`
🎭 Mobile Sections Test Runner

Usage: node scripts/run-mobile-tests.js [mode]

Modes:
  visual        Run visual regression tests only
  performance   Run animation performance tests only  
  compatibility Run cross-platform compatibility tests only
  mobile        Run all tests on mobile devices only
  all           Run complete test suite (default)

Examples:
  node scripts/run-mobile-tests.js visual
  node scripts/run-mobile-tests.js performance
  node scripts/run-mobile-tests.js all
`);
  process.exit(0);
}

// 스크립트 실행
main().catch(error => {
  colorLog('red', `Fatal error: ${error.message}`);
  process.exit(1);
});