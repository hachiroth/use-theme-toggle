import { defineTransitionLoader } from './defineTransitionLoader'

export const BaseTransition = defineTransitionLoader((toggle, { root }, _e) => {
  const transition = document.startViewTransition(() => {
    toggle()
    root.classList.add('base-transition')
  })
  transition.finished.finally(() => {
    root.classList.remove('base-transition')
  })
})
