import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, m } from 'motion/react'
import { NAV, WHATS_URL, INSTAGRAM_URL, INSTAGRAM_HANDLE, ADDRESS } from '../content'
import { setScrollLocked } from '../lib/motion'
import Monogram from './Monogram'
import SectionLink from './SectionLink'

const ease = [0.22, 1, 0.36, 1]

export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const toggle = useRef(null)
  const menu = useRef(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setScrollLocked(open)
    // com o menu aberto, o resto da página sai da tabulação e do leitor de tela
    const main = document.getElementById('conteudo')
    if (main) main.inert = open
    if (!open) return

    menu.current?.querySelector('a')?.focus({ preventScroll: true })
    const onKey = (e) => {
      if (e.key !== 'Escape') return
      setOpen(false)
      toggle.current?.focus()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  // o menu só existe no mobile: se a janela crescer com ele aberto, fecha
  useEffect(() => {
    const mql = window.matchMedia('(min-width: 1024px)')
    const onChange = (e) => e.matches && setOpen(false)
    mql.addEventListener('change', onChange)
    return () => mql.removeEventListener('change', onChange)
  }, [])

  const close = () => setOpen(false)

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-[background-color,border-color] duration-500 ${
          scrolled && !open ? 'border-b border-ink/8 bg-ivory/95' : 'border-b border-transparent'
        }`}
      >
        <div className="mx-auto flex h-18 max-w-[1440px] items-center justify-between px-5 sm:px-8 lg:px-12">
          <SectionLink
            id="topo"
            onNavigate={close}
            className={`flex items-center gap-3 transition-colors duration-500 ${open ? 'text-ivory' : 'text-ink'}`}
            aria-label="Dra. Thayla Basilio — voltar ao início"
          >
            <Monogram className="w-8" />
            <span
              className="hidden font-serif text-lg leading-none tracking-wide sm:block lg:hidden xl:block"
              aria-hidden="true"
            >
              Thayla Basilio
            </span>
          </SectionLink>

          <nav className="hidden items-center gap-7 lg:flex xl:gap-9" aria-label="Principal">
            {NAV.map((item) => (
              <SectionLink key={item.id} id={item.id} className="link-line eyebrow py-1 text-taupe hover:text-ink">
                {item.label}
              </SectionLink>
            ))}
          </nav>

          <div className="flex items-center gap-4">
            <a
              href={WHATS_URL}
              target="_blank"
              rel="noreferrer"
              className="hidden whitespace-nowrap border border-ink px-5 py-3 eyebrow text-ink transition-colors duration-300 hover:bg-ink hover:text-ivory sm:inline-block"
            >
              Agendar avaliação
            </a>
            <button
              ref={toggle}
              onClick={() => setOpen((v) => !v)}
              className="relative z-10 grid h-11 w-11 place-items-center lg:hidden"
              aria-expanded={open}
              aria-controls="menu-mobile"
              aria-label={open ? 'Fechar menu' : 'Abrir menu'}
            >
              <span
                className={`absolute h-px w-6 transition-all duration-500 ${open ? 'rotate-45 bg-ivory' : '-translate-y-1 bg-ink'}`}
              />
              <span
                className={`absolute h-px w-6 transition-all duration-500 ${open ? '-rotate-45 bg-ivory' : 'translate-y-1 bg-ink'}`}
              />
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <m.div
            ref={menu}
            id="menu-mobile"
            className="fixed inset-0 z-40 flex flex-col justify-between overflow-y-auto bg-night px-6 pb-10 pt-28 text-ivory lg:hidden"
            initial={{ clipPath: 'inset(0 0 100% 0)' }}
            animate={{ clipPath: 'inset(0 0 0% 0)' }}
            exit={{ clipPath: 'inset(0 0 100% 0)' }}
            transition={{ duration: 0.7, ease }}
          >
            <nav aria-label="Seções">
              <ul className="space-y-1">
                {NAV.map((item, i) => (
                  <li key={item.id} className="overflow-hidden">
                    <m.div
                      initial={{ y: '110%' }}
                      animate={{ y: 0 }}
                      transition={{ duration: 0.8, ease, delay: 0.15 + i * 0.05 }}
                    >
                      <SectionLink id={item.id} onNavigate={close} className="flex w-full items-baseline gap-4 py-2">
                        <span className="eyebrow w-6 text-champagne" aria-hidden="true">
                          0{i + 1}
                        </span>
                        <span className="font-serif text-5xl font-light">{item.label}</span>
                      </SectionLink>
                    </m.div>
                  </li>
                ))}
              </ul>
            </nav>

            <m.div
              className="mt-10 space-y-6 border-t border-ivory/15 pt-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.6 }}
            >
              <a
                href={WHATS_URL}
                target="_blank"
                rel="noreferrer"
                className="block bg-ivory py-4 text-center eyebrow text-ink"
              >
                Agendar avaliação
              </a>
              <div className="flex justify-between text-sm text-ivory/70">
                <a href={INSTAGRAM_URL} target="_blank" rel="noreferrer">
                  {INSTAGRAM_HANDLE}
                </a>
                <span>{ADDRESS.city}</span>
              </div>
            </m.div>
          </m.div>
        )}
      </AnimatePresence>
    </>
  )
}
