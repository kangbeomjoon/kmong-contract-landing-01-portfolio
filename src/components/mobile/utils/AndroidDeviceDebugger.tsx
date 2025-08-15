'use client';

import React, { useState, useEffect, useRef } from 'react';
import { detectAndroid, getAndroidVersion } from './android-optimized';

interface PerformanceMetrics {
  fps: number;
  memoryUsage: number;
  networkDelay: number;
  renderTime: number;
  touchLatency: number;
  isLowPerformance: boolean;
}

interface DeviceInfo {
  userAgent: string;
  isWebView: boolean;
  isChrome: boolean;
  chromeVersion: string;
  androidVersion: number | null;
  viewportSize: { width: number; height: number };
  pixelRatio: number;
  gpuInfo: {
    vendor: string;
    renderer: string;
    webglSupported: boolean;
  };
}

interface AndroidDeviceDebuggerProps {
  enabled?: boolean;
  showOverlay?: boolean;
  onPerformanceIssue?: (metrics: PerformanceMetrics) => void;
  onDeviceInfoReady?: (info: DeviceInfo) => void;
}

export const AndroidDeviceDebugger: React.FC<AndroidDeviceDebuggerProps> = ({
  enabled = process.env.NODE_ENV === 'development',
  showOverlay = false,
  onPerformanceIssue,
  onDeviceInfoReady
}) => {
  const [metrics, setMetrics] = useState<PerformanceMetrics>({
    fps: 0,
    memoryUsage: 0,
    networkDelay: 0,
    renderTime: 0,
    touchLatency: 0,
    isLowPerformance: false
  });

  const [deviceInfo, setDeviceInfo] = useState<DeviceInfo | null>(null);
  const [isVisible, setIsVisible] = useState(showOverlay);
  const [logs, setLogs] = useState<string[]>([]);

  const frameCountRef = useRef(0);
  const lastTimeRef = useRef(performance.now());
  const animationFrameRef = useRef<number | undefined>(undefined);
  const touchStartTimeRef = useRef(0);

  // 디바이스 정보 수집
  useEffect(() => {
    if (!enabled) return;

    const collectDeviceInfo = async (): Promise<DeviceInfo> => {
      const userAgent = navigator.userAgent;
      const isWebView = userAgent.includes('wv') || 
                       (userAgent.includes('Version/') && userAgent.includes('Chrome/'));
      const isChrome = userAgent.includes('Chrome/') && !isWebView;
      const chromeVersion = userAgent.match(/Chrome\/(\d+)/)?.[1] || 'unknown';
      const androidVersion = getAndroidVersion();

      const viewportSize = {
        width: Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0),
        height: Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0)
      };

      const pixelRatio = window.devicePixelRatio || 1;

      // GPU 정보 수집
      const canvas = document.createElement('canvas');
      const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
      const webglContext = gl as WebGLRenderingContext | null;
      const gpuInfo = {
        vendor: webglContext?.getParameter(webglContext.VENDOR) || 'unknown',
        renderer: webglContext?.getParameter(webglContext.RENDERER) || 'unknown',
        webglSupported: !!gl
      };

      return {
        userAgent,
        isWebView,
        isChrome,
        chromeVersion,
        androidVersion,
        viewportSize,
        pixelRatio,
        gpuInfo
      };
    };

    collectDeviceInfo().then(info => {
      setDeviceInfo(info);
      onDeviceInfoReady?.(info);
      addLog(`Device Info Collected: ${info.isWebView ? 'WebView' : 'Chrome'} ${info.chromeVersion}`);
    });
  }, [enabled, onDeviceInfoReady]);

  // FPS 모니터링
  useEffect(() => {
    if (!enabled) return;

    const measureFPS = () => {
      frameCountRef.current++;
      const currentTime = performance.now();

      if (currentTime - lastTimeRef.current >= 1000) {
        const fps = frameCountRef.current;
        frameCountRef.current = 0;
        lastTimeRef.current = currentTime;

        setMetrics(prev => {
          const newMetrics = { ...prev, fps };
          
          // 성능 이슈 감지
          if (fps < 30 && !prev.isLowPerformance) {
            newMetrics.isLowPerformance = true;
            onPerformanceIssue?.(newMetrics);
            addLog(`Low FPS detected: ${fps}fps`);
          } else if (fps >= 45 && prev.isLowPerformance) {
            newMetrics.isLowPerformance = false;
            addLog(`FPS recovered: ${fps}fps`);
          }

          return newMetrics;
        });
      }

      animationFrameRef.current = requestAnimationFrame(measureFPS);
    };

    measureFPS();

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [enabled, onPerformanceIssue]);

  // 메모리 모니터링
  useEffect(() => {
    if (!enabled) return;

    const monitorMemory = () => {
      const performanceMemory = (performance as Performance & { memory?: { usedJSHeapSize: number; jsHeapSizeLimit: number } }).memory;
      if (performanceMemory) {
        const { usedJSHeapSize, jsHeapSizeLimit } = performanceMemory;
        const memoryUsage = (usedJSHeapSize / jsHeapSizeLimit) * 100;

        setMetrics(prev => {
          const newMetrics = { ...prev, memoryUsage };
          
          if (memoryUsage > 80) {
            addLog(`High memory usage: ${memoryUsage.toFixed(1)}%`);
          }

          return newMetrics;
        });
      }
    };

    const interval = setInterval(monitorMemory, 2000);
    return () => clearInterval(interval);
  }, [enabled]);

  // 터치 지연 측정
  useEffect(() => {
    if (!enabled) return;

    const handleTouchStart = () => {
      touchStartTimeRef.current = performance.now();
    };

    const handleTouchEnd = () => {
      const touchLatency = performance.now() - touchStartTimeRef.current;
      
      setMetrics(prev => {
        const newMetrics = { ...prev, touchLatency };
        
        if (touchLatency > 100) {
          addLog(`High touch latency: ${touchLatency.toFixed(1)}ms`);
        }

        return newMetrics;
      });
    };

    document.addEventListener('touchstart', handleTouchStart, { passive: true });
    document.addEventListener('touchend', handleTouchEnd, { passive: true });

    return () => {
      document.removeEventListener('touchstart', handleTouchStart);
      document.removeEventListener('touchend', handleTouchEnd);
    };
  }, [enabled]);

  // 렌더링 시간 측정
  useEffect(() => {
    if (!enabled) return;

    const measureRenderTime = () => {
      const startTime = performance.now();
      
      requestAnimationFrame(() => {
        const renderTime = performance.now() - startTime;
        
        setMetrics(prev => ({ ...prev, renderTime }));
        
        if (renderTime > 16.67) { // 60fps 기준
          addLog(`Slow render: ${renderTime.toFixed(1)}ms`);
        }
      });
    };

    const interval = setInterval(measureRenderTime, 1000);
    return () => clearInterval(interval);
  }, [enabled]);

  // 네트워크 지연 측정
  useEffect(() => {
    if (!enabled) return;

    const measureNetworkDelay = async () => {
      const startTime = performance.now();
      
      try {
        await fetch('/api/ping', { method: 'HEAD' });
        const networkDelay = performance.now() - startTime;
        
        setMetrics(prev => ({ ...prev, networkDelay }));
        
        if (networkDelay > 1000) {
          addLog(`High network delay: ${networkDelay.toFixed(1)}ms`);
        }
      } catch {
        addLog('Network test failed');
      }
    };

    measureNetworkDelay();
    const interval = setInterval(measureNetworkDelay, 10000);
    return () => clearInterval(interval);
  }, [enabled]);

  const addLog = (message: string) => {
    const timestamp = new Date().toLocaleTimeString();
    setLogs(prev => [...prev.slice(-20), `${timestamp}: ${message}`]);
    console.log(`[AndroidDebugger] ${message}`);
  };

  // 성능 최적화 권장사항
  const getOptimizationSuggestions = (): string[] => {
    const suggestions: string[] = [];

    if (metrics.fps < 30) {
      suggestions.push('낮은 FPS: 애니메이션 복잡도 감소 필요');
    }

    if (metrics.memoryUsage > 80) {
      suggestions.push('높은 메모리 사용량: 이미지 최적화 필요');
    }

    if (metrics.touchLatency > 100) {
      suggestions.push('터치 지연: 터치 이벤트 최적화 필요');
    }

    if (metrics.renderTime > 20) {
      suggestions.push('느린 렌더링: DOM 조작 최적화 필요');
    }

    if (metrics.networkDelay > 1000) {
      suggestions.push('네트워크 지연: 리소스 압축 및 CDN 사용 고려');
    }

    return suggestions;
  };

  if (!enabled || !isVisible) return null;

  return (
    <div className="fixed top-0 right-0 z-50 bg-black/90 text-white p-4 max-w-sm max-h-screen overflow-y-auto text-xs font-mono">
      {/* 헤더 */}
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-bold">Android Debug</h3>
        <button 
          onClick={() => setIsVisible(false)}
          className="text-white/70 hover:text-white"
        >
          ✕
        </button>
      </div>

      {/* 디바이스 정보 */}
      {deviceInfo && (
        <div className="mb-4 p-2 bg-blue-900/50 rounded">
          <h4 className="font-bold mb-1">Device Info</h4>
          <div>Engine: {deviceInfo.isWebView ? 'WebView' : 'Chrome'} {deviceInfo.chromeVersion}</div>
          <div>Android: {deviceInfo.androidVersion || 'Unknown'}</div>
          <div>Viewport: {deviceInfo.viewportSize.width}×{deviceInfo.viewportSize.height}</div>
          <div>Pixel Ratio: {deviceInfo.pixelRatio}</div>
          <div>WebGL: {deviceInfo.gpuInfo.webglSupported ? '✅' : '❌'}</div>
        </div>
      )}

      {/* 성능 지표 */}
      <div className="mb-4 p-2 bg-green-900/50 rounded">
        <h4 className="font-bold mb-1">Performance</h4>
        <div className={metrics.fps < 30 ? 'text-red-400' : 'text-green-400'}>
          FPS: {metrics.fps}
        </div>
        <div className={metrics.memoryUsage > 80 ? 'text-red-400' : 'text-green-400'}>
          Memory: {metrics.memoryUsage.toFixed(1)}%
        </div>
        <div className={metrics.touchLatency > 100 ? 'text-red-400' : 'text-green-400'}>
          Touch: {metrics.touchLatency.toFixed(1)}ms
        </div>
        <div className={metrics.renderTime > 16.67 ? 'text-red-400' : 'text-green-400'}>
          Render: {metrics.renderTime.toFixed(1)}ms
        </div>
        <div className={metrics.networkDelay > 1000 ? 'text-red-400' : 'text-green-400'}>
          Network: {metrics.networkDelay.toFixed(1)}ms
        </div>
      </div>

      {/* 최적화 권장사항 */}
      {getOptimizationSuggestions().length > 0 && (
        <div className="mb-4 p-2 bg-yellow-900/50 rounded">
          <h4 className="font-bold mb-1">Suggestions</h4>
          {getOptimizationSuggestions().map((suggestion, index) => (
            <div key={index} className="text-yellow-300 text-[10px]">
              • {suggestion}
            </div>
          ))}
        </div>
      )}

      {/* 로그 */}
      <div className="p-2 bg-gray-900/50 rounded max-h-32 overflow-y-auto">
        <h4 className="font-bold mb-1">Logs</h4>
        {logs.slice(-5).map((log, index) => (
          <div key={index} className="text-gray-300 text-[10px] mb-1">
            {log}
          </div>
        ))}
      </div>
    </div>
  );
};

