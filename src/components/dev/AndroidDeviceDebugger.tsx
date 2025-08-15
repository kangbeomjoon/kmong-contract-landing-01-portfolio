'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface PerformanceMetrics {
  fps: number;
  memoryUsed: number;
  memoryLimit: number;
  touchLatency: number;
  renderTime: number;
  isWebView: boolean;
  androidVersion: string;
  devicePerformance: 'high' | 'medium' | 'low';
}

interface DeviceInfo {
  userAgent: string;
  viewport: { width: number; height: number };
  pixelRatio: number;
  platform: string;
  connection?: string;
}

export function AndroidDeviceDebugger() {
  const [isVisible, setIsVisible] = useState(false);
  const [tapCount, setTapCount] = useState(0);
  const [metrics, setMetrics] = useState<PerformanceMetrics>({
    fps: 0,
    memoryUsed: 0,
    memoryLimit: 0,
    touchLatency: 0,
    renderTime: 0,
    isWebView: false,
    androidVersion: 'Unknown',
    devicePerformance: 'medium'
  });
  const [deviceInfo, setDeviceInfo] = useState<DeviceInfo>({
    userAgent: '',
    viewport: { width: 0, height: 0 },
    pixelRatio: 1,
    platform: '',
    connection: 'Unknown'
  });
  const [isMonitoring, setIsMonitoring] = useState(false);
  
  const tapTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const fpsRef = useRef(0);
  const frameCountRef = useRef(0);
  const lastTimeRef = useRef(0);
  // const monitoringRef = useRef<NodeJS.Timeout>(); // Commented out as it's not used

  // 화면 우상단 5번 터치로 디버거 활성화
  const handleCornerTap = () => {
    setTapCount(prev => prev + 1);
    
    if (tapTimeoutRef.current) {
      clearTimeout(tapTimeoutRef.current);
    }
    
    tapTimeoutRef.current = setTimeout(() => {
      setTapCount(0);
    }, 2000);
    
    if (tapCount >= 4) { // 5번째 터치
      setIsVisible(true);
      setIsMonitoring(true);
      setTapCount(0);
    }
  };

  // 디바이스 정보 수집
  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    const getDeviceInfo = () => {
      const isWebView = /wv/.test(navigator.userAgent) || 
                       /Version\/[\d\.]+.*Chrome\/[.\d]+ Mobile/.test(navigator.userAgent);
      
      const androidMatch = navigator.userAgent.match(/Android\s([0-9\.]*)/);
      const androidVersion = androidMatch ? androidMatch[1] : 'Unknown';
      
      // 성능 레벨 추정
      const memoryGB = (navigator as Navigator & { deviceMemory?: number }).deviceMemory || 4;
      const cores = navigator.hardwareConcurrency || 4;
      let devicePerformance: 'high' | 'medium' | 'low' = 'medium';
      
      if (memoryGB >= 6 && cores >= 6) {
        devicePerformance = 'high';
      } else if (memoryGB <= 3 || cores <= 4) {
        devicePerformance = 'low';
      }
      
      setDeviceInfo({
        userAgent: navigator.userAgent,
        viewport: {
          width: window.innerWidth,
          height: window.innerHeight
        },
        pixelRatio: window.devicePixelRatio,
        platform: navigator.platform,
        connection: (navigator as Navigator & { connection?: { effectiveType: string } }).connection?.effectiveType || 'Unknown'
      });
      
      setMetrics(prev => ({
        ...prev,
        isWebView,
        androidVersion,
        devicePerformance
      }));
    };
    
    getDeviceInfo();
    window.addEventListener('resize', getDeviceInfo);
    return () => window.removeEventListener('resize', getDeviceInfo);
  }, []);

  // 성능 모니터링
  useEffect(() => {
    if (!isMonitoring) return;
    
    let animationId: number;
    
    const measurePerformance = (currentTime: number) => {
      let delta = 0;
      if (lastTimeRef.current) {
        delta = currentTime - lastTimeRef.current;
        frameCountRef.current++;
        
        if (frameCountRef.current % 60 === 0) { // 1초마다 FPS 계산
          fpsRef.current = Math.round(1000 / (delta / 60));
        }
      }
      lastTimeRef.current = currentTime;
      
      // 메모리 사용량 측정
      const memory = (performance as Performance & { memory?: { usedJSHeapSize: number; jsHeapSizeLimit: number } }).memory;
      if (memory) {
        setMetrics(prev => ({
          ...prev,
          fps: fpsRef.current,
          memoryUsed: Math.round(memory.usedJSHeapSize / 1024 / 1024),
          memoryLimit: Math.round(memory.jsHeapSizeLimit / 1024 / 1024),
          renderTime: Math.round(delta)
        }));
      }
      
      animationId = requestAnimationFrame(measurePerformance);
    };
    
    animationId = requestAnimationFrame(measurePerformance);
    
    return () => {
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
    };
  }, [isMonitoring]);

  // 터치 지연 측정
  const measureTouchLatency = () => {
    const startTime = performance.now();
    setTimeout(() => {
      const latency = performance.now() - startTime;
      setMetrics(prev => ({ ...prev, touchLatency: Math.round(latency) }));
    }, 0);
  };

  // 성능 경고 알림
  const getPerformanceStatus = () => {
    const issues = [];
    if (metrics.fps < 30) issues.push('낮은 FPS');
    if (metrics.memoryUsed > metrics.memoryLimit * 0.8) issues.push('높은 메모리 사용량');
    if (metrics.touchLatency > 100) issues.push('터치 지연');
    if (metrics.renderTime > 16.67) issues.push('렌더링 지연');
    
    return {
      level: issues.length === 0 ? 'good' : issues.length <= 2 ? 'warning' : 'critical',
      issues
    };
  };

  const status = getPerformanceStatus();

  if (!isVisible) {
    return (
      <div
        className="fixed top-0 right-0 w-16 h-16 z-50 bg-transparent"
        onClick={handleCornerTap}
        style={{ touchAction: 'manipulation' }}
      />
    );
  }

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: -100 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -100 }}
        className="fixed top-4 right-4 bg-black/90 text-white p-4 rounded-lg text-xs z-50 max-w-xs"
        style={{ fontFamily: 'monospace' }}
      >
        {/* 헤더 */}
        <div className="flex justify-between items-center mb-3">
          <h3 className="font-bold text-sm">🔧 Android 디버거</h3>
          <div className="flex gap-2">
            <button
              onClick={() => setIsMonitoring(!isMonitoring)}
              className={`px-2 py-1 rounded text-xs ${
                isMonitoring ? 'bg-green-600' : 'bg-gray-600'
              }`}
            >
              {isMonitoring ? '■' : '▶'}
            </button>
            <button
              onClick={() => setIsVisible(false)}
              className="px-2 py-1 bg-red-600 rounded text-xs"
            >
              ✕
            </button>
          </div>
        </div>

        {/* 성능 상태 */}
        <div className={`mb-3 p-2 rounded ${
          status.level === 'good' ? 'bg-green-800' :
          status.level === 'warning' ? 'bg-yellow-800' :
          'bg-red-800'
        }`}>
          <div className="font-bold">
            {status.level === 'good' ? '✅ 성능 양호' :
             status.level === 'warning' ? '⚠️ 성능 주의' :
             '🚨 성능 위험'}
          </div>
          {status.issues.length > 0 && (
            <div className="text-xs mt-1">
              이슈: {status.issues.join(', ')}
            </div>
          )}
        </div>

        {/* 실시간 성능 메트릭 */}
        <div className="space-y-2 mb-3">
          <div className="flex justify-between">
            <span>FPS:</span>
            <span className={metrics.fps < 30 ? 'text-red-400' : 'text-green-400'}>
              {metrics.fps}
            </span>
          </div>
          <div className="flex justify-between">
            <span>메모리:</span>
            <span className={
              metrics.memoryUsed > metrics.memoryLimit * 0.8 ? 'text-red-400' : 'text-green-400'
            }>
              {metrics.memoryUsed}MB/{metrics.memoryLimit}MB
            </span>
          </div>
          <div className="flex justify-between">
            <span>터치 지연:</span>
            <span className={metrics.touchLatency > 100 ? 'text-red-400' : 'text-green-400'}>
              {metrics.touchLatency}ms
            </span>
          </div>
          <div className="flex justify-between">
            <span>렌더링:</span>
            <span className={metrics.renderTime > 16.67 ? 'text-red-400' : 'text-green-400'}>
              {metrics.renderTime}ms
            </span>
          </div>
        </div>

        {/* 디바이스 정보 */}
        <div className="space-y-1 text-xs border-t border-gray-600 pt-2">
          <div><strong>환경:</strong> {metrics.isWebView ? 'WebView' : 'Chrome'}</div>
          <div><strong>Android:</strong> {metrics.androidVersion}</div>
          <div><strong>성능:</strong> {metrics.devicePerformance}</div>
          <div><strong>화면:</strong> {deviceInfo.viewport.width}×{deviceInfo.viewport.height}</div>
          <div><strong>DPR:</strong> {deviceInfo.pixelRatio}x</div>
          <div><strong>네트워크:</strong> {deviceInfo.connection}</div>
        </div>

        {/* 터치 테스트 버튼 */}
        <button
          onClick={measureTouchLatency}
          className="w-full mt-3 bg-blue-600 hover:bg-blue-700 px-3 py-2 rounded text-xs"
          onTouchStart={measureTouchLatency}
        >
          터치 반응속도 측정
        </button>

        {/* 최적화 제안 */}
        {status.level !== 'good' && (
          <div className="mt-3 p-2 bg-blue-900 rounded text-xs">
            <div className="font-bold mb-1">💡 최적화 제안:</div>
            {metrics.fps < 30 && <div>• 애니메이션 지속시간 단축</div>}
            {metrics.memoryUsed > metrics.memoryLimit * 0.8 && <div>• 이미지 품질 저하</div>}
            {metrics.touchLatency > 100 && <div>• 터치 최적화 모드</div>}
            {metrics.isWebView && <div>• WebView 호환 모드</div>}
          </div>
        )}
      </motion.div>
    </AnimatePresence>
  );
}