import { motion } from 'motion/react';
import { MessageCircle } from 'lucide-react';
import { useState, useEffect } from 'react';

export function WhatsAppButton() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Show button after a short delay
    const timer = setTimeout(() => setIsVisible(true), 1000);
    return () => clearTimeout(timer);
  }, []);

  const handleClick = () => {
    const message = encodeURIComponent('Olá! Quero entender como posso ter mais controle financeiro e menos estresse no dia a dia.');
    window.open(`https://wa.me/?text=${message}`, '_blank');
  };

  if (!isVisible) return null;

  return (
    <motion.div
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      className="fixed bottom-6 right-6 z-50"
    >
      <button
        type="button"
        onClick={handleClick}
        className="w-14 h-14 rounded-full shadow-2xl flex items-center justify-center group hover:scale-110 active:scale-95 transition-transform"
        style={{ backgroundColor: '#25D366', touchAction: 'manipulation' }}
      >
        <MessageCircle className="w-7 h-7 text-white" />
      
        {/* Pulse animation */}
        <motion.div
          className="absolute inset-0 rounded-full"
          style={{ backgroundColor: '#25D366' }}
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.7, 0, 0.7],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />

        {/* Tooltip */}
        <div className="absolute right-full mr-3 px-4 py-2 rounded-lg bg-gray-900 text-white text-sm whitespace-nowrap pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity">
          Fale conosco no WhatsApp
          <div
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-full w-0 h-0 border-8 border-transparent border-l-gray-900"
          />
        </div>
      </button>
    </motion.div>
  );
}
