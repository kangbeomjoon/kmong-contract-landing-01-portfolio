'use client';

import { useState, useEffect, useCallback } from 'react';

export const DevModeToggle = () => {
  const [currentMode, setCurrentMode] = useState<'mobile' | 'desktop' | 'auto'>('auto');
  const [screenWidth, setScreenWidth] = useState(0);
  
  const toggleMode = useCallback((mode: 'mobile' | 'desktop' | 'auto') => {
    const url = new URL(window.location.href);
    
    if (mode === 'mobile') {
      url.searchParams.set('mobile', 'true');
    } else if (mode === 'desktop') {
      url.searchParams.set('mobile', 'false');
    } else {
      url.searchParams.delete('mobile');
    }
    
    window.history.pushState({}, '', url.toString());
    window.dispatchEvent(new PopStateEvent('popstate'));
  }, []);
  
  useEffect(() => {
    // 개발 환경에서만 렌더링
    if (process.env.NODE_ENV !== 'development') {
      return;
    }

    const updateMode = () => {
      const params = new URLSearchParams(window.location.search);
      const mobileParam = params.get('mobile');
      
      if (mobileParam === 'true') {
        setCurrentMode('mobile');
      } else if (mobileParam === 'false') {
        setCurrentMode('desktop');
      } else {
        setCurrentMode('auto');
      }
      
      setScreenWidth(window.innerWidth);
    };

    // 키보드 단축키 지원
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ctrl + Shift + M: 모바일 모드
      if (e.ctrlKey && e.shiftKey && e.key === 'M') {
        e.preventDefault();
        toggleMode('mobile');
      }
      // Ctrl + Shift + D: 데스크탑 모드
      else if (e.ctrlKey && e.shiftKey && e.key === 'D') {
        e.preventDefault();
        toggleMode('desktop');
      }
      // Ctrl + Shift + A: 자동 모드
      else if (e.ctrlKey && e.shiftKey && e.key === 'A') {
        e.preventDefault();
        toggleMode('auto');
      }
    };

    updateMode();
    window.addEventListener('resize', updateMode);
    window.addEventListener('popstate', updateMode);
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('resize', updateMode);
      window.removeEventListener('popstate', updateMode);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [toggleMode]);

  // 프로덕션에서는 렌더링하지 않음
  if (process.env.NODE_ENV !== 'development') {
    return null;
  }

  const autoMode = screenWidth < 768 ? 'mobile' : 'desktop';
  // Note: actualMode available for future display logic
  // const actualMode = currentMode === 'auto' ? autoMode : currentMode;

  return (
    <div className="fixed bottom-4 right-4 z-50 bg-white border border-gray-300 rounded-lg shadow-lg p-3 text-xs font-mono max-w-xs">
      <div className="flex flex-col gap-2">
        <div className="text-gray-600">
          Dev Mode: <span className="font-bold text-blue-600">{currentMode}</span>
          {currentMode === 'auto' && (
            <span className="text-gray-500"> → {autoMode}</span>
          )}
        </div>
        
        <div className="text-gray-500">
          Screen: {screenWidth}px
        </div>
        
        <div className="flex gap-1">
          <button
            onClick={() => toggleMode('mobile')}
            className={`px-2 py-1 text-xs rounded transition-colors ${
              currentMode === 'mobile' 
                ? 'bg-blue-500 text-white' 
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
            title="Ctrl + Shift + M"
          >
            📱 Mobile
          </button>
          
          <button
            onClick={() => toggleMode('desktop')}
            className={`px-2 py-1 text-xs rounded transition-colors ${
              currentMode === 'desktop' 
                ? 'bg-blue-500 text-white' 
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
            title="Ctrl + Shift + D"
          >
            💻 Desktop
          </button>
          
          <button
            onClick={() => toggleMode('auto')}
            className={`px-2 py-1 text-xs rounded transition-colors ${
              currentMode === 'auto' 
                ? 'bg-green-500 text-white' 
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
            title="Ctrl + Shift + A"
          >
            🔄 Auto
          </button>
        </div>
        
        <div className="text-gray-400 text-xs leading-tight">
          단축키: Ctrl + Shift + M/D/A
        </div>
      </div>
    </div>
  );
};