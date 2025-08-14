'use client';

import { useIsMobile } from '@/hooks';
import DesktopLayout from '@/components/layouts/DesktopLayout';
import { MobileLayout } from '@/components/mobile';
import { DevModeToggle } from '@/components/dev/DevModeToggle';

export default function Home() {
  const isMobile = useIsMobile();

  return (
    <>
      {isMobile ? <MobileLayout /> : <DesktopLayout />}
      <DevModeToggle />
    </>
  );
}
