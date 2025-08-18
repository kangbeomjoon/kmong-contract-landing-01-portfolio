'use client';

import { useState, useEffect, useCallback, useRef } from 'react';

export interface SwiperImage {
  id: string;
  src: string;
  alt: string;
  title?: string;
  description?: string;
}

interface UseSwiperOptions {
  images: SwiperImage[];
  autoPlayInterval?: number;
  enableAutoPlay?: boolean;
  loop?: boolean;
}

interface UseSwiperReturn {
  currentIndex: number;
  isPlaying: boolean;
  goToSlide: (index: number) => void;
  goToPrevious: () => void;
  goToNext: () => void;
  pauseAutoPlay: () => void;
  resumeAutoPlay: () => void;
  isDragging: boolean;
  setIsDragging: (dragging: boolean) => void;
  dragHandlers: {
    onMouseDown: (e: React.MouseEvent) => void;
    onMouseMove: (e: React.MouseEvent) => void;
    onMouseUp: () => void;
    onMouseLeave: () => void;
    onTouchStart: (e: React.TouchEvent) => void;
    onTouchMove: (e: React.TouchEvent) => void;
    onTouchEnd: () => void;
  };
}

export const useImageSwiper = ({
  images,
  autoPlayInterval = 3000,
  enableAutoPlay = true,
  loop = true
}: UseSwiperOptions): UseSwiperReturn => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(enableAutoPlay);
  const [isDragging, setIsDragging] = useState(false);
  
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const startPosRef = useRef<{ x: number; y: number } | null>(null);
  const dragThreshold = 50; // 50px 이상 드래그해야 슬라이드 변경

  // 자동 재생 제어
  const startAutoPlay = useCallback(() => {
    if (!enableAutoPlay || images.length <= 1) return;
    
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    
    intervalRef.current = setInterval(() => {
      setCurrentIndex(prev => {
        if (loop) {
          return (prev + 1) % images.length;
        } else {
          return prev < images.length - 1 ? prev + 1 : prev;
        }
      });
    }, autoPlayInterval);
  }, [enableAutoPlay, images.length, autoPlayInterval, loop]);

  const stopAutoPlay = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  // 슬라이드 제어 함수들
  const goToSlide = useCallback((index: number) => {
    const clampedIndex = Math.max(0, Math.min(index, images.length - 1));
    setCurrentIndex(clampedIndex);
  }, [images.length]);

  const goToPrevious = useCallback(() => {
    setCurrentIndex(prev => {
      if (loop) {
        return prev === 0 ? images.length - 1 : prev - 1;
      } else {
        return Math.max(0, prev - 1);
      }
    });
  }, [images.length, loop]);

  const goToNext = useCallback(() => {
    setCurrentIndex(prev => {
      if (loop) {
        return (prev + 1) % images.length;
      } else {
        return Math.min(images.length - 1, prev + 1);
      }
    });
  }, [images.length, loop]);

  const pauseAutoPlay = useCallback(() => {
    setIsPlaying(false);
    stopAutoPlay();
  }, [stopAutoPlay]);

  const resumeAutoPlay = useCallback(() => {
    setIsPlaying(true);
    if (enableAutoPlay) {
      startAutoPlay();
    }
  }, [enableAutoPlay, startAutoPlay]);

  // 드래그 핸들러들 (마우스)
  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    setIsDragging(true);
    startPosRef.current = { x: e.clientX, y: e.clientY };
    pauseAutoPlay();
  }, [pauseAutoPlay]);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!isDragging || !startPosRef.current) return;
    
    const deltaX = e.clientX - startPosRef.current.x;
    const deltaY = Math.abs(e.clientY - startPosRef.current.y);
    
    // 세로 스크롤이 더 크면 드래그 취소
    if (deltaY > Math.abs(deltaX)) {
      setIsDragging(false);
      startPosRef.current = null;
      return;
    }
  }, [isDragging]);

  const handleMouseUp = useCallback((e: React.MouseEvent) => {
    if (!isDragging || !startPosRef.current) return;
    
    const deltaX = startPosRef.current.x - e.clientX;
    
    if (Math.abs(deltaX) > dragThreshold) {
      if (deltaX > 0) {
        goToNext();
      } else {
        goToPrevious();
      }
    }
    
    setIsDragging(false);
    startPosRef.current = null;
    resumeAutoPlay();
  }, [isDragging, goToPrevious, goToNext, resumeAutoPlay]);

  const handleMouseLeave = useCallback(() => {
    if (isDragging) {
      setIsDragging(false);
      startPosRef.current = null;
      resumeAutoPlay();
    }
  }, [isDragging, resumeAutoPlay]);

  // 터치 핸들러들 (모바일)
  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    const touch = e.touches[0];
    setIsDragging(true);
    startPosRef.current = { x: touch.clientX, y: touch.clientY };
    pauseAutoPlay();
  }, [pauseAutoPlay]);

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    if (!isDragging || !startPosRef.current) return;
    
    const touch = e.touches[0];
    const deltaX = touch.clientX - startPosRef.current.x;
    const deltaY = Math.abs(touch.clientY - startPosRef.current.y);
    
    // 세로 스크롤이 더 크면 드래그 취소
    if (deltaY > Math.abs(deltaX)) {
      setIsDragging(false);
      startPosRef.current = null;
      return;
    }
    
    // 수평 스크롤 방지
    if (Math.abs(deltaX) > 10) {
      e.preventDefault();
    }
  }, [isDragging]);

  const handleTouchEnd = useCallback((e: React.TouchEvent) => {
    if (!isDragging || !startPosRef.current) return;
    
    const touch = e.changedTouches[0];
    const deltaX = startPosRef.current.x - touch.clientX;
    
    if (Math.abs(deltaX) > dragThreshold) {
      if (deltaX > 0) {
        goToNext();
      } else {
        goToPrevious();
      }
    }
    
    setIsDragging(false);
    startPosRef.current = null;
    resumeAutoPlay();
  }, [isDragging, goToPrevious, goToNext, resumeAutoPlay]);

  // 자동 재생 효과
  useEffect(() => {
    if (isPlaying && enableAutoPlay) {
      startAutoPlay();
    } else {
      stopAutoPlay();
    }
    
    return stopAutoPlay;
  }, [isPlaying, enableAutoPlay, startAutoPlay, stopAutoPlay]);

  // 키보드 이벤트 (데스크톱용)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'ArrowLeft':
          e.preventDefault();
          goToPrevious();
          break;
        case 'ArrowRight':
          e.preventDefault();
          goToNext();
          break;
        case ' ':
          e.preventDefault();
          if (isPlaying) {
            pauseAutoPlay();
          } else {
            resumeAutoPlay();
          }
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [goToPrevious, goToNext, isPlaying, pauseAutoPlay, resumeAutoPlay]);

  return {
    currentIndex,
    isPlaying,
    goToSlide,
    goToPrevious,
    goToNext,
    pauseAutoPlay,
    resumeAutoPlay,
    isDragging,
    setIsDragging,
    dragHandlers: {
      onMouseDown: handleMouseDown,
      onMouseMove: handleMouseMove,
      onMouseUp: handleMouseUp,
      onMouseLeave: handleMouseLeave,
      onTouchStart: handleTouchStart,
      onTouchMove: handleTouchMove,
      onTouchEnd: handleTouchEnd,
    }
  };
};