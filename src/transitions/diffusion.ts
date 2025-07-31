import { defineTransitionLoader } from './defineTransitionLoader'

function ensureStaticStyleInjected(darkSelector: string) {
  const id = 'diffusion-transition-style'
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

export const Diffusion = defineTransitionLoader((toggle, options, e: MouseEvent) => {
  const x = e.clientX
  const y = e.clientY
  const radius = Math.hypot(
    Math.max(x, window.innerWidth),
    Math.max(y, window.innerHeight),
  )
  let isDark = false

  ensureStaticStyleInjected(options.darkSelector)

  const transition = document.startViewTransition(() => {
    const current = toggle()
    isDark = current === options.dark
    options.root.classList.add('diffusion-transition')
  })

  transition.ready.then(() => {
    const clipPath = [
      `circle(0px at ${x}px ${y}px)`,
      `circle(${radius}px at ${x}px ${y}px)`,
    ]

    options.root.animate({
      clipPath: isDark ? [...clipPath].reverse() : [...clipPath],
    }, {
      duration: options.duration,
      easing: options.easing,
      pseudoElement: isDark ? '::view-transition-old(root)' : '::view-transition-new(root)',
    })
  })

  transition.finished.then(() => {
    options.root.classList.remove('diffusion-transition')
  })
})
