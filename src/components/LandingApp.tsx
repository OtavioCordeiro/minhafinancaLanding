import { useState } from 'react';
import { Header } from '@/components/landing/Header';
import { HeroSection } from '@/components/landing/hero';
import { VideoSection } from '@/components/landing/VideoSection';
import { MicroMessages } from '@/components/landing/MicroMessages';
import { FeaturesSection } from '@/components/landing/FeaturesSection';
import { TestimonialsSection } from '@/components/landing/TestimonialsSection';
import { PlanosSection } from '@/components/landing/PlanosSection';
import { FAQSection } from '@/components/landing/FAQSection';
import { FinalCTA } from '@/components/landing/FinalCTA';
import { Footer } from '@/components/landing/Footer';
import { WhatsAppButton } from '@/components/landing/WhatsAppButton';
import { AuthModal } from '@/components/auth/AuthModal';
import type { Plan } from '@/types';

type AuthModalMode = 'login' | 'register' | 'forgot-password';

interface LandingAppProps {
  initialPlans?: Plan[];
}

export function LandingApp({ initialPlans }: LandingAppProps = {}) {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState<AuthModalMode>('register');

  const handleOpenRegisterModal = () => {
    setAuthMode('register');
    setIsAuthModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-white">
      <Header onOpenRegisterModal={handleOpenRegisterModal} />
      <HeroSection onOpenRegisterModal={handleOpenRegisterModal} />
      <VideoSection />
      <MicroMessages />
      <FeaturesSection onOpenRegisterModal={handleOpenRegisterModal} />
      <PlanosSection onOpenRegisterModal={handleOpenRegisterModal} initialPlans={initialPlans} />
      <TestimonialsSection />
      <FAQSection />
      <FinalCTA onOpenRegisterModal={handleOpenRegisterModal} />
      <Footer />
      <WhatsAppButton />

      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        mode={authMode}
        onModeChange={setAuthMode}
      />
    </div>
  );
}
