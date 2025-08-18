import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, phone, message, agreement } = body;

    // 필수 필드 검증
    if (!name || !email || !message || !agreement) {
      return NextResponse.json(
        { error: '필수 필드가 누락되었습니다.' },
        { status: 400 }
      );
    }

    // 이메일 형식 검증
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: '올바른 이메일 형식이 아닙니다.' },
        { status: 400 }
      );
    }

    // 개인정보 처리 동의 확인
    if (!agreement) {
      return NextResponse.json(
        { error: '개인정보 처리 동의가 필요합니다.' },
        { status: 400 }
      );
    }

    // 실제 환경에서는 이메일 발송, 데이터베이스 저장 등의 로직이 들어갑니다.
    // 개인정보 보호를 위해 상세 정보는 로그에 출력하지 않습니다.
    console.log('문의 접수 완료:', {
      timestamp: new Date().toISOString(),
      hasName: !!name,
      hasEmail: !!email,
      hasPhone: !!phone,
      hasMessage: !!message
    });

    // 성공 응답
    return NextResponse.json(
      { message: '문의가 성공적으로 접수되었습니다.' },
      { status: 200 }
    );

  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json(
      { error: '서버 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
}