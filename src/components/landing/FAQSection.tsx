import { motion } from 'motion/react';
import { ChevronDown } from 'lucide-react';
import { useState } from 'react';

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      question: 'O Minha Finança é gratuito?',
      answer: 'Sim, você pode começar gratuitamente e usar todas as funcionalidades essenciais para controlar suas finanças.',
    },
    {
      question: 'Preciso conectar minha conta bancária?',
      answer: 'Não! Você tem total controle dos seus dados. Adicione suas transações manualmente, sem precisar conectar sua conta bancária.',
    },
    {
      question: 'Meus dados estão seguros?',
      answer: 'Sim, seguimos todas as diretrizes da LGPD e as melhores práticas de segurança para proteger suas informações financeiras.',
    },
    {
      question: 'Funciona para uso pessoal?',
      answer: 'Sim! O Minha Finança é perfeito para uso pessoal e também para controle financeiro familiar.',
    },
    {
      question: 'Posso tirar dúvidas?',
      answer: 'Sim, oferecemos atendimento direto via WhatsApp para ajudar você com qualquer dúvida ou dificuldade.',
    },
  ];

  return (
    <section id="faq" data-testid="faq-section" className="py-20 px-4 bg-white">
      <div className="container mx-auto max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="text-center space-y-4 mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold" style={{ color: '#028A31' }}>
            Perguntas frequentes
          </h2>
          <p className="text-lg text-gray-600">
            Tire suas dúvidas sobre o Minha Finança.
          </p>
        </motion.div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="border border-gray-200 rounded-xl overflow-hidden bg-white hover:shadow-md transition-all"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-gray-50 transition-colors"
              >
                <span className="font-semibold text-gray-900 pr-4">{faq.question}</span>
                <motion.div
                  animate={{ rotate: openIndex === index ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <ChevronDown className="w-5 h-5 flex-shrink-0" style={{ color: '#028A31' }} />
                </motion.div>
              </button>
              
              <motion.div
                initial={false}
                animate={{
                  height: openIndex === index ? 'auto' : 0,
                  opacity: openIndex === index ? 1 : 0,
                }}
                transition={{ duration: 0.3, ease: 'easeInOut' }}
                className="overflow-hidden"
              >
                <div className="px-6 pb-5 text-gray-600 leading-relaxed">
                  {faq.answer}
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* Contact CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center mt-12 p-8 rounded-2xl"
          style={{ backgroundColor: '#ECFAF2' }}
        >
          <p className="text-gray-700 mb-4">Ainda tem dúvidas?</p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => {
              const message = encodeURIComponent('Olá! Tenho algumas dúvidas sobre o Minha Finança.');
              window.open(`https://wa.me/?text=${message}`, '_blank');
            }}
            className="px-6 py-3 rounded-lg text-white font-medium transition-all"
            style={{ backgroundColor: '#028A31' }}
          >
            Fale conosco no WhatsApp
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}
