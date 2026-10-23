import { FORMACAO } from '../content'
import { RevealImage, RevealTitle } from './Reveal'

export default function About() {
  return (
    <section id="sobre" className="mx-auto max-w-[1440px] px-5 py-24 sm:px-8 lg:px-12 lg:py-40">
      <div className="grid gap-14 lg:grid-cols-12 lg:gap-6">
        <div className="lg:col-span-5">
          <RevealImage
            src="/img/retrato-sentada.webp"
            alt="Dra. Thayla Basilio, especializada em harmonização orofacial, em retrato preto e branco"
            width="1066"
            height="1599"
            frameClass="aspect-[4/5] w-full"
            className="object-[50%_30%]"
          />
          <p className="eyebrow mt-4 text-stone">Lajeado · Rio Grande do Sul</p>
        </div>

        <div className="flex flex-col justify-between gap-16 lg:col-span-6 lg:col-start-7 lg:pt-10">
          <div>
            <p className="eyebrow mb-8 flex items-center gap-4 text-taupe">
              <span className="h-px w-10 bg-champagne" />
              Sobre mim
            </p>
            <RevealTitle className="font-serif text-[clamp(2.5rem,5vw,4.75rem)] font-light leading-[1] tracking-[-0.015em]">
              Precisão de dentista, <em className="text-champagne-deep">olhar</em> de quem cuida.
            </RevealTitle>

            <div className="mt-10 grid gap-6 text-[1.0625rem] leading-relaxed text-taupe sm:grid-cols-2 sm:gap-8">
              <p>
                Me formei em Odontologia e, na Harmonização Orofacial, juntei as duas coisas que mais gosto: a precisão
                da anatomia e a sensibilidade de entender cada pessoa.
              </p>
              <p>
                Aqui, nenhum protocolo é pronto. Antes de qualquer agulha existe uma conversa, uma análise da sua face e
                um plano que respeita quem você é.
              </p>
            </div>
          </div>

          <dl className="border-t border-ink/15">
            {FORMACAO.map((f) => (
              <div
                key={f.title}
                className="grid gap-1 border-b border-ink/15 py-6 sm:grid-cols-[1fr_auto] sm:items-baseline sm:gap-6"
              >
                <dt className="font-serif text-2xl font-light">{f.title}</dt>
                <dd className="eyebrow text-stone">{f.place}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  )
}
