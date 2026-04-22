import { Star } from 'lucide-react';

export function Testimonials() {
  const testimonials = [
    {
      name: 'Ana Paula',
      role: 'Professora',
      text: 'Finalmente consegui visualizar meu dinheiro sem ficar perdido.',
      rating: 5,
    },
    {
      name: 'Carlos Eduardo',
      role: 'Designer',
      text: 'Uso todo mês e não abandono.',
      rating: 5,
    },
    {
      name: 'Mariana Silva',
      role: 'Empreendedora',
      text: 'O sistema é simples e não me cansa.',
      rating: 5,
    },
  ];

  return (
    <section className="py-20" style={{ backgroundColor: 'var(--green-light)' }}>
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center space-y-3 mb-12">
            <h2 className="text-3xl md:text-4xl font-bold">
              O que nossos usuários dizem
            </h2>
            <p className="text-lg text-gray-600">
              Depoimentos reais de quem já tem mais tranquilidade financeira
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1"
              >
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <Star
                      key={i}
                      className="w-5 h-5 fill-current"
                      style={{ color: 'var(--green-cta)' }}
                    />
                  ))}
                </div>
                <p className="text-gray-700 mb-4 leading-relaxed">
                  "{testimonial.text}"
                </p>
                <div className="border-t pt-4">
                  <p className="font-semibold">{testimonial.name}</p>
                  <p className="text-sm text-gray-500">{testimonial.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
