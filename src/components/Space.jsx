import { ADDRESS, MAPS_LINK } from '../content'
import { RevealImage, RevealTitle } from './Reveal'

export default function Space() {
  return (
    <section id="espaco" className="bg-night text-ivory">
      <div className="mx-auto max-w-[1440px] px-5 py-24 sm:px-8 lg:px-12 lg:py-40">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-6">
          <div className="lg:col-span-6">
            <p className="eyebrow mb-8 flex items-center gap-4 text-ivory/60">
              <span className="h-px w-10 bg-champagne" />
              Nosso espaço
            </p>
            <RevealTitle className="font-serif text-[clamp(2.5rem,5vw,4.75rem)] font-light leading-[1] tracking-[-0.015em]">
              Um lugar pensado para você <em className="text-champagne-soft">desacelerar</em>.
            </RevealTitle>
          </div>
          <p className="max-w-md self-end leading-relaxed text-ivory/70 lg:col-span-4 lg:col-start-9">
            O ambiente foi planejado para oferecer uma experiência acolhedora e exclusiva. Cada detalhe reflete o
            compromisso com qualidade, bem-estar e excelência no atendimento.
          </p>
        </div>

        <div className="mt-16 grid gap-5 sm:grid-cols-12 lg:mt-24 lg:gap-6">
          <figure className="sm:col-span-7">
            <RevealImage
              src="/img/espaco-recepcao.webp"
              alt="Recepção do consultório com poltronas brancas e o monograma TB iluminado na parede"
              width="1200"
              height="1600"
              frameClass="aspect-[4/5] w-full"
              parallax={8}
            />
            <figcaption className="eyebrow mt-4 text-ivory/60">Recepção</figcaption>
          </figure>

          <div className="flex flex-col justify-between gap-12 sm:col-span-5">
            <figure className="sm:mt-32">
              <RevealImage
                src="/img/espaco-consultorio.webp"
                alt="Sala de atendimento com cadeira clínica, mesa em mármore e janela ampla"
                width="574"
                height="1020"
                frameClass="aspect-[3/4] w-full"
                parallax={8}
              />
              <figcaption className="eyebrow mt-4 text-ivory/60">Sala de atendimento</figcaption>
            </figure>

            <address className="not-italic">
              <p className="eyebrow mb-4 text-champagne">Endereço</p>
              <p className="font-serif text-3xl font-light leading-snug">
                {ADDRESS.street}
                <br />
                {ADDRESS.room}
              </p>
              <p className="mt-2 text-ivory/60">{ADDRESS.city}</p>
              <a href={MAPS_LINK} target="_blank" rel="noreferrer" className="link-line eyebrow mt-8 inline-block py-1">
                Abrir no mapa
              </a>
            </address>
          </div>
        </div>
      </div>
    </section>
  )
}
