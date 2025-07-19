import type { TransitionLoader } from "@/types";

export const baseTransition: TransitionLoader = (_e, toggleClassDataTheme, { root }, _timing) => {
  const transition = document.startViewTransition(() => {
    toggleClassDataTheme();
    root.classList.add("base-transitioning");
  });

  transition.finished.finally(() => {
    root.classList.remove("base-transitioning");
  });
};
