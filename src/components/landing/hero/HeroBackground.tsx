export function HeroBackground() {
  return (
    <>
      <div
        className="absolute z-0 pointer-events-none rounded-full"
        style={{ width: '616px', height: '609px', right: '-80px', bottom: '-80px', background: '#61A866', filter: 'blur(200px)', opacity: 0.55, transform: 'rotate(-15deg)' }}
      />
      <div
        className="absolute z-0 pointer-events-none rounded-full"
        style={{ width: '616px', height: '609px', left: '-100px', bottom: '0px', background: '#0AB58D', filter: 'blur(200px)', opacity: 0.5, transform: 'rotate(-15deg)' }}
      />
      <div
        className="absolute z-0 pointer-events-none rounded-full"
        style={{ width: '652px', height: '717px', left: '182px', top: '200px', background: 'white', filter: 'blur(200px)', opacity: 0.75, transform: 'rotate(-47deg)' }}
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 z-[1] pointer-events-none"
        style={{ backgroundImage: "url('/images/bolinha.png')", backgroundRepeat: 'repeat', backgroundSize: '24px 24px', opacity: 0.25, filter: 'brightness(0)' }}
      />
    </>
  );
}
