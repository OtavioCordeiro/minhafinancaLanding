import { motion } from 'motion/react';
import { Play } from 'lucide-react';
import { useState } from 'react';

export function VideoSection() {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <section id="video" className="py-20 px-4 bg-white">
      <div className="container mx-auto max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="text-center space-y-4 mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold" style={{ color: '#028A31' }}>
            Veja como é simples
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Veja como organizar suas finanças de forma simples e sem estresse.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="relative aspect-video rounded-2xl overflow-hidden shadow-2xl bg-gradient-to-br from-gray-100 to-gray-200"
        >
          {!isPlaying ? (
            <button
              onClick={() => setIsPlaying(true)}
              className="absolute inset-0 flex items-center justify-center group cursor-pointer"
              style={{
                backgroundImage: 'url(/images/capa_video.png)',
                backgroundSize: 'cover',
                backgroundPosition: 'center'
              }}
            >
              {/* Overlay escuro suave */}
              <div className="absolute inset-0 bg-black opacity-30 group-hover:opacity-40 transition-opacity"></div>

              {/* Ícone de play */}
              <motion.div
                whileHover={{ scale: 1.15 }}
                whileTap={{ scale: 0.95 }}
                className="relative z-10"
              >
                <div className="relative w-24 h-24 rounded-full flex items-center justify-center shadow-2xl"
                  style={{ backgroundColor: '#6ADB06' }}
                >
                  <Play className="w-10 h-10 text-white ml-1" fill="white" />
                </div>
              </motion.div>

              {/* Texto indicativo */}
              <div className="absolute bottom-8 left-0 right-0 text-center z-10">
                <p className="text-white text-lg font-semibold drop-shadow-lg">
                  Clique para assistir a demonstração
                </p>
              </div>
            </button>
          ) : (
            <video
              className="w-full h-full object-cover"
              controls
              autoPlay
              playsInline
              preload="auto"
            >
              <source src="/videos/apresentacao.mp4" type="video/mp4" />
              Seu navegador não suporta a tag de vídeo.
            </video>
          )}
        </motion.div>

        {/* Features preview below video */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12"
        >
          {[
            { label: 'Interface clara', icon: '✨' },
            { label: 'Organização visual', icon: '📊' },
            { label: 'Controle simplificado', icon: '🎯' },
          ].map((item, index) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 + index * 0.1 }}
              className="text-center p-4"
            >
              <div className="text-3xl mb-2">{item.icon}</div>
              <div className="text-sm font-medium text-gray-700">{item.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
