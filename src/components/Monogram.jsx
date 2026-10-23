// Monograma TB da identidade da Dra. — as letras são as mesmas da apresentação,
// usadas como máscara para herdar a cor do texto ao redor. As hastes do T e do B
// se sobrepõem, como no letreiro do consultório.
export default function Monogram({ className = '', tRef, bRef }) {
  return (
    <span className={`relative inline-block aspect-square ${className}`} role="img" aria-label="TB">
      <span
        ref={tRef}
        className="mono-mask absolute left-0 top-0 h-[95%] w-full"
        style={{ maskImage: 'url(/img/mono-t.webp)' }}
      />
      <span
        ref={bRef}
        className="mono-mask absolute left-[9.5%] top-0 h-full w-[78%]"
        style={{ maskImage: 'url(/img/mono-b.webp)' }}
      />
    </span>
  )
}
