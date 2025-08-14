'use client';

import React from 'react';
import Link from 'next/link';
import { 
  Youtube, 
  Instagram, 
  Twitter, 
  Facebook,
  Mail,
  Phone,
  MapPin
} from 'lucide-react';

const MobileFooter: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white">
      {/* Main Footer Content */}
      <div className="px-5 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Company Info */}
          <div className="text-center mb-10">
            <div className="mb-6">
              <h3 className="text-2xl font-bold mb-2">바즈비</h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                유튜브 쇼핑의 새로운 혁신을 이끄는<br />
                크리에이터 플랫폼
              </p>
            </div>

            {/* Contact Info */}
            <div className="space-y-3 mb-8">
              <div className="flex items-center justify-center space-x-2 text-gray-400">
                <Mail className="w-4 h-4" />
                <span className="text-sm">contact@buzzby.co.kr</span>
              </div>
              <div className="flex items-center justify-center space-x-2 text-gray-400">
                <Phone className="w-4 h-4" />
                <span className="text-sm">02-1234-5678</span>
              </div>
              <div className="flex items-center justify-center space-x-2 text-gray-400">
                <MapPin className="w-4 h-4" />
                <span className="text-sm">서울특별시 강남구 테헤란로 123</span>
              </div>
            </div>

            {/* Social Media Links */}
            <div className="flex justify-center space-x-6 mb-8">
              <Link 
                href="https://youtube.com" 
                target="_blank"
                className="text-gray-400 hover:text-red-500 transition-colors p-2"
                aria-label="YouTube"
              >
                <Youtube className="w-6 h-6" />
              </Link>
              <Link 
                href="https://instagram.com" 
                target="_blank"
                className="text-gray-400 hover:text-pink-500 transition-colors p-2"
                aria-label="Instagram"
              >
                <Instagram className="w-6 h-6" />
              </Link>
              <Link 
                href="https://twitter.com" 
                target="_blank"
                className="text-gray-400 hover:text-blue-400 transition-colors p-2"
                aria-label="Twitter"
              >
                <Twitter className="w-6 h-6" />
              </Link>
              <Link 
                href="https://facebook.com" 
                target="_blank"
                className="text-gray-400 hover:text-blue-600 transition-colors p-2"
                aria-label="Facebook"
              >
                <Facebook className="w-6 h-6" />
              </Link>
            </div>
          </div>

          {/* Footer Links */}
          <div className="grid grid-cols-1 gap-8 mb-10">
            {/* Services */}
            <div className="text-center">
              <h4 className="font-semibold text-white mb-4">서비스</h4>
              <ul className="space-y-3 text-sm">
                <li>
                  <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                    유튜브 쇼핑 솔루션
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                    크리에이터 지원
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                    분석 도구
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                    API 서비스
                  </Link>
                </li>
              </ul>
            </div>

            {/* Company */}
            <div className="text-center">
              <h4 className="font-semibold text-white mb-4">회사</h4>
              <ul className="space-y-3 text-sm">
                <li>
                  <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                    회사 소개
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                    채용 정보
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                    보도자료
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                    파트너십
                  </Link>
                </li>
              </ul>
            </div>

            {/* Support */}
            <div className="text-center">
              <h4 className="font-semibold text-white mb-4">지원</h4>
              <ul className="space-y-3 text-sm">
                <li>
                  <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                    도움말
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                    문의하기
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                    개발자 센터
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                    커뮤니티
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          {/* Legal Links */}
          <div className="text-center mb-8">
            <div className="flex flex-col space-y-3 text-sm">
              <Link 
                href="#" 
                className="text-gray-400 hover:text-white transition-colors"
              >
                이용약관
              </Link>
              <Link 
                href="#" 
                className="text-gray-400 hover:text-white transition-colors"
              >
                개인정보처리방침
              </Link>
              <Link 
                href="#" 
                className="text-gray-400 hover:text-white transition-colors"
              >
                청소년보호정책
              </Link>
              <Link 
                href="#" 
                className="text-gray-400 hover:text-white transition-colors"
              >
                제휴/광고 문의
              </Link>
            </div>
          </div>

          {/* Company Details */}
          <div className="text-center text-xs text-gray-500 leading-relaxed mb-6">
            <p className="mb-2">
              (주)바즈비 | 대표이사: 홍길동 | 사업자등록번호: 123-45-67890
            </p>
            <p className="mb-2">
              통신판매업신고번호: 2024-서울강남-1234 | 개인정보보호책임자: 김영희
            </p>
            <p>
              서울특별시 강남구 테헤란로 123, 45층 (역삼동, ABC빌딩)
            </p>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t border-gray-800 py-6 px-5">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-gray-500 text-xs">
            © {currentYear} 바즈비(BuzzBy). All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default MobileFooter;