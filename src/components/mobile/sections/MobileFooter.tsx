'use client';

import React from 'react';

const MobileFooter: React.FC = () => {
  return (
    <footer className="bg-black text-white py-12 px-5">
      <div className="max-w-md mx-auto text-center">
        {/* 로고 */}
        <div className="mb-8">
          <div 
            className="mx-auto w-40 h-12 bg-center bg-contain bg-no-repeat mb-2"
            style={{
              backgroundImage: 'url("/images/hero/logo 1.png")',
            }}
          />
          <p className="text-sm text-gray-400">버즈비</p>
        </div>

        {/* 정책 링크 */}
        <div className="mb-8">
          <div className="flex justify-center items-center space-x-6 text-lg">
            <a 
              href="#" 
              className="text-white font-bold hover:text-gray-300 transition-colors"
            >
              개인정보처리방침
            </a>
            <a 
              href="#" 
              className="text-gray-400 hover:text-white transition-colors"
            >
              이용약관
            </a>
          </div>
        </div>

        {/* SNS 아이콘 */}
        <div className="mb-8">
          <div className="flex justify-center items-center space-x-4">
            {/* YouTube */}
            <a 
              href="https://youtube.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-12 h-12 bg-gray-800 rounded-full flex items-center justify-center hover:bg-red-600 transition-colors"
              aria-label="YouTube"
            >
              <svg 
                className="w-6 h-6" 
                fill="currentColor" 
                viewBox="0 0 24 24"
              >
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
              </svg>
            </a>

            {/* Facebook */}
            <a 
              href="https://facebook.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-12 h-12 bg-gray-800 rounded-full flex items-center justify-center hover:bg-blue-600 transition-colors"
              aria-label="Facebook"
            >
              <svg 
                className="w-6 h-6" 
                fill="currentColor" 
                viewBox="0 0 24 24"
              >
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
            </a>

            {/* Kakao */}
            <a 
              href="#" 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-12 h-12 bg-gray-800 rounded-full flex items-center justify-center hover:bg-yellow-500 transition-colors"
              aria-label="Kakao"
            >
              <svg 
                className="w-6 h-6" 
                fill="currentColor" 
                viewBox="0 0 24 24"
              >
                <path d="M12 3C6.477 3 2 6.477 2 10.8c0 2.8 1.8 5.3 4.5 6.8l-1.1 4.1c-.1.4.4.7.7.4l4.9-3.2c.3 0 .7 0 1 0 5.523 0 10-3.477 10-7.8S17.523 3 12 3z"/>
              </svg>
            </a>
          </div>
        </div>

        {/* 회사 정보 */}
        <div className="text-gray-400 text-sm leading-relaxed space-y-2">
          <div className="flex justify-center items-center space-x-4">
            <span>대표자 : 홍길동</span>
            <span>고객센터 : 1588-1200</span>
          </div>
          <p>이메일 : honggildong@naver.com</p>
          <p>사업자등록번호 : 110-25-85473</p>
          <p>서울시 송파구 송파대로 200 25-5</p>
        </div>
      </div>
    </footer>
  );
};

export default MobileFooter;