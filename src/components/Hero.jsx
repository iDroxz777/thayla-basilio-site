import { useRef } from 'react'
import { CRO, WHATS_URL } from '../content'
import { gsap, SplitText, useGSAP, scrollToSection } from '../lib/motion'

// Pontos de referência da face no retrato (em % da altura da foto), medidos sobre a imagem.
// É a leitura dos terços faciais — a base de qualquer planejamento em HOF.
const GUIDES = [
  { y: 24, label: 'Tríquio' },
  { y: 27.6, label: 'Glabela' },
  { y: 31.3, label: 'Subnasal' },
  { y: 36, label: 'Mento' },
]
// linhas cobrem só a largura do rosto (em % da largura da foto)
const FACE = { left: 40, mid: 50.5, right: 61 }
const ROMAN = ['i', 'ii', 'iii', 'iv']

export default function Hero({ ready }) {
  const root = useRef(null)

  useGSAP(
    () => {
      if (!ready) return
      const mm = gsap.matchMedia()

      mm.add('(prefers-reduced-motion: no-preference)', () => {
        const title = SplitText.create('.hero-title', { type: 'lines,words', mask: 'lines' })
        // depois da entrada, desfaz a divisão: se a tela girar, o título quebra linha naturalmente
        const tl = gsap.timeline({ defaults: { ease: 'expo.out' }, onComplete: () => title.revert() })

        // a foto é revelada por uma cortina por cima (não por clip na própria imagem):
        // assim ela já conta como pintada para o LCP desde o primeiro quadro
        tl.fromTo('.hero-shutter', { scaleY: 1 }, { scaleY: 0, duration: 1.6, ease: 'expo.inOut' })
          .from('.hero-img', { scale: 1.25, duration: 2.2 }, '<')
          .from(title.words, { yPercent: 115, duration: 1.3, stagger: 0.05 }, '-=1.3')
          .from('.hero-fade', { opacity: 0, y: 16, duration: 1, stagger: 0.08 }, '-=0.9')
          // linhas "esticam" a partir da esquerda (tracejado + non-scaling-stroke abria buracos no meio)
          .from(
            '.guide-h',
            { scaleX: 0, transformOrigin: '0% 50%', duration: 1.2, stagger: 0.08, ease: 'power3.inOut' },
            '-=0.8',
          )
          .from('.guide-v', { scaleY: 0, transformOrigin: '50% 0%', duration: 1, ease: 'power3.inOut' }, '<0.3')
          .from('.guide-label', { opacity: 0, x: -6, duration: 0.6, stagger: 0.12 }, '<0.4')

        // saída suave: a foto afunda e o texto sobe um pouco mais rápido
        gsap.to('.hero-media', {
          yPercent: 12,
          ease: 'none',
          scrollTrigger: { trigger: root.current, start: 'top top', end: 'bottom top', scrub: true },
        })
        gsap.to('.hero-copy', {
          yPercent: -18,
          opacity: 0.2,
          ease: 'none',
          scrollTrigger: { trigger: root.current, start: 'top top', end: 'bottom top', scrub: true },
        })
      })

      return () => mm.revert()
    },
    { scope: root, dependencies: [ready] },
  )

  return (
    <section id="topo" ref={root} className="relative overflow-hidden">
      <div className="mx-auto grid max-w-[1440px] gap-14 px-5 pb-16 pt-28 lg:min-h-svh sm:px-8 lg:grid-cols-12 lg:items-center lg:gap-6 lg:px-12 lg:pb-16">
        <div className="hero-copy lg:col-span-7">
          <p className="hero-fade eyebrow mb-7 flex items-center gap-4 text-taupe">
            <span className="h-px w-10 bg-champagne" />
            Harmonização Orofacial · Lajeado, RS
          </p>

          <h1 className="hero-title font-serif text-[clamp(3.4rem,9.2vw,9.25rem)] font-light leading-[0.92] tracking-[-0.02em]">
            Sua face,
            <br />
            em <em className="font-light text-champagne-deep">harmonia</em>.
          </h1>

          <div className="mt-10 flex flex-col gap-9 lg:mt-12">
            <p className="hero-fade max-w-md text-[1.0625rem] leading-relaxed text-taupe">
              Sou a Dra. Thayla Basilio, cirurgiã-dentista em Lajeado. Cada rosto tem suas próprias proporções — por
              isso o atendimento é individual e o planejamento, exclusivo para você.
            </p>

            <div className="hero-fade flex flex-wrap items-center gap-x-8 gap-y-5">
              <a
                href={WHATS_URL}
                target="_blank"
                rel="noreferrer"
                className="group inline-flex items-center gap-4 bg-ink px-7 py-4 eyebrow text-ivory transition-colors duration-300 hover:bg-taupe"
              >
                Agendar avaliação
                <span className="h-px w-6 bg-ivory transition-all duration-500 group-hover:w-10" />
              </a>
              <button onClick={() => scrollToSection('procedimentos')} className="link-line eyebrow py-1 text-ink">
                Procedimentos
              </button>
            </div>
          </div>
        </div>

        <div className="hero-media mx-auto w-full max-w-[20rem] sm:max-w-[23rem] lg:col-span-4 lg:col-start-9 lg:max-w-none">
          <figure>
            {/* guias e rótulos medem só o quadro da foto, sem a legenda */}
            <div className="relative">
              <div className="hero-frame arch relative aspect-[2/3] overflow-hidden bg-sand">
                <img
                  src="/img/retrato-hero.webp"
                  alt="Dra. Thayla Basilio Gullo, cirurgiã-dentista de harmonização facial em Lajeado"
                  className="hero-img h-full w-full object-cover"
                  width="1400"
                  height="2100"
                  fetchPriority="high"
                />
                <div className="hero-shutter absolute inset-0 origin-top bg-ivory" style={{ transform: 'scaleY(0)' }} />
              </div>

              <svg
                className="pointer-events-none absolute inset-0 h-full w-full overflow-visible drop-shadow-[0_0_1.5px_rgb(20_19_18/0.7)]"
                viewBox="0 0 100 150"
                preserveAspectRatio="none"
                aria-hidden="true"
              >
                <g stroke="var(--color-champagne)" strokeWidth="0.6" opacity="0.9">
                  {GUIDES.map((g) => (
                    <g key={g.label}>
                      {/* desktop: a linha sai do quadro e encontra o rótulo à esquerda */}
                      <line
                        className="guide-h hidden lg:inline"
                        x1={-38}
                        x2={FACE.left}
                        y1={g.y * 1.5}
                        y2={g.y * 1.5}
                        vectorEffect="non-scaling-stroke"
                      />
                      <line
                        className="guide-h"
                        x1={FACE.left}
                        x2={FACE.right}
                        y1={g.y * 1.5}
                        y2={g.y * 1.5}
                        vectorEffect="non-scaling-stroke"
                      />
                      {/* celular: rótulo dentro da foto, à direita do rosto */}
                      <line
                        className="guide-h lg:hidden"
                        x1={FACE.right}
                        x2={FACE.right + 5}
                        y1={g.y * 1.5}
                        y2={g.y * 1.5}
                        strokeOpacity="0.5"
                        vectorEffect="non-scaling-stroke"
                      />
                    </g>
                  ))}
                  <line
                    className="guide-v"
                    x1={FACE.mid}
                    x2={FACE.mid}
                    y1={GUIDES[0].y * 1.5 - 3}
                    y2={GUIDES.at(-1).y * 1.5 + 3}
                    vectorEffect="non-scaling-stroke"
                  />
                </g>
              </svg>

              {/* desktop: rótulos fora do quadro, apoiados sobre a linha */}
              <ul
                className="pointer-events-none absolute inset-y-0 right-full mr-3 hidden w-28 lg:block"
                aria-hidden="true"
              >
                {GUIDES.map((g, i) => (
                  <li
                    key={g.label}
                    className="guide-label absolute right-0 -translate-y-full whitespace-nowrap pb-1 text-right text-[0.625rem] uppercase tracking-[0.24em] text-stone"
                    style={{ top: `${g.y}%` }}
                  >
                    <span className="mr-2 font-serif text-xs normal-case tracking-normal text-champagne-deep">
                      {ROMAN[i]}
                    </span>
                    {g.label}
                  </li>
                ))}
              </ul>

              {/* celular: rótulos dentro da foto, no fundo escuro ao lado do rosto */}
              <ul className="pointer-events-none absolute inset-0 lg:hidden" aria-hidden="true">
                {GUIDES.map((g, i) => (
                  <li
                    key={g.label}
                    className="guide-label absolute -translate-y-1/2 whitespace-nowrap text-[0.5625rem] uppercase leading-none tracking-[0.18em] text-ivory/85"
                    style={{ top: `${g.y}%`, left: `${FACE.right + 7}%` }}
                  >
                    <span className="mr-1.5 font-serif text-[0.6875rem] normal-case tracking-normal text-champagne-soft">
                      {ROMAN[i]}
                    </span>
                    {g.label}
                  </li>
                ))}
              </ul>
            </div>

            <figcaption className="hero-fade mt-4 flex items-start gap-3 text-[0.625rem] uppercase leading-relaxed tracking-[0.24em] text-stone">
              <span className="mt-[0.8em] h-px w-6 shrink-0 bg-stone/50" />
              <span>
                <span className="block">Dra. Thayla Basilio Gullo</span>
                <span className="block text-champagne-deep">{CRO}</span>
              </span>
            </figcaption>
          </figure>
        </div>
      </div>
    </section>
  )
}
