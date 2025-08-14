'use client';

import { useIsMobile } from '@/hooks';
import DesktopLayout from '@/components/layouts/DesktopLayout';
import { MobileLayout } from '@/components/mobile';

export default function Home() {
  const isMobile = useIsMobile();

  if (isMobile) {
    return <MobileLayout />;
  }

  return <DesktopLayout />;
}
