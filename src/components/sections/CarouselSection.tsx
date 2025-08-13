'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { ExternalLink } from 'lucide-react';

const youtubeChannels = [
  {
    id: 1,
    name: "소신사장",
    handle: "@소신사장_SoshinTV",
    url: "https://www.youtube.com/@소신사장_SoshinTV",
    category: "비즈니스",
    color: "from-red-500 to-orange-500"
  },
  {
    id: 2,
    name: "공구왕황부장",
    handle: "@Hwangbujang",
    url: "https://www.youtube.com/@Hwangbujang",
    category: "DIY/공구",
    color: "from-blue-500 to-cyan-500"
  },
  {
    id: 3,
    name: "원룸만들기",
    handle: "@oneroommake",
    url: "https://www.youtube.com/@oneroommake",
    category: "인테리어",
    color: "from-green-500 to-emerald-500"
  },
  {
    id: 4,
    name: "애주가TV참PD",
    handle: "@ilovechampd",
    url: "https://www.youtube.com/@ilovechampd",
    category: "라이프스타일",
    color: "from-purple-500 to-pink-500"
  },
  {
    id: 5,
    name: "SPAO",
    handle: "@SPAOKOREA",
    url: "https://www.youtube.com/@SPAOKOREA",
    category: "패션",
    color: "from-indigo-500 to-blue-500"
  },
  {
    id: 6,
    name: "영자씨의 부엌",
    handle: "@youngjas_kitchen",
    url: "https://www.youtube.com/@youngjas_kitchen",
    category: "요리",
    color: "from-yellow-500 to-orange-500"
  },
  {
    id: 7,
    name: "에이치덱스",
    handle: "@hdex_",
    url: "https://www.youtube.com/@hdex_",
    category: "테크",
    color: "from-gray-500 to-slate-500"
  },
  {
    id: 8,
    name: "VETIVER",
    handle: "@VETIVER",
    url: "https://www.youtube.com/@VETIVER",
    category: "패션/뷰티",
    color: "from-rose-500 to-pink-500"
  },
  {
    id: 9,
    name: "NICKY니키",
    handle: "@Nicky__YHJ",
    url: "https://www.youtube.com/@Nicky__YHJ",
    category: "브이로그",
    color: "from-teal-500 to-cyan-500"
  },
  {
    id: 10,
    name: "신사용",
    handle: "@sinsayong",
    url: "https://www.youtube.com/@sinsayong",
    category: "남성 패션",
    color: "from-amber-500 to-yellow-500"
  },
  {
    id: 11,
    name: "콜리젯TV",
    handle: "@COLIZET",
    url: "https://www.youtube.com/@COLIZET",
    category: "게임/엔터",
    color: "from-violet-500 to-purple-500"
  }
];

export default function CarouselSection() {
  const [isPaused, setIsPaused] = useState(false);

  // 무한 스크롤을 위해 채널 배열을 3번 복제
  const duplicatedChannels = [...youtubeChannels, ...youtubeChannels, ...youtubeChannels];

  return (
    <section 
      className="py-20 text-white overflow-hidden relative"
      style={{
        backgroundImage: 'url("/images/carousel/con_4.png")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      {/* Background overlay to maintain dark theme and readability */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900/85 via-black/85 to-gray-900/85" />
      <div className="container mx-auto px-4 relative z-10">
        {/* 섹션 제목 */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
            성공하는 유튜브 채널들
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            다양한 분야에서 활발하게 활동하는 크리에이터들의 채널을 만나보세요
          </p>
        </motion.div>

        {/* 무한 스크롤 캐러셀 */}
        <div className="relative">
          {/* 좌측 그라데이션 */}
          <div className="absolute left-0 top-0 w-32 h-full bg-gradient-to-r from-gray-900 via-gray-900/80 to-transparent z-10 pointer-events-none" />
          {/* 우측 그라데이션 */}
          <div className="absolute right-0 top-0 w-32 h-full bg-gradient-to-l from-gray-900 via-gray-900/80 to-transparent z-10 pointer-events-none" />
          
          <div 
            className="overflow-hidden py-8"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            <motion.div
              className="flex space-x-6"
              animate={{
                x: isPaused ? 0 : -1320, // 11개 채널 * 120px = 1320px
              }}
              transition={{
                x: {
                  repeat: Infinity,
                  repeatType: "loop",
                  duration: 44, // 30px/초 속도로 계산 (1320px / 30px = 44초)
                  ease: "linear",
                },
              }}
            >
              {duplicatedChannels.map((channel, index) => (
                <motion.a
                  key={`${channel.id}-${index}`}
                  href={channel.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`
                    flex-shrink-0 w-64 h-32 rounded-xl bg-gradient-to-br ${channel.color} 
                    p-4 relative overflow-hidden group cursor-pointer
                    hover:scale-105 transition-transform duration-300
                  `}
                  whileHover={{ y: -5 }}
                  title={`${channel.name} 유튜브 채널 방문하기`}
                >
                  {/* 배경 장식 */}
                  <div className="absolute -top-10 -right-10 w-24 h-24 bg-white/10 rounded-full" />
                  <div className="absolute -bottom-5 -left-5 w-16 h-16 bg-white/10 rounded-full" />
                  
                  {/* 콘텐츠 */}
                  <div className="relative z-10 h-full flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="font-bold text-lg text-white">
                          {channel.name}
                        </h3>
                        <ExternalLink className="w-4 h-4 text-white/70 group-hover:text-white transition-colors" />
                      </div>
                      <p className="text-xs text-white/80 mb-1">
                        {channel.handle}
                      </p>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-white/70 bg-white/10 px-2 py-1 rounded-full">
                        {channel.category}
                      </span>
                      <span className="text-xs text-white/70">
                        YouTube
                      </span>
                    </div>
                  </div>
                  
                  {/* 호버 오버레이 */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </motion.a>
              ))}
            </motion.div>
          </div>
        </div>

        {/* 설명 텍스트 */}
        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <p className="text-gray-400 text-sm">
            마우스를 올리면 일시정지 • 클릭하면 채널로 이동합니다
          </p>
        </motion.div>

        {/* CTA 버튼 */}
        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <motion.button
            className="bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded-full font-bold transition-all duration-300 inline-flex items-center space-x-2 group"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => window.open('https://www.youtube.com/feed/storefront', '_blank')}
          >
            <span>YouTube 쇼핑 시작하기</span>
            <ExternalLink className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}