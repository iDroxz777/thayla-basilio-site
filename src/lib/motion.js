import Lenis from 'lenis'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SplitText } from 'gsap/SplitText'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(ScrollTrigger, SplitText, useGSAP)

export const reducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches

// Com seções presas (pin), a posição restaurada pelo navegador cai no lugar errado
// antes do ScrollTrigger medir a página. Começamos do topo, ou da âncora do link.
if (typeof window !== 'undefined' && 'scrollRestoration' in history) {
  history.scrollRestoration = 'manual'
}

let lenis = null

// Lenis dirigido pelo ticker do GSAP: um único rAF para scroll e animações
export function startSmoothScroll() {
  if (reducedMotion()) return () => {}

  lenis = new Lenis({ duration: 1.1, easing: (t) => 1 - Math.pow(1 - t, 4) })
  lenis.on('scroll', ScrollTrigger.update)

  const tick = (time) => lenis.raf(time * 1000)
  gsap.ticker.add(tick)
  gsap.ticker.lagSmoothing(0)

  return () => {
    gsap.ticker.remove(tick)
    lenis.destroy()
    lenis = null
  }
}

// As seções já têm respiro maior que o cabeçalho fixo, então o alvo é o topo exato.
export function scrollToSection(id, { immediate = false } = {}) {
  const el = id === 'topo' ? 0 : document.getElementById(id)
  if (el === null) return
  if (lenis) return lenis.scrollTo(el, { immediate, force: true })
  const top = el === 0 ? 0 : el.getBoundingClientRect().top + window.scrollY
  window.scrollTo({ top, behavior: immediate || reducedMotion() ? 'auto' : 'smooth' })
}

export function setScrollLocked(locked) {
  if (lenis) {
    if (locked) lenis.stop()
    else lenis.start()
  }
  document.documentElement.style.overflow = locked ? 'hidden' : ''
}

// Várias mudanças de altura seguidas (accordion abrindo e outro fechando) viram um só recálculo.
// Recalcular é caro: remede todas as seções, inclusive a que fica presa no Método.
let refreshTimer = 0
export function queueRefresh(delay = 120) {
  clearTimeout(refreshTimer)
  refreshTimer = setTimeout(() => ScrollTrigger.refresh(), delay)
}

export { gsap, ScrollTrigger, SplitText, useGSAP }
