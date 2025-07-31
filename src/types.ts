export type ThemeMode = 'class' | 'attribute'

export interface BaseOptions<Light, Dark> {
  light?: Light
  dark?: Dark
  easing?: string
  duration?: number
  /**
   * Key in `localstorage`
   * @default theme
   */
  key?: string
}
export interface ClassModeOptions<Light, Dark> extends BaseOptions<Light, Dark> {}

export interface DataThemeModeOptions<Light, Dark> extends BaseOptions<Light, Dark> {
  /**
   * Key in `data-theme` mode.
   * @example data-theme
   * @default data-theme
   */
  attribute?: string
}

export type ThemeToggleOptions<Light, Dark> = {
  mode: 'class'
} & ClassModeOptions<Light, Dark>
| {
  mode: 'attribute'
} & DataThemeModeOptions<Light, Dark>

export interface ThemeToggleReturn<Light, Dark> {
  toggle: (e?: Event) => void
  onThemeToggled: (cb: (currentTheme: Light | Dark) => void) => void
}

export type TransitionLoader<Light extends string, Dark extends string> = (
  toggleClassOrAttribute: () => Light | Dark,
  options: ThemeToggleOptions<Light, Dark> & {
    root: HTMLElement
    darkSelector: string
    previousTheme: Light | Dark
  },
  e?: any
) => void
