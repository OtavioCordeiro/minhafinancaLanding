import { motion } from 'motion/react';
import { Heart, Shield, Lock, Users } from 'lucide-react';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white py-16 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Brand */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: '#028A31' }}>
                <span className="text-white text-xl font-bold">M</span>
              </div>
              <span className="font-semibold text-xl">Minha Finança</span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              Menos estresse com dinheiro, mais tranquilidade no dia a dia.
            </p>
          </motion.div>

          {/* Product */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <h4 className="font-semibold mb-4">Produto</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><a href="#hero" className="hover:text-white transition-colors">Início</a></li>
              <li><a href="#video" className="hover:text-white transition-colors">Demonstração</a></li>
              <li><a href="#features" className="hover:text-white transition-colors">Funcionalidades</a></li>
              <li><a href="#faq" className="hover:text-white transition-colors">FAQ</a></li>
            </ul>
          </motion.div>

          {/* Support */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h4 className="font-semibold mb-4">Suporte</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>
                <button
                  onClick={() => {
                    const message = encodeURIComponent('Olá! Preciso de ajuda com o Minha Finança.');
                    window.open(`https://wa.me/?text=${message}`, '_blank');
                  }}
                  className="hover:text-white transition-colors"
                >
                  WhatsApp
                </button>
              </li>
              <li><a href="#" className="hover:text-white transition-colors">Central de Ajuda</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Privacidade</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Termos de Uso</a></li>
            </ul>
          </motion.div>

          {/* Trust badges */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <h4 className="font-semibold mb-4">Segurança</h4>
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-sm text-gray-400">
                <Shield className="w-4 h-4" style={{ color: '#6ADB06' }} />
                <span>Conforme LGPD</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-400">
                <Lock className="w-4 h-4" style={{ color: '#6ADB06' }} />
                <span>Dados criptografados</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-400">
                <Users className="w-4 h-4" style={{ color: '#6ADB06' }} />
                <span>Privacidade garantida</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Bottom */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="pt-8 border-t border-gray-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-gray-400"
        >
          <p>© {currentYear} Minha Finança. Todos os direitos reservados.</p>
          <p className="flex items-center gap-1">
            Feito com <Heart className="w-4 h-4" style={{ color: '#6ADB06' }} fill="#6ADB06" /> para você ter mais tranquilidade
          </p>
        </motion.div>
      </div>
    </footer>
  );
}
