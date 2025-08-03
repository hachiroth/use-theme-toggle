import type { TransitionLoader } from '@/types'

function ensureStaticStyleInjected(darkSelector: string) {
  const id = 'slide-transition-style'
  if (document.getElementById(id))
    return

  const style = document.createElement('style')
  style.id = id
  style.textContent = `
  ::view-transition-old(*),
  ::view-transition-new(*) {
    animation: none;
    mix-blend-mode: normal;
  }
  ::view-transition-new(root) {
    z-index: 999;
  }
  ::view-transition-old(root) {
    z-index: 1;
  }
  ${darkSelector}::view-transition-new(root) {
    z-index: 1;
  }
  ${darkSelector}::view-transition-old(root) {
    z-index: 999;
  }
`
  document.head.appendChild(style)
}

export function Slide<Light, Dark>(): TransitionLoader<Light, Dark> {
  return (toggle, options, _e) => {
    ensureStaticStyleInjected(options.darkSelector)

    let isDark = false
    const transition = document.startViewTransition(() => {
      const next = toggle()
      isDark = next === options.dark

      document.documentElement.classList.add('slide-transition')
    })

    transition.ready.then(() => {
      const duration = options.duration
      const easing = options.easing

      const newPseudo = isDark
        ? '::view-transition-new(root)'
        : '::view-transition-new(root)'

      const oldPseudo = isDark
        ? '::view-transition-old(root)'
        : '::view-transition-old(root)'

      options.root.animate([
        { transform: `translateX(${isDark ? '100%' : '-100%'})` },
        { transform: 'translateX(0)' },
      ], {
        duration,
        easing,
        pseudoElement: newPseudo,
      })

      options.root.animate([
        { transform: 'translateX(0)' },
        { transform: `translateX(${isDark ? '-100%' : '100%'})` },
      ], {
        duration,
        easing,
        pseudoElement: oldPseudo,
      })
    })

    transition.finished.then(() => {
      document.documentElement.classList.remove('slide-transition')
    })
  }
}
