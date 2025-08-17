'use client';

import Image from 'next/image';

export default function Footer() {
  return (
    <footer className="bg-black py-16 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Top section with logo and links */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          {/* Logo */}
          <div className="mb-6 md:mb-0">
            <Image
              src="/images/hero/logo 1.png"
              alt="버즈비 로고"
              width={165}
              height={51}
              className="w-auto h-12"
            />
          </div>
          
          {/* Privacy and Terms Links */}
          <div className="flex gap-8">
            <a 
              href="#" 
              className="text-white font-bold text-base hover:text-[#F6DE35] transition-colors"
            >
              개인정보처리방침
            </a>
            <a 
              href="#" 
              className="text-[#999999] text-base hover:text-white transition-colors"
            >
              이용약관
            </a>
          </div>
        </div>

        {/* Bottom section with company info and social */}
        <div className="flex flex-col lg:flex-row justify-between items-start gap-8">
          {/* Company Information */}
          <div className="text-[#999999] text-base space-y-2">
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-8">
              <span>대표자 : 홍길동</span>
              <span>고객센터 : 1588-1200</span>
              <span>이메일 : honggildong@naver.com</span>
              <span>사업자등록번호 : 110-25-85473</span>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-8">
              <span>서울시 송파구 송파대로 200 25-5</span>
            </div>
          </div>

          {/* Social Media Icons */}
          <div className="flex gap-2">
            <a 
              href="https://www.youtube.com" 
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 bg-white/10 rounded-full flex items-center justify-center hover:bg-[#F6DE35] transition-colors group"
              aria-label="유튜브"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="w-5 h-5">
                <path 
                  d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" 
                  fill="currentColor" 
                  className="text-white group-hover:text-black transition-colors"
                />
              </svg>
            </a>
            
            <a 
              href="https://www.facebook.com" 
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 bg-white/10 rounded-full flex items-center justify-center hover:bg-[#F6DE35] transition-colors group"
              aria-label="페이스북"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="w-5 h-5">
                <path 
                  d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" 
                  fill="currentColor" 
                  className="text-white group-hover:text-black transition-colors"
                />
              </svg>
            </a>
            
            <a 
              href="https://www.kakaocorp.com" 
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 bg-white/10 rounded-full flex items-center justify-center hover:bg-[#F6DE35] transition-colors group"
              aria-label="카카오"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="w-5 h-5">
                <path 
                  d="M12 3C6.486 3 2 6.486 2 10.8c0 2.832 1.898 5.337 4.734 6.703l-1.055 3.893a.387.387 0 0 0 .593.446L10.787 18.9c.383.053.779.08 1.182.08 5.523 0 10-3.486 10-7.8S17.523 3 12 3z" 
                  fill="currentColor" 
                  className="text-white group-hover:text-black transition-colors"
                />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}