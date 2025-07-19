export type ThemeMode = "class" | "data-theme";

export type AnimationType = "element-plus" | "t-design";

export interface ThemeToggleOptions<L = string, D = string> {
  mode?: ThemeMode;
  key?: string;
  light?: L;
  dark?: D;
  dataKey?: string;
  timing?: EffectTiming;
}

export interface ThemeToggleReturn<L = string, D = string> {
  toggle: (e: MouseEvent) => void;
  onThemeToggled: (cb: (currentTheme: L | D) => void) => void;
}

export interface TransitionLoader<L = string, D = string> {
  (
    e: MouseEvent,
    toggleClassDataTheme: () => L | D,
    meta: {
      mode: ThemeMode;
      dark: D;
      root: HTMLElement;
    },
    timing?: EffectTiming
  ): void;
}
