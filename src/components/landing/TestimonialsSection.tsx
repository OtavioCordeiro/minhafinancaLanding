import { motion } from 'motion/react';
import { Star, Quote } from 'lucide-react';

export function TestimonialsSection() {
  const testimonials = [
    {
      name: 'Ana Carolina',
      role: 'Professora',
      text: 'Finalmente consegui visualizar meu dinheiro sem ficar perdida.',
      rating: 5,
    },
    {
      name: 'Roberto Silva',
      role: 'Freelancer',
      text: 'Uso todo mês e não abandono.',
      rating: 5,
    },
    {
      name: 'Mariana Costa',
      role: 'Empreendedora',
      text: 'O sistema é simples e não me cansa.',
      rating: 5,
    },
  ];

  return (
    <section id="depoimentos" data-testid="testimonials-section" className="py-20 px-4" style={{ backgroundColor: '#ECFAF2' }}>
      <div className="container mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="text-center space-y-4 mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold" style={{ color: '#028A31' }}>
            Quem usa, aprova
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Veja o que nossos usuários falam sobre o Minha Finança.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              whileHover={{ y: -5 }}
              className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-lg transition-all relative"
            >
              <Quote 
                className="absolute top-6 right-6 w-8 h-8 opacity-10"
                style={{ color: '#028A31' }}
              />
              
              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star 
                    key={i} 
                    className="w-4 h-4" 
                    style={{ color: '#6ADB06' }}
                    fill="#6ADB06"
                  />
                ))}
              </div>

              <p className="text-gray-700 text-lg mb-6 leading-relaxed">
                "{testimonial.text}"
              </p>

              <div className="flex items-center gap-3">
                <div 
                  className="w-12 h-12 rounded-full flex items-center justify-center text-white font-semibold"
                  style={{ backgroundColor: '#028A31' }}
                >
                  {testimonial.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div>
                  <div className="font-semibold text-gray-900">{testimonial.name}</div>
                  <div className="text-sm text-gray-500">{testimonial.role}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
