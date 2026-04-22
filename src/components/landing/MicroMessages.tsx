import { motion } from 'motion/react';

export function MicroMessages() {
  const messages = [
    'Organizar suas finanças não precisa ser pesado.',
    'Clareza traz tranquilidade.',
    'Controle sem esforço, todos os dias.',
    'Decisões financeiras sem ansiedade.',
    'Um sistema que trabalha com você, não contra você.',
  ];

  return (
    <section className="py-20 px-4" style={{ backgroundColor: '#ECFAF2' }}>
      <div className="container mx-auto max-w-4xl">
        <div className="space-y-8">
          {messages.map((message, index) => (
            <motion.div
              key={message}
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className={`flex ${index % 2 === 0 ? 'justify-start' : 'justify-end'}`}
            >
              <div className="max-w-xl">
                <motion.p
                  whileHover={{ scale: 1.02 }}
                  className="text-2xl md:text-3xl font-medium text-gray-800 leading-relaxed p-6 rounded-2xl bg-white/80 backdrop-blur-sm shadow-sm"
                >
                  {message}
                </motion.p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
