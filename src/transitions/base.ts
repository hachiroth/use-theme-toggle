import type { TransitionLoader } from '@/types'

export function BaseTransition<Light, Dark>(): TransitionLoader<Light, Dark> {
  return (toggle, { root }, _e) => {
    const transition = document.startViewTransition(() => {
      toggle()
      root.classList.add('base-transition')
    })
    transition.finished.finally(() => {
      root.classList.remove('base-transition')
    })
  }
}
