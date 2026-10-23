import { useRef } from 'react'
import { MANIFESTO } from '../content'
import { gsap, SplitText, useGSAP } from '../lib/motion'
import Monogram from './Monogram'

export default function Manifesto() {
  const root = useRef(null)

  useGSAP(
    () => {
      const mm = gsap.matchMedia()
      mm.add('(prefers-reduced-motion: no-preference)', () => {
        // o texto "acende" palavra por palavra conforme a leitura desce
        const split = SplitText.create('.manifesto-text', { type: 'words' })
        gsap.fromTo(
          split.words,
          { opacity: 0.14 },
          {
            opacity: 1,
            stagger: 0.1,
            ease: 'none',
            scrollTrigger: { trigger: '.manifesto-text', start: 'top 80%', end: 'bottom 50%', scrub: true },
          },
        )
        gsap.from('.manifesto-sign', {
          y: 24,
          opacity: 0,
          duration: 1.2,
          ease: 'expo.out',
          scrollTrigger: { trigger: '.manifesto-sign', start: 'top 90%', once: true },
        })
      })
      return () => mm.revert()
    },
    { scope: root },
  )

  return (
    <section ref={root} className="relative overflow-hidden bg-night text-ivory">
      <div className="mx-auto max-w-[1440px] px-5 py-24 sm:px-8 lg:px-12 lg:py-40">
        <h2 className="eyebrow mb-10 flex items-center gap-4 text-champagne lg:mb-14">
          <span className="h-px w-10 bg-champagne" />
          Filosofia
        </h2>

        <p className="manifesto-text max-w-[22ch] font-serif text-[clamp(2.1rem,5.6vw,5.75rem)] font-light leading-[1.04] tracking-[-0.015em] sm:max-w-[26ch]">
          {MANIFESTO}
        </p>

        <div className="manifesto-sign mt-16 grid gap-10 border-t border-ivory/15 pt-10 sm:grid-cols-12 sm:items-end lg:mt-24">
          <p className="max-w-md leading-relaxed text-ivory/70 sm:col-span-7 lg:col-span-5">
            Naturalidade é quando o resultado não denuncia o procedimento. Por isso cada plano começa pela escuta —
            nunca pela seringa.
          </p>
          <div className="flex items-center gap-5 text-champagne-soft sm:col-span-5 sm:justify-self-end lg:col-span-4 lg:col-start-9">
            <Monogram className="w-12" />
            <p className="leading-tight">
              <span className="block font-serif text-2xl font-light italic text-ivory">Dra. Thayla Basilio</span>
              <span className="eyebrow mt-1 block whitespace-nowrap tracking-[0.22em] text-ivory/60">
                Harmonização Orofacial
              </span>
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
