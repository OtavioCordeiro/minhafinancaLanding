import './App.css'

const LOGO_URL = '/Logocortadaembaixo.png'


function App() {
  return (
    <div className="min-h-screen w-full relative bg-white font-inter">

      {/* ─── Hero Section Card ─── */}
      <section className="relative mx-4 my-4 md:mx-[120px] md:my-[25px] rounded-[30px] overflow-hidden min-h-[600px] md:min-h-[997px]">

        {/* Camada 0: green glow blobs */}
        <div className="absolute z-0 pointer-events-none rounded-full" style={{ width: '616px', height: '609px', right: '-80px', bottom: '-80px', background: '#61A866', filter: 'blur(200px)', opacity: 0.55, transform: 'rotate(-15deg)' }} />
        <div className="absolute z-0 pointer-events-none rounded-full" style={{ width: '616px', height: '609px', left: '-100px', bottom: '0px', background: '#0AB58D', filter: 'blur(200px)', opacity: 0.5, transform: 'rotate(-15deg)' }} />
        <div className="absolute z-0 pointer-events-none rounded-full" style={{ width: '652px', height: '717px', left: '182px', top: '200px', background: 'white', filter: 'blur(200px)', opacity: 0.75, transform: 'rotate(-47deg)' }} />

        {/* Camada 1: bolinha texture */}
        <div aria-hidden="true" className="absolute inset-0 z-[1] pointer-events-none" style={{ backgroundImage: "url('/bolinha.png')", backgroundRepeat: 'repeat', backgroundSize: '24px 24px', opacity: 0.25, filter: 'brightness(0)' }} />

        {/* Camada 10: conteúdo */}
        <div className="relative z-10">

          {/* ─── Navbar ─── */}
          <div className="flex justify-center pt-8 px-4">
            <nav className="flex items-center gap-6 lg:gap-[80px] px-6 md:px-8 py-3 rounded-full bg-white/75 backdrop-blur-md border border-[#E0E2E5] shadow-[0_8px_30px_rgba(0,0,0,0.05)]">
              <img src={LOGO_URL} alt="Minha Finança" className="h-[38px] w-auto flex-shrink-0" />
              <ul className="hidden md:flex items-center gap-6 list-none">
                {[
                  { label: 'Início',      href: '#'            },
                  { label: 'Recursos',    href: '#recursos'    },
                  { label: 'Planos',      href: '#planos'      },
                  { label: 'Depoimentos', href: '#depoimentos' },
                  { label: 'FAQ',         href: '#faq'         },
                ].map(({ label, href }) => (
                  <li key={label}>
                    <a href={href} className="text-black text-base font-normal hover:opacity-60 transition-opacity" style={{ fontFamily: 'Inter, sans-serif' }}>
                      {label}
                    </a>
                  </li>
                ))}
              </ul>
              <button className="flex-shrink-0 px-4 py-2 text-white text-base font-semibold rounded-full cursor-pointer transition-opacity hover:opacity-90" style={{ background: '#43BE17', border: '1px solid #E0E2E5', fontFamily: 'Inter, sans-serif' }}>
                Login
              </button>
            </nav>
          </div>

          {/* ─── Texto Hero ─── */}
          <div className="flex flex-col items-center text-center px-4 md:px-14 pt-12 md:pt-16">
            <h1 className="text-4xl md:text-[48px] font-semibold text-black max-w-3xl" style={{ fontFamily: 'Inter, sans-serif', lineHeight: '1.2' }}>
              Menos estresse com dinheiro.<br />
              Mais tranquilidade no dia a dia.
            </h1>
            <p className="mt-6 text-lg font-normal" style={{ color: '#555555', fontFamily: 'Inter, sans-serif' }}>
              Você no controle do seu dinheiro, não o contrário.
            </p>
            <div className="mt-8 flex items-center justify-center gap-4 flex-wrap">
              <button className="px-5 py-3 text-white text-base font-semibold rounded-[10px] cursor-pointer hover:opacity-90 transition-opacity" style={{ background: '#43BE17', fontFamily: 'Inter, sans-serif' }}>
                Começar Grátis
              </button>
              <button className="px-5 py-3 text-base font-semibold rounded-[10px] cursor-pointer hover:opacity-80 transition-opacity" style={{ background: 'white', color: '#111111', border: '1px solid #E5E7EB', fontFamily: 'Inter, sans-serif' }}>
                Ver Demonstração
              </button>
            </div>
          </div>

          {/* ─── Composição: Dashboard + Widget + Celular ─── */}
          {/*
            Layout de 3 camadas side-by-side:
            [Categorias widget]  [Dashboard 63% width]  [Celular]
            O dashboard é centrado. Os elementos laterais são absolute
            dentro do container full-width, posicionados nos 18% livres de cada lado.
          */}
          <div className="relative w-full mt-10 pb-20 md:pb-24">

            {/* Widget Dados — flutua bottom-left, visível em lg+ */}
            <img
              src="/Widget%20-%20Dados.png"
              alt="Widget Categorias"
              className="hidden lg:block absolute z-20 drop-shadow-xl"
              style={{ left: '10%', top: '28%', width: '23%', maxWidth: '300px' }}
            />

            {/* Dashboard — centralizado, 63% da largura */}
            <img
              src="/Glass%20-%20Dashboard.png"
              alt="Painel Minha Finança"
              className="block mx-auto w-full max-w-6xl rounded-xl drop-shadow-2xl relative z-10"
            />

            {/* Celular — flutua bottom-right */}
            <img
              src="/Mockup%20-%20Celular.png"
              alt="App Mobile"
              className="hidden md:block absolute z-20 drop-shadow-2xl hover:-translate-y-2 transition-transform duration-300"
              style={{ right: '3%', top: '23%', width: '22%', maxWidth: '290px' }}
            />

          </div>

        </div>
      </section>

      {/* ─── Seção: Recursos ─── */}
      <section id="recursos" className="min-h-96 py-20 bg-white flex items-center justify-center">
        <h2 className="text-3xl font-semibold text-gray-300" style={{ fontFamily: 'Inter, sans-serif' }}>Seção Recursos</h2>
      </section>

      {/* ─── Seção: Planos ─── */}
      <section id="planos" className="min-h-96 py-20 bg-gray-50 flex items-center justify-center">
        <h2 className="text-3xl font-semibold text-gray-300" style={{ fontFamily: 'Inter, sans-serif' }}>Seção Planos</h2>
      </section>

      {/* ─── Seção: Depoimentos ─── */}
      <section id="depoimentos" className="min-h-96 py-20 bg-white flex items-center justify-center">
        <h2 className="text-3xl font-semibold text-gray-300" style={{ fontFamily: 'Inter, sans-serif' }}>Seção Depoimentos</h2>
      </section>

      {/* ─── Seção: FAQ ─── */}
      <section id="faq" className="min-h-96 py-20 bg-gray-50 flex items-center justify-center">
        <h2 className="text-3xl font-semibold text-gray-300" style={{ fontFamily: 'Inter, sans-serif' }}>Seção FAQ</h2>
      </section>

      {/* ─── Footer ─── */}
      <footer className="py-10 bg-white border-t border-gray-100 flex items-center justify-center">
        <p className="text-sm text-gray-400" style={{ fontFamily: 'Inter, sans-serif' }}>
          © 2026 Minha Finança. Todos os direitos reservados.
        </p>
      </footer>

    </div>
  )
}

export default App
