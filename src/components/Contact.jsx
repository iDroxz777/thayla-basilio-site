import { useState } from 'react'
import {
  ADDRESS,
  CRO,
  INSTAGRAM_HANDLE,
  INSTAGRAM_URL,
  MAPS_EMBED,
  NAV,
  PHONE_TEL,
  WHATS_DISPLAY,
  WHATS_URL,
} from '../content'
import SectionLink from './SectionLink'
import Monogram from './Monogram'
import { RevealTitle } from './Reveal'

// O embed do Google Maps baixa ~1MB de scripts; só carrega quando a pessoa pede
function MapFacade() {
  const [loaded, setLoaded] = useState(false)

  if (loaded) {
    return (
      <iframe
        title="Localização do consultório no mapa"
        src={MAPS_EMBED}
        className="h-full w-full grayscale contrast-[0.9]"
        referrerPolicy="no-referrer-when-downgrade"
      />
    )
  }

  return (
    <button
      onClick={() => setLoaded(true)}
      className="group relative grid h-full w-full place-items-center overflow-hidden bg-sand text-left"
      aria-label="Carregar mapa do consultório"
    >
      <img
        src="/img/espaco-recepcao.webp"
        alt=""
        loading="lazy"
        className="absolute inset-0 h-full w-full object-cover opacity-30 grayscale transition-transform duration-[1.2s] ease-silk group-hover:scale-105"
      />
      <span className="relative flex flex-col items-center gap-4 text-ink">
        <span className="grid h-14 w-14 place-items-center rounded-full border border-ink/40 transition-colors duration-300 group-hover:bg-ink group-hover:text-ivory">
          <svg
            viewBox="0 0 24 24"
            className="h-5 w-5"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.2"
            aria-hidden="true"
          >
            <path d="M12 21s-6.5-5.6-6.5-11a6.5 6.5 0 0 1 13 0c0 5.4-6.5 11-6.5 11Z" />
            <circle cx="12" cy="10" r="2.3" />
          </svg>
        </span>
        <span className="eyebrow">Ver no mapa</span>
      </span>
    </button>
  )
}

export default function Contact() {
  return (
    <>
      <section id="contato" className="mx-auto max-w-[1440px] px-5 py-24 sm:px-8 lg:px-12 lg:py-40">
        <div className="grid gap-16 lg:grid-cols-12 lg:gap-6">
          <div className="lg:col-span-7">
            <p className="eyebrow mb-8 flex items-center gap-4 text-taupe">
              <span className="h-px w-10 bg-champagne" />
              Agendamento
            </p>
            <RevealTitle className="font-serif text-[clamp(3rem,7.5vw,7.5rem)] font-light leading-[0.95] tracking-[-0.02em]">
              Vamos cuidar <br />
              de <em className="text-champagne-deep">você</em>?
            </RevealTitle>
            <p className="mt-10 max-w-md text-[1.0625rem] leading-relaxed text-taupe">
              A primeira consulta é uma avaliação: conversamos, analiso sua face e montamos o seu planejamento. Os
              agendamentos são feitos pelo WhatsApp.
            </p>

            <div className="mt-12 flex flex-wrap items-center gap-x-10 gap-y-6">
              <a
                href={WHATS_URL}
                target="_blank"
                rel="noreferrer"
                className="group inline-flex items-center gap-4 bg-ink px-8 py-5 eyebrow text-ivory transition-colors duration-300 hover:bg-taupe"
              >
                Agendar pelo WhatsApp
                <span className="h-px w-6 bg-ivory transition-all duration-500 group-hover:w-10" />
              </a>
              <div className="text-sm leading-relaxed text-taupe">
                <a href={PHONE_TEL} className="link-line block w-fit py-1.5">
                  {WHATS_DISPLAY}
                </a>
                <a href={INSTAGRAM_URL} target="_blank" rel="noreferrer" className="link-line block w-fit py-1.5">
                  {INSTAGRAM_HANDLE}
                </a>
              </div>
            </div>
          </div>

          <div className="lg:col-span-4 lg:col-start-9">
            <div className="arch aspect-square overflow-hidden bg-sand lg:aspect-[3/4]">
              <MapFacade />
            </div>
            <p className="mt-4 text-sm leading-relaxed text-taupe">
              {ADDRESS.street} — {ADDRESS.room}
              <br />
              {ADDRESS.city}
            </p>
          </div>
        </div>
      </section>

      <footer className="bg-night text-ivory/60">
        <div className="mx-auto max-w-[1440px] px-5 pb-10 pt-20 sm:px-8 lg:px-12">
          <div className="flex flex-col gap-12 border-b border-ivory/10 pb-16 lg:flex-row lg:items-end lg:justify-between">
            <div className="flex items-center gap-6 text-champagne-soft">
              <Monogram className="w-16" />
              <div>
                <p className="font-serif text-3xl font-light text-ivory">Dra. Thayla Basilio Gullo</p>
                <p className="eyebrow mt-2">Harmonização Orofacial</p>
              </div>
            </div>
            <nav aria-label="Rodapé" className="flex flex-wrap gap-x-8 gap-y-3">
              {NAV.map((item) => (
                <SectionLink key={item.id} id={item.id} className="link-line eyebrow py-1 hover:text-ivory">
                  {item.label}
                </SectionLink>
              ))}
            </nav>
          </div>

          <div className="flex flex-col gap-3 pt-8 text-xs tracking-wide sm:flex-row sm:justify-between">
            <p>Responsável técnica: Dra. Thayla Basilio Gullo · {CRO}</p>
            <p>Harmonização facial em Lajeado e no Vale do Taquari · © {new Date().getFullYear()}</p>
          </div>
        </div>
      </footer>
    </>
  )
}
