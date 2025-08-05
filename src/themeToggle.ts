import type { ThemeToggleOptions, ThemeToggleReturn, TransitionLoader } from './types'
import { BaseTransition } from './transitions'

function useThemeToggle<const Light extends string = 'light', const Dark extends string = 'dark'>(): ThemeToggleReturn<Light, Dark>
function useThemeToggle<const Light extends string = 'light', const Dark extends string = 'dark'>(options: ThemeToggleOptions<Light, Dark>): ThemeToggleReturn<Light, Dark>
function useThemeToggle<const Light extends string = 'light', const Dark extends string = 'dark'>(loader: TransitionLoader<Light, Dark>): ThemeToggleReturn<Light, Dark>
function useThemeToggle<const Light extends string = 'light', const Dark extends string = 'dark'>(loader: TransitionLoader<Light, Dark>, options: ThemeToggleOptions<Light, Dark>): ThemeToggleReturn<Light, Dark>

function useThemeToggle<const Light extends string = 'light', const Dark extends string = 'dark'>(
  _arg1?: TransitionLoader<Light, Dark> | ThemeToggleOptions<Light, Dark>,
  _arg2?: ThemeToggleOptions<Light, Dark>,
): ThemeToggleReturn<Light, Dark> {
  if (
    typeof window === 'undefined'
    || typeof document === 'undefined'
    || typeof localStorage === 'undefined'
  ) {
    return { toggle() {}, onThemeToggled() {} }
  }

  let loader: TransitionLoader<Light, Dark> | null
  let options: Required<ThemeToggleOptions<Light, Dark>>

  const defaultOptions: ThemeToggleOptions<Light, Dark> = {
    mode: 'class',
    key: 'theme',
    light: 'light' as Light,
    dark: 'dark' as Dark,
    easing: 'ease-out',
    duration: 500,
  }

  if (typeof _arg1 === 'function') {
    const maybeLoader = _arg1 as any
    options = { ...defaultOptions, ..._arg2 } as Required<ThemeToggleOptions<Light, Dark>>

    if (maybeLoader.length <= 1) {
      loader = maybeLoader()
    }
    else {
      loader = maybeLoader
    }
  }
  else {
    loader = null
    options = { ...defaultOptions, ..._arg1 } as Required<ThemeToggleOptions<Light, Dark>>
  }

  const { mode, light, dark, key } = options

  let attributeName = 'data-theme'
  if (mode === 'attribute') {
    attributeName = options.attribute || attributeName
  }

  const root = document.documentElement
  let toggledCallback = (_currentTheme: Light | Dark) => {}

  // Resume from storage
  let saved = localStorage.getItem(key)
  if (!saved) {
    localStorage.setItem(key, light)
    saved = light
  }
  let current = saved === dark ? dark : light

  const resumeTheme: Record<ThemeToggleOptions<Light, Dark>['mode'], () => void> = {
    class: () => root.classList.add(current),
    attribute: () => root.setAttribute(attributeName, current),
    both: () => {
      root.classList.add(current)
      root.setAttribute(attributeName, current)
    },
  }

  resumeTheme[mode]?.()

  const darkSelector = options.mode === 'class' ? `.${options.dark}` : `[${attributeName}=${options.dark}]`

  /**
   * Toggle class or attribute
   * @returns Next theme
   */
  const toggleClassOrAttribute = () => {
    const next = current === dark ? light : dark

    const toggleMap: Record<ThemeToggleOptions<Light, Dark>['mode'], () => void> = {
      class: () => {
        root.classList.remove(current)
        root.classList.add(next)
      },
      attribute: () => {
        root.setAttribute(attributeName, next)
      },
      both: () => {
        root.classList.remove(current)
        root.classList.add(next)
        root.setAttribute(attributeName, next)
      },
    }

    toggleMap[mode]?.()

    current = next
    localStorage.setItem(key, next)
    toggledCallback(next)
    return next
  }

  return {
    toggle(e) {
      if (!loader || typeof loader !== 'function') {
        const loader = BaseTransition<Light, Dark>()
        return loader(toggleClassOrAttribute, { ...options, root, darkSelector, previousTheme: current }, e)
      }
      return loader?.(toggleClassOrAttribute, { ...options, root, darkSelector, previousTheme: current }, e)
    },
    onThemeToggled(cb) {
      if (typeof cb === 'function') {
        toggledCallback = cb
        toggledCallback(current)
      }
    },
  }
}

export { useThemeToggle }
