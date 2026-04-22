export function HeroMockups() {
  return (
    <div className="relative w-full mt-10 pb-20 md:pb-24">
      <img
        src="/images/widget-dados.png"
        alt="Widget Categorias"
        className="hidden lg:block absolute z-20 drop-shadow-xl"
        style={{ left: '10%', top: '28%', width: '23%', maxWidth: '300px' }}
      />
      <img
        src="/images/glass-dashboard.png"
        alt="Painel Minha Finança"
        className="block mx-auto w-full max-w-6xl rounded-xl drop-shadow-2xl relative z-10"
      />
      <img
        src="/images/mockup-celular.png"
        alt="App Mobile"
        className="hidden md:block absolute z-20 drop-shadow-2xl hover:-translate-y-2 transition-transform duration-300"
        style={{ right: '3%', top: '23%', width: '22%', maxWidth: '290px' }}
      />
    </div>
  );
}
