import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      question: 'O Minha Finança é gratuito?',
      answer: 'Sim, você pode começar gratuitamente e ter acesso a todas as funcionalidades essenciais para organizar suas finanças.',
    },
    {
      question: 'Preciso conectar conta bancária?',
      answer: 'Não, você tem total controle dos seus dados. Você adiciona manualmente suas receitas e despesas, sem necessidade de conectar sua conta bancária.',
    },
    {
      question: 'Meus dados estão seguros?',
      answer: 'Sim, seguimos as melhores práticas de segurança e estamos em conformidade com a LGPD. Seus dados são criptografados e protegidos.',
    },
    {
      question: 'Funciona para uso pessoal?',
      answer: 'Sim, o Minha Finança é perfeito para uso pessoal e também familiar. Organize suas finanças da forma que fizer mais sentido para você.',
    },
    {
      question: 'Posso tirar dúvidas?',
      answer: 'Sim, nosso atendimento está disponível via WhatsApp para ajudar você com qualquer dúvida ou questão.',
    },
  ];

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <div className="text-center space-y-3 mb-12">
            <h2 className="text-3xl md:text-4xl font-bold">
              Perguntas frequentes
            </h2>
            <p className="text-lg text-gray-600">
              Tire suas dúvidas sobre o Minha Finança
            </p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="border-2 border-gray-100 rounded-xl overflow-hidden transition-all duration-300 hover:border-gray-200"
              >
                <button
                  onClick={() => setOpenIndex(openIndex === index ? null : index)}
                  className="w-full px-6 py-4 flex items-center justify-between text-left bg-white hover:bg-gray-50 transition-colors"
                >
                  <span className="font-semibold text-lg pr-4">
                    {faq.question}
                  </span>
                  <ChevronDown
                    className={`w-5 h-5 flex-shrink-0 transition-transform duration-300 ${
                      openIndex === index ? 'rotate-180' : ''
                    }`}
                    style={{ color: 'var(--green-primary)' }}
                  />
                </button>
                <div
                  className={`overflow-hidden transition-all duration-300 ${
                    openIndex === index ? 'max-h-40' : 'max-h-0'
                  }`}
                >
                  <div className="px-6 pb-4 text-gray-600 leading-relaxed">
                    {faq.answer}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
