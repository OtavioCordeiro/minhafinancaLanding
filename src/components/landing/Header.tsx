import { motion } from 'motion/react';

interface HeaderProps {
  onOpenRegisterModal: () => void;
}

const NAV_LINKS = [
  { label: 'Início',      href: '#hero'        },
  { label: 'Recursos',    href: '#recursos'    },
  { label: 'Planos',      href: '#planos'      },
  { label: 'Depoimentos', href: '#depoimentos' },
  { label: 'FAQ',         href: '#faq'         },
];

export function Header({ onOpenRegisterModal }: HeaderProps) {
  return (
    <motion.header
      className="fixed top-0 left-0 right-0 z-50 flex justify-center pt-6 px-4"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      <nav
        className="flex items-center gap-6 lg:gap-[80px] px-6 md:px-8 py-3 rounded-full border"
        style={{
          background: 'rgba(255,255,255,0.12)',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
          borderColor: 'rgba(255,255,255,0.25)',
        }}
      >
        <img
          src="/logo.png"
          alt="Minha Finança"
          className="h-[38px] w-auto flex-shrink-0 cursor-pointer"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        />

        <ul className="hidden md:flex items-center gap-6 list-none">
          {NAV_LINKS.map(({ label, href }) => (
            <li key={label}>
              <a
                href={href}
                className="text-base font-normal text-black hover:opacity-60 transition-opacity"
              >
                {label}
              </a>
            </li>
          ))}
        </ul>

        <button
          type="button"
          onClick={onOpenRegisterModal}
          className="flex-shrink-0 px-5 py-2 text-white text-base font-semibold rounded-full hover:opacity-90 transition-opacity cursor-pointer"
          style={{ background: '#43BE17' }}
        >
          Login
        </button>
      </nav>
    </motion.header>
  );
}
