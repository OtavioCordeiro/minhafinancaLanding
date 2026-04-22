import { motion } from 'motion/react';
import { Users, TrendingUp, Clock, Heart } from 'lucide-react';

export function StatsSection() {
  const stats = [
    {
      icon: Users,
      value: '10.000+',
      label: 'Usuários ativos',
    },
    {
      icon: TrendingUp,
      value: '95%',
      label: 'Taxa de satisfação',
    },
    {
      icon: Clock,
      value: '2min',
      label: 'Para começar',
    },
    {
      icon: Heart,
      value: '100%',
      label: 'Gratuito',
    },
  ];

  return (
    <section className="py-16 bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  className="text-center"
                >
                  <div
                    className="w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-3"
                    style={{ backgroundColor: 'var(--green-light)' }}
                  >
                    <Icon className="w-8 h-8" style={{ color: 'var(--green-primary)' }} />
                  </div>
                  <div className="text-3xl md:text-4xl font-bold mb-1" style={{ color: 'var(--green-primary)' }}>
                    {stat.value}
                  </div>
                  <div className="text-sm text-gray-600">
                    {stat.label}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
