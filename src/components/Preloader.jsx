import { useRef } from 'react'
import { gsap, useGSAP } from '../lib/motion'
import Monogram from './Monogram'

// Curta de propósito (~1,1s até a cortina subir): o topo já anima por baixo dela,
// então o conteúdo principal aparece cedo em vez de esperar a abertura inteira.
export default function Preloader({ onReveal, onDone }) {
  const root = useRef(null)
  const t = useRef(null)
  const b = useRef(null)

  useGSAP(
    () => {
      const fonts = document.fonts?.ready ?? Promise.resolve()
      const tl = gsap.timeline({ paused: true, onComplete: onDone })

      tl.from(t.current, { yPercent: -40, opacity: 0, duration: 0.8, ease: 'expo.out' })
        .from(b.current, { yPercent: 30, opacity: 0, duration: 0.8, ease: 'expo.out' }, '<0.1')
        .from('.pre-name', { opacity: 0, y: 8, duration: 0.5, ease: 'power2.out' }, '-=0.5')
        .to('.pre-inner', { opacity: 0, y: -12, duration: 0.35, ease: 'power2.in' }, '+=0.15')
        .add(onReveal)
        .to(root.current, { clipPath: 'inset(0 0 100% 0)', duration: 0.9, ease: 'expo.inOut' }, '<')

      // espera as fontes (até 1,5s) pra SplitText do topo medir as linhas certas.
      // `alive` evita que um timeline já revertido (StrictMode) dispare callbacks.
      let alive = true
      const timeout = new Promise((r) => setTimeout(r, 1500))
      Promise.race([fonts, timeout]).then(() => alive && tl.play())
      return () => {
        alive = false
      }
    },
    { scope: root },
  )

  return (
    <div
      ref={root}
      className="fixed inset-0 z-[100] grid place-items-center bg-night text-champagne-soft"
      style={{ clipPath: 'inset(0 0 0% 0)' }}
      aria-hidden="true"
    >
      <div className="pre-inner flex flex-col items-center gap-8">
        <Monogram className="w-32 sm:w-40" tRef={t} bRef={b} />
        <p className="pre-name eyebrow text-ivory/60">Dra. Thayla Basilio</p>
      </div>
    </div>
  )
}
