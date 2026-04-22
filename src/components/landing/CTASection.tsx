import { ArrowRight } from 'lucide-react';

export function CTASection() {
  return (
    <section className="py-20" style={{ backgroundColor: 'var(--green-light)' }}>
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold">
            Pronto para ter mais tranquilidade{' '}
            <span style={{ color: 'var(--green-primary)' }}>
              com seu dinheiro?
            </span>
          </h2>
          <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
            Comece agora mesmo, sem custo e sem complicação.
            Em poucos minutos você já estará no controle.
          </p>
          <button
            className="group px-10 py-5 rounded-lg text-white font-semibold text-xl transition-all duration-200 hover:shadow-2xl hover:scale-105 inline-flex items-center gap-3"
            style={{ backgroundColor: 'var(--green-cta)' }}
          >
            Começar grátis agora
            <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
          </button>
          <p className="text-sm text-gray-500">
            Não é necessário cartão de crédito • Configuração em minutos
          </p>
        </div>
      </div>
    </section>
  );
}
