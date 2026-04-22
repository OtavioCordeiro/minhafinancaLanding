import {
  PlusCircle,
  FolderOpen,
  Calendar,
  BarChart3,
  Clock,
  Shield,
} from 'lucide-react';
import { motion } from 'motion/react';

export function Features() {
  const features = [
    {
      icon: PlusCircle,
      title: 'Cadastro rápido de receitas e despesas',
      description: 'Adicione suas movimentações em segundos, de forma intuitiva e sem complicação.',
    },
    {
      icon: FolderOpen,
      title: 'Organização por categorias e períodos',
      description: 'Classifique suas finanças da forma que faz sentido para você.',
    },
    {
      icon: Calendar,
      title: 'Visão mensal clara',
      description: 'Entenda rapidamente para onde seu dinheiro está indo a cada mês.',
    },
    {
      icon: BarChart3,
      title: 'Gráficos simples e objetivos',
      description: 'Visualize seus dados financeiros de forma clara e sem informações desnecessárias.',
    },
    {
      icon: Clock,
      title: 'Histórico financeiro confiável',
      description: 'Acesse todo seu histórico quando precisar, sem perder nenhuma informação.',
    },
    {
      icon: Shield,
      title: 'Segurança e privacidade',
      description: 'Seus dados são seus. Total controle e proteção conforme a LGPD.',
    },
  ];

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center space-y-3 mb-16">
            <h2 className="text-3xl md:text-4xl font-bold">
              Funcionalidades que fazem diferença
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Tudo que você precisa para ter controle financeiro, sem complicação.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={index}
                  className="group p-6 rounded-xl border-2 border-gray-100 hover:border-transparent hover:shadow-lg transition-all duration-300"
                  style={{
                    '--hover-border': 'var(--green-light)',
                  } as React.CSSProperties}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div
                    className="w-12 h-12 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300"
                    style={{ backgroundColor: 'var(--green-light)' }}
                  >
                    <Icon className="w-6 h-6" style={{ color: 'var(--green-primary)' }} />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {feature.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}