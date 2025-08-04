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
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="text-center px-4">
        <motion.h1
          key={currentIndex}
          className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900"
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