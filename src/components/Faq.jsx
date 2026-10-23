import { FAQ, WHATS_URL } from '../content'
import { queueRefresh } from '../lib/motion'
import { RevealTitle } from './Reveal'

// <details> nativo de propósito: a resposta fica no HTML mesmo fechada,
// então o Google lê tudo (e funciona sem JavaScript, no teclado e no leitor de tela)
export default function Faq() {
  return (
    <section id="duvidas" className="bg-sand/60">
      <div className="mx-auto grid max-w-[1440px] gap-14 px-5 py-24 sm:px-8 lg:grid-cols-12 lg:gap-6 lg:px-12 lg:py-40">
        <div className="lg:col-span-4">
          <div className="lg:sticky lg:top-28">
            <p className="eyebrow mb-8 flex items-center gap-4 text-taupe">
              <span className="h-px w-10 bg-champagne" />
              Dúvidas frequentes
            </p>
            <RevealTitle className="font-serif text-[clamp(2.5rem,5vw,4.75rem)] font-light leading-[1] tracking-[-0.015em]">
              Antes de <em className="text-champagne-deep">agendar</em>.
            </RevealTitle>
            <p className="mt-8 max-w-sm leading-relaxed text-taupe">
              O que mais me perguntam sobre harmonização facial. Não achou a sua dúvida?
            </p>
            <a
              href={WHATS_URL}
              target="_blank"
              rel="noreferrer"
              className="link-line eyebrow mt-6 inline-block py-1.5 text-ink"
            >
              Pergunte pelo WhatsApp
            </a>
          </div>
        </div>

        <div className="border-t border-ink/15 lg:col-span-7 lg:col-start-6">
          {FAQ.map((item) => (
            <details key={item.q} className="faq group border-b border-ink/15" onToggle={() => queueRefresh()}>
              <summary className="flex cursor-pointer list-none items-start justify-between gap-6 py-6 sm:py-7 [&::-webkit-details-marker]:hidden">
                <h3 className="font-serif text-[clamp(1.35rem,2.2vw,1.9rem)] font-light leading-snug transition-colors duration-300 group-open:italic">
                  {item.q}
                </h3>
                <span className="relative mt-3 h-4 w-4 shrink-0" aria-hidden="true">
                  <span className="absolute top-1/2 h-px w-4 bg-ink" />
                  <span className="absolute top-1/2 h-px w-4 rotate-90 bg-ink transition-transform duration-500 ease-silk group-open:rotate-0" />
                </span>
              </summary>
              <p className="max-w-2xl pb-8 pr-10 text-[1.0625rem] leading-relaxed text-taupe">{item.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  )
}
