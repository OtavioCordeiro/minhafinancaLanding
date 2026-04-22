import { motion } from 'motion/react';
import { PlusCircle, FolderKanban, Calendar, PieChart, History, CheckCircle2 } from 'lucide-react';

interface FeaturesSectionProps {
  onOpenRegisterModal: () => void;
}

export function FeaturesSection({ onOpenRegisterModal }: FeaturesSectionProps) {
  const features = [
    {
      icon: PlusCircle,
      title: 'Cadastro rápido de receitas e despesas',
      description: 'Adicione transações em segundos, sem complicação.',
    },
    {
      icon: FolderKanban,
      title: 'Organização por categorias e períodos',
      description: 'Visualize seus gastos organizados do jeito que você precisa.',
    },
    {
      icon: Calendar,
      title: 'Visão mensal clara',
      description: 'Entenda sua situação financeira em um único olhar.',
    },
    {
      icon: PieChart,
      title: 'Gráficos simples e objetivos',
      description: 'Veja onde seu dinheiro está indo de forma visual.',
    },
    {
      icon: History,
      title: 'Histórico financeiro confiável',
      description: 'Acesse todo seu histórico quando precisar.',
    },
    {
      icon: CheckCircle2,
      title: 'Controle total dos seus dados',
      description: 'Seus dados são seus. Privacidade garantida.',
    },
  ];

  return (
    <section id="recursos" data-testid="features-section" className="py-20 px-4 bg-white">
      <div className="container mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="text-center space-y-4 mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold" style={{ color: '#028A31' }}>
            Tudo o que você precisa
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Funcionalidades diretas e eficientes para você ter controle sem esforço.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="p-6 rounded-xl bg-white border border-gray-200 hover:shadow-lg transition-all"
              >
                <div 
                  className="w-12 h-12 rounded-lg flex items-center justify-center mb-4"
                  style={{ backgroundColor: '#ECFAF2' }}
                >
                  <Icon className="w-6 h-6" style={{ color: '#028A31' }} />
                </div>
                <h3 className="text-lg font-semibold mb-2 text-gray-900">
                  {feature.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            );
          })}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center mt-16"
        >
          <button
            type="button"
            onClick={onOpenRegisterModal}
            className="px-8 py-4 rounded-xl text-white font-semibold shadow-lg hover:shadow-xl transition-all active:scale-95"
            style={{ backgroundColor: '#6ADB06', touchAction: 'manipulation' }}
          >
            Começar agora gratuitamente
          </button>
        </motion.div>
      </div>
    </section>
  );
}
