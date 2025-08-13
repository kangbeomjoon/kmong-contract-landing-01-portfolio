'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

const messages = [
  "새로운 유튜브 쇼핑을 시작하세요",
  "전 세계 20억 사용자와 만나세요", 
  "간편한 스토어 구축부터",
  "매출 증대까지 한번에"
];

export default function HeroSection() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % messages.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section 
      className="min-h-screen flex items-center justify-center relative"
      style={{
        backgroundImage: 'url("/images/hero/con_1.png")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      {/* 오버레이 추가로 텍스트 가독성 향상 */}
      <div className="absolute inset-0 bg-black/30" />
      
      <div className="text-center px-4 relative z-10">
        <motion.h1
          key={currentIndex}
          className="text-4xl md:text-5xl lg:text-6xl font-bold text-white drop-shadow-lg"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.8, ease: 'easeInOut' }}
        >
          {messages[currentIndex]}
        </motion.h1>
      </div>
    </section>
  );
}