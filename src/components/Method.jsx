import { useRef } from 'react'
import { METHOD } from '../content'
import { gsap, useGSAP } from '../lib/motion'

export default function Method() {
  const root = useRef(null)
  const track = useRef(null)

  useGSAP(
    () => {
      const mm = gsap.matchMedia()

      // desktop: a seção prende e os passos correm na horizontal (layout no variant `pinned` do CSS)
      mm.add('(min-width: 1024px) and (prefers-reduced-motion: no-preference)', () => {
        const distance = () => track.current.scrollWidth - window.innerWidth
        const tween = gsap.to(track.current, {
          x: () => -distance(),
          ease: 'none',
          scrollTrigger: {
            trigger: root.current,
            start: 'top top',
            end: () => `+=${distance()}`,
            pin: true,
            scrub: 0.8,
            invalidateOnRefresh: true,
          },
        })
        gsap.fromTo(
          '.method-progress',
          { scaleX: 0 },
          {
            scaleX: 1,
            ease: 'none',
            scrollTrigger: { trigger: root.current, start: 'top top', end: () => `+=${distance()}`, scrub: true },
          },
        )

        gsap.utils.toArray('.method-step').forEach((step) => {
          gsap.from(step.querySelectorAll('.step-anim'), {
            y: 40,
            opacity: 0,
            stagger: 0.08,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: step,
              containerAnimation: tween,
              start: 'left 95%',
              end: 'left 65%',
              scrub: true,
            },
          })
        })
      })

      mm.add('(max-width: 1023px) and (prefers-reduced-motion: no-preference)', () => {
        gsap.utils.toArray('.method-step').forEach((step) => {
          gsap.from(step, {
            y: 40,
            opacity: 0,
            duration: 1,
            ease: 'power3.out',
            scrollTrigger: { trigger: step, start: 'top 85%', once: true },
          })
        })
      })

      return () => mm.revert()
    },
    { scope: root },
  )

  return (
    <section id="metodo" ref={root} className="relative overflow-hidden bg-ivory pinned:h-svh">
      <div
        ref={track}
        className="flex flex-col gap-16 px-5 py-24 sm:px-8 pinned:h-full pinned:w-max pinned:flex-row pinned:items-center pinned:gap-0 pinned:px-12 pinned:py-0"
      >
        <header className="max-w-lg pinned:w-[36vw] pinned:max-w-none pinned:pr-[6vw]">
          <p className="eyebrow mb-8 flex items-center gap-4 text-taupe">
            <span className="h-px w-10 bg-champagne" />
            Método
          </p>
          <h2 className="font-serif text-[clamp(2.5rem,5vw,4.75rem)] font-light leading-[1] tracking-[-0.015em]">
            Um caminho em <em className="text-champagne-deep">quatro</em> tempos.
          </h2>
          <p className="mt-8 max-w-sm leading-relaxed text-taupe">
            Do primeiro contato ao retorno: cada etapa existe para que você saiba exatamente o que está acontecendo.
          </p>
        </header>

        <ol className="grid gap-14 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8 pinned:flex pinned:gap-0">
          {METHOD.map((step, i) => (
            <li
              key={step.title}
              className="method-step relative flex flex-col border-t border-ink/15 pt-8 pinned:h-[62svh] pinned:w-[30vw] pinned:justify-between pinned:border-l pinned:border-t-0 pinned:px-[3vw] pinned:pt-0"
            >
              <span className="step-anim font-serif text-[clamp(5rem,11vw,10rem)] font-light leading-none text-champagne-deep/80">
                {String(i + 1).padStart(2, '0')}
              </span>
              <div className="mt-6 pinned:mt-0">
                <h3 className="step-anim font-serif text-4xl font-light">{step.title}</h3>
                <p className="step-anim mt-4 max-w-xs leading-relaxed text-taupe">{step.text}</p>
              </div>
            </li>
          ))}
        </ol>
        <div className="hidden w-[8vw] pinned:block" />
      </div>

      <div className="absolute inset-x-12 bottom-10 hidden h-px bg-ink/10 pinned:block" aria-hidden="true">
        <div className="method-progress h-full origin-left bg-ink" />
      </div>
    </section>
  )
}
