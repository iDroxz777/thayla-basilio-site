import { useCallback, useEffect, useState } from 'react'
import { AnimatePresence, domAnimation, LazyMotion, m, useMotionValueEvent, useScroll } from 'motion/react'
import { WHATS_URL } from './content'
import { reducedMotion, scrollToSection, ScrollTrigger, startSmoothScroll } from './lib/motion'
import Preloader from './components/Preloader'
import Header from './components/Header'
import Hero from './components/Hero'
import Manifesto from './components/Manifesto'
import About from './components/About'
import Procedures from './components/Procedures'
import Method from './components/Method'
import Space from './components/Space'
import Faq from './components/Faq'
import Contact from './components/Contact'

// Abertura só na primeira visita da sessão — e nunca para quem pediu menos movimento
const skipIntro = () => {
  if (reducedMotion()) return true
  try {
    return sessionStorage.getItem('tb-intro') === '1'
  } catch {
    return false
  }
}

function BookingPill() {
  const { scrollY } = useScroll()
  const [show, setShow] = useState(false)
  useMotionValueEvent(scrollY, 'change', (y) => {
    const nearEnd = y + window.innerHeight > document.documentElement.scrollHeight - 900
    setShow(y > window.innerHeight * 0.8 && !nearEnd)
  })

  return (
    <AnimatePresence>
      {show && (
        <m.a
          href={WHATS_URL}
          target="_blank"
          rel="noreferrer"
          className="fixed bottom-5 left-1/2 z-30 flex -translate-x-1/2 items-center gap-3 whitespace-nowrap rounded-full bg-ink py-3.5 pl-5 pr-6 eyebrow text-ivory shadow-[0_18px_40px_-18px_rgb(20_19_18/0.6)] sm:hidden"
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 80, opacity: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="h-1.5 w-1.5 rounded-full bg-champagne" />
          Agendar avaliação
        </m.a>
      )}
    </AnimatePresence>
  )
}

export default function App() {
  const [intro, setIntro] = useState(() => !skipIntro())
  // `ready` libera a entrada do topo; acontece quando a cortina começa a subir, não quando termina
  const [ready, setReady] = useState(() => !intro)

  useEffect(() => startSmoothScroll(), [])

  const reveal = useCallback(() => setReady(true), [])
  const finishIntro = useCallback(() => {
    try {
      sessionStorage.setItem('tb-intro', '1')
    } catch {
      /* navegação privada: tudo bem mostrar de novo */
    }
    setIntro(false)
  }, [])

  // fontes e imagens lazy mudam a altura da página depois do primeiro cálculo
  useEffect(() => {
    const refresh = () => ScrollTrigger.refresh()
    document.fonts?.ready.then(refresh)
    window.addEventListener('load', refresh)
    return () => window.removeEventListener('load', refresh)
  }, [])

  // link direto para uma seção (ex.: /#procedimentos)
  useEffect(() => {
    if (!ready) return
    const id = decodeURIComponent(location.hash.slice(1))
    if (!id || !document.getElementById(id)) return
    requestAnimationFrame(() => {
      ScrollTrigger.refresh()
      scrollToSection(id, { immediate: true })
    })
  }, [ready])

  return (
    <LazyMotion features={domAnimation} strict>
      <a
        href="#conteudo"
        className="fixed left-4 top-4 z-[110] -translate-y-24 bg-ink px-5 py-3 eyebrow text-ivory transition-transform focus:translate-y-0"
      >
        Pular para o conteúdo
      </a>
      {intro && <Preloader onReveal={reveal} onDone={finishIntro} />}
      <div className="grain" aria-hidden="true" />
      <Header />
      <main id="conteudo" tabIndex={-1} className="outline-none">
        <Hero ready={ready} />
        <Manifesto />
        <About />
        <Procedures />
        <Method />
        <Space />
        <Faq />
        <Contact />
      </main>
      <BookingPill />
    </LazyMotion>
  )
}
