import { motion } from 'motion/react';
import { ArrowRight, Sparkles } from 'lucide-react';

interface FinalCTAProps {
  onOpenRegisterModal: () => void;
}

export function FinalCTA({ onOpenRegisterModal }: FinalCTAProps) {

  return (
    <section className="py-20 px-4 relative overflow-hidden" style={{ backgroundColor: '#028A31' }}>
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-64 h-64 rounded-full blur-3xl bg-white"></div>
        <div className="absolute bottom-10 right-10 w-64 h-64 rounded-full blur-3xl bg-white"></div>
      </div>

      <div className="container mx-auto max-w-4xl relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center space-y-8"
        >
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
          >
            <Sparkles className="w-12 h-12 mx-auto mb-6 text-white" />
          </motion.div>

          <h2 className="text-3xl md:text-5xl font-bold text-white leading-tight">
            Pronto para ter mais tranquilidade
            <br />
            com suas finanças?
          </h2>

          <p className="text-xl text-white/90 max-w-2xl mx-auto">
            Comece agora gratuitamente e sinta a diferença de ter controle sem esforço.
          </p>

          <button
            type="button"
            onClick={onOpenRegisterModal}
            className="inline-flex items-center gap-3 px-8 py-4 rounded-xl font-semibold shadow-xl hover:shadow-2xl transition-all text-lg active:scale-95"
            style={{ backgroundColor: '#6ADB06', color: '#ffffff', touchAction: 'manipulation' }}
          >
            Começar grátis agora
            <ArrowRight className="w-6 h-6" />
          </button>

          <p className="text-sm text-white/70 pt-4">
            Sem cartão de crédito • Sem compromisso • 100% gratuito
          </p>
        </motion.div>
      </div>
    </section>
  );
}
