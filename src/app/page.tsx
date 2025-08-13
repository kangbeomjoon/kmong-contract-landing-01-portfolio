import HeroSection from '@/components/sections/HeroSection';
import StatsSection from '@/components/sections/StatsSection';
import ProgressSection from '@/components/sections/ProgressSection';
import CarouselSection from '@/components/sections/CarouselSection';
import CardsSection from '@/components/sections/CardsSection';
import FAQSection from '@/components/sections/FAQSection';
import Footer from '@/components/sections/Footer';

export default function Home() {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <StatsSection />
      <ProgressSection />
      <CarouselSection />
      <CardsSection />
      <FAQSection />
      <Footer />
    </div>
  );
}
