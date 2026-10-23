import { useRef } from 'react'
import { gsap, SplitText, useGSAP } from '../lib/motion'

// Título que sobe linha a linha quando entra na tela
export function RevealTitle({ as: Tag = 'h2', className = '', children }) {
  const el = useRef(null)

  useGSAP(
    () => {
      const mm = gsap.matchMedia()
      mm.add('(prefers-reduced-motion: no-preference)', () => {
        // autoSplit refaz as linhas se a largura mudar antes da entrada acontecer;
        // depois da entrada o texto volta ao normal e quebra sozinho
        SplitText.create(el.current, {
          type: 'lines',
          mask: 'lines',
          autoSplit: true,
          onSplit: (self) =>
            gsap.from(self.lines, {
              yPercent: 110,
              duration: 1.2,
              stagger: 0.08,
              ease: 'expo.out',
              scrollTrigger: { trigger: el.current, start: 'top 85%', once: true },
              onComplete: () => self.revert(),
            }),
        })
      })
      return () => mm.revert()
    },
    { scope: el },
  )

  return (
    <Tag ref={el} className={className}>
      {children}
    </Tag>
  )
}

// Imagem que abre de baixo pra cima e desliza por dentro do quadro no scroll
export function RevealImage({ src, alt, className = '', frameClass = '', width, height, parallax = 10 }) {
  const frame = useRef(null)

  useGSAP(
    () => {
      const img = frame.current.querySelector('img')
      const mm = gsap.matchMedia()
      mm.add('(prefers-reduced-motion: no-preference)', () => {
        gsap.from(frame.current, {
          clipPath: 'inset(100% 0% 0% 0%)',
          duration: 1.5,
          ease: 'expo.inOut',
          scrollTrigger: { trigger: frame.current, start: 'top 85%', once: true },
        })
        gsap.fromTo(
          img,
          { yPercent: -parallax },
          {
            yPercent: parallax,
            ease: 'none',
            scrollTrigger: { trigger: frame.current, start: 'top bottom', end: 'bottom top', scrub: true },
          },
        )
      })
      return () => mm.revert()
    },
    { scope: frame },
  )

  return (
    <div ref={frame} className={`relative overflow-hidden bg-sand ${frameClass}`}>
      <img
        src={src}
        alt={alt}
        width={width}
        height={height}
        loading="lazy"
        decoding="async"
        className={`absolute inset-0 h-full w-full scale-[1.22] object-cover ${className}`}
      />
    </div>
  )
}
