import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import { HeroBackground } from './HeroBackground';
import { HeroMockups } from './HeroMockups';

interface HeroSectionProps {
  onOpenRegisterModal: () => void;
}

export function HeroSection({ onOpenRegisterModal }: HeroSectionProps) {
  return (
    <section
      id="hero"
      data-testid="hero-section"
      className="relative mx-4 mt-4 mb-0 md:mx-[120px] md:mt-[25px] rounded-[30px] overflow-hidden min-h-[600px] md:min-h-[900px] bg-white pt-32"
    >
      <HeroBackground />

      <div className="relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          className="flex flex-col items-center text-center px-4 md:px-14 pt-4 md:pt-6"
        >
          <h1
            className="text-4xl md:text-[48px] font-semibold max-w-3xl"
            style={{ color: '#111111', lineHeight: '1.2' }}
          >
            Menos estresse com dinheiro.
            <br />
            Mais tranquilidade no dia a dia.
          </h1>

          <div className="mt-6 flex items-center justify-center gap-4 flex-wrap">
            <button
              type="button"
              onClick={onOpenRegisterModal}
              className="flex items-center gap-2 px-6 py-3 text-white text-base font-semibold rounded-[10px] cursor-pointer hover:opacity-90 transition-opacity"
              style={{ background: '#43BE17' }}
            >
              Começar Grátis
              <ArrowRight className="w-5 h-5" />
            </button>
            <button
              type="button"
              onClick={() => document.getElementById('video')?.scrollIntoView({ behavior: 'smooth' })}
              className="flex items-center gap-2 px-6 py-3 text-base font-semibold rounded-[10px] cursor-pointer hover:opacity-80 transition-opacity"
              style={{ background: 'white', color: '#111111', border: '1px solid #E5E7EB' }}
            >
              Ver Demonstração
            </button>
          </div>
        </motion.div>

        <HeroMockups />
      </div>
    </section>
  );
}
