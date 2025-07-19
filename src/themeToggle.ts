import type { ThemeToggleOptions, ThemeToggleReturn, TransitionLoader } from "./types";
import { baseTransition } from "./transitions/baseTransition";

function useThemeToggle<L = "light", D = "dark">(): ThemeToggleReturn<L, D>;
function useThemeToggle<L = "light", D = "dark">(options: ThemeToggleOptions<L, D>): ThemeToggleReturn<L, D>;
function useThemeToggle<L = "light", D = "dark">(loader: TransitionLoader<L, D>): ThemeToggleReturn<L, D>;
function useThemeToggle<L = "light", D = "dark">(loader: TransitionLoader<L, D>, options: ThemeToggleOptions<L, D>): ThemeToggleReturn<L, D>;
function useThemeToggle(arg1?: ThemeToggleOptions | TransitionLoader, arg2?: ThemeToggleOptions): ThemeToggleReturn {
  if (
    typeof window === "undefined"
    || typeof document === "undefined"
    || typeof localStorage === "undefined"
  ) {
    return { toggle: () => {}, onThemeToggled: () => {} };
  }

  let loader: TransitionLoader | null;
  let options: ThemeToggleOptions;

  if (typeof arg1 === "function") {
    loader = arg1;
    options = arg2 || {};
  }
  else {
    loader = null;
    options = arg1 || {};
  }

  const { mode = "class", key = "theme", light = "light", dark = "dark", dataKey = "data-theme", timing = { duration: 500, easing: "ease-in" } } = options;

  const root = document.documentElement;
  let themeCallback = (_currentTheme: string) => {};

  let saved = localStorage.getItem(key);
  if (!saved) {
    localStorage.setItem(key, light);
    saved = light;
  }
  let current = saved === dark ? dark : light;

  if (mode === "class") {
    root.classList.add(current);
  }
  else if (mode === "data-theme") {
    root.setAttribute(dataKey, current);
  }

  const toggleClassDataTheme = () => {
    const next = current === dark ? light : dark;

    if (mode === "class") {
      root.classList.remove(current);
      root.classList.add(next);
    }
    else if (mode === "data-theme") {
      root.setAttribute(dataKey, next);
    }

    current = next;
    localStorage.setItem(key, next);
    themeCallback(next);
    return next;
  };

  return {
    toggle(e) {
      if (!loader || typeof loader !== "function") {
        return baseTransition(e, toggleClassDataTheme, { mode, dark, root }, timing);
      }
      return loader(e, toggleClassDataTheme, { mode, dark, root }, timing);
    },
    onThemeToggled(cb) {
      if (typeof cb === "function") {
        themeCallback = cb;
        themeCallback(current);
      }
    },
  };
}

export { useThemeToggle };
