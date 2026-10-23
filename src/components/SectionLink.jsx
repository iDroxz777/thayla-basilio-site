import { scrollToSection } from '../lib/motion'

// Âncora de verdade (clique do meio, copiar link, leitor de tela), com a rolagem suave do Lenis
export default function SectionLink({ id, onNavigate, className, children, ...rest }) {
  return (
    <a
      href={`#${id}`}
      className={className}
      onClick={(e) => {
        if (e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return
        e.preventDefault()
        onNavigate?.()
        // espera o menu fechar e o scroll destravar
        requestAnimationFrame(() => scrollToSection(id))
      }}
      {...rest}
    >
      {children}
    </a>
  )
}
