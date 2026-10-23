import { useId, useState } from 'react'
import { AnimatePresence, m } from 'motion/react'
import { PROCEDURES, WHATS_NUMBER } from '../content'
import { queueRefresh } from '../lib/motion'
import { useMediaQuery } from '../lib/useMediaQuery'
import FaceMap from './FaceMap'
import { RevealTitle } from './Reveal'

const ease = [0.22, 1, 0.36, 1]
const pad = (n) => String(n).padStart(2, '0')

const whatsAbout = (name) =>
  `https://wa.me/${WHATS_NUMBER}?text=${encodeURIComponent(`Olá, Dra. Thayla! Gostaria de saber mais sobre ${name.toLowerCase()}.`)}`

function Item({ item, index, open, onToggle, inlineMap }) {
  const id = useId()
  return (
    <li className="border-b border-ink/15">
      <h3>
        <button
          onClick={onToggle}
          aria-expanded={open}
          aria-controls={id}
          className="group grid w-full grid-cols-[2.5rem_1fr_auto] items-baseline gap-2 py-6 text-left sm:grid-cols-[4rem_1fr_auto] sm:py-7"
        >
          <span
            className={`font-serif text-sm transition-colors duration-500 ${open ? 'text-champagne-deep' : 'text-stone'}`}
          >
            {pad(index + 1)}
          </span>
          <span
            className={`font-serif text-[clamp(1.6rem,3vw,2.6rem)] font-light leading-tight transition-transform duration-700 ease-silk group-hover:translate-x-2 ${
              open ? 'italic' : ''
            }`}
          >
            {item.name}
          </span>
          <span className="relative h-4 w-4 self-center" aria-hidden="true">
            <span className="absolute top-1/2 h-px w-4 bg-ink" />
            <span
              className={`absolute top-1/2 h-px w-4 bg-ink transition-transform duration-500 ease-silk ${open ? 'rotate-0' : 'rotate-90'}`}
            />
          </span>
        </button>
      </h3>

      <AnimatePresence initial={false}>
        {open && (
          <m.div
            id={id}
            key="content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.6, ease }}
            role="region"
            aria-label={item.name}
            // a altura mudou: gatilhos abaixo (Método preso) precisam remedir — agrupado
            onAnimationComplete={() => queueRefresh()}
            className="overflow-hidden"
          >
            <div className="grid gap-6 pb-8 pl-[2.5rem] sm:pl-[4rem]">
              {inlineMap && <FaceMap map={item.map} compact className="aspect-[5/4] max-w-sm" />}
              <p className="max-w-xl text-[1.0625rem] leading-relaxed text-taupe">{item.text}</p>
              <div className="flex flex-wrap items-center justify-between gap-4">
                <ul className="flex flex-wrap gap-2">
                  {item.tags.map((t) => (
                    <li
                      key={t}
                      className="rounded-full border border-ink/15 px-3 py-1 text-xs tracking-wide text-taupe"
                    >
                      {t}
                    </li>
                  ))}
                </ul>
                <a href={whatsAbout(item.name)} target="_blank" rel="noreferrer" className="link-line eyebrow py-1">
                  Tirar dúvidas
                </a>
              </div>
            </div>
          </m.div>
        )}
      </AnimatePresence>
    </li>
  )
}

export default function Procedures() {
  const [active, setActive] = useState(0)
  // um único mapa na página: fixo ao lado no desktop, dentro do item aberto no celular
  const wide = useMediaQuery('(min-width: 1024px)')

  return (
    <section id="procedimentos" className="bg-sand/60">
      <div className="mx-auto grid max-w-[1440px] gap-14 px-5 py-24 sm:px-8 lg:grid-cols-12 lg:gap-6 lg:px-12 lg:py-40">
        <div className="lg:col-span-5">
          <div>
            <p className="eyebrow mb-8 flex items-center gap-4 text-taupe">
              <span className="h-px w-10 bg-champagne" />
              Procedimentos
            </p>
            <RevealTitle className="font-serif text-[clamp(2.5rem,5vw,4.75rem)] font-light leading-[1] tracking-[-0.015em]">
              O que <em className="text-champagne-deep">cada face</em> pede.
            </RevealTitle>
            <p className="mt-8 max-w-sm leading-relaxed text-taupe">
              Os procedimentos de harmonização facial que realizo no consultório, no Centro de Lajeado. A indicação é
              sempre feita em consulta.
            </p>
          </div>

          {wide && (
            <div className="sticky top-28 mt-12">
              <FaceMap
                map={PROCEDURES[active]?.map}
                index={active}
                total={PROCEDURES.length}
                className="aspect-[6/5]"
              />
            </div>
          )}
        </div>

        <ul className="border-t border-ink/15 lg:col-span-6 lg:col-start-7">
          {PROCEDURES.map((item, i) => (
            <Item
              key={item.name}
              item={item}
              index={i}
              open={active === i}
              onToggle={() => setActive(active === i ? -1 : i)}
              inlineMap={!wide}
            />
          ))}
        </ul>
      </div>
    </section>
  )
}