// 터치로 디버거 토글하는 컴포넌트
export const AndroidDebugTrigger: React.FC = () => {
  const [showDebugger, setShowDebugger] = useState(false);
  const [touchCount, setTouchCount] = useState(0);
  const touchTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const handleTouch = () => {
      setTouchCount(prev => prev + 1);
      
      if (touchTimeoutRef.current) {
        clearTimeout(touchTimeoutRef.current);
      }
      
      touchTimeoutRef.current = setTimeout(() => {
        setTouchCount(0);
      }, 2000);
    };

    // 5번 연속 터치로 디버거 활성화
    if (touchCount >= 5 && detectAndroid()) {
      setShowDebugger(true);
      setTouchCount(0);
    }

    // 화면 우상단 모서리 터치 이벤트
    const debugTouchArea = document.createElement('div');
    debugTouchArea.style.cssText = `
      position: fixed;
      top: 0;
      right: 0;
      width: 50px;
      height: 50px;
      z-index: 9999;
      background: transparent;
    `;
    
    debugTouchArea.addEventListener('touchstart', handleTouch, { passive: true });
    document.body.appendChild(debugTouchArea);

    return () => {
      if (touchTimeoutRef.current) {
        clearTimeout(touchTimeoutRef.current);
      }
      document.body.removeChild(debugTouchArea);
    };
  }, [touchCount]);

  return (
    <>
      {showDebugger && (
        <AndroidDeviceDebugger
          enabled={true}
          showOverlay={true}
          onPerformanceIssue={(metrics) => {
            console.warn('Performance issue detected:', metrics);
            // 자동 최적화 모드 활성화
            if (metrics.fps < 20) {
              document.body.classList.add('performance-mode');
            }
          }}
          onDeviceInfoReady={(info) => {
            console.log('Device info ready:', info);
            // 디바이스별 최적화 설정 적용
            if (info.isWebView) {
              document.body.classList.add('webview-optimized');
            }
          }}
        />
      )}
      
      {/* 디버거 활성화 안내 (개발 환경에서만) */}
      {process.env.NODE_ENV === 'development' && !showDebugger && detectAndroid() && (
        <div className="fixed bottom-4 right-4 bg-black/70 text-white p-2 rounded text-xs z-40">
          우상단 5번 터치로 디버거 활성화
          {touchCount > 0 && ` (${touchCount}/5)`}
        </div>
      )}
    </>
  );
};

export default AndroidDeviceDebugger;