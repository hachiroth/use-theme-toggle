import type { TransitionLoader } from "@/types";

export const Slide: TransitionLoader = (_e, toggleClassDataTheme, { mode, dark, root }, timing) => {
  const { duration = 500, easing = "ease-in" } = timing || {};

  const darkSelector = mode === "class" ? `.${dark}` : `[data-theme="${dark}"]`;

  const existedStyle = document.querySelector("style[data-slide-transition]");
  if (existedStyle) {
    existedStyle.remove();
  }

  const style = document.createElement("style");
  style.setAttribute("data-slide-transition", "true");
  style.textContent = /* css */`
    ::view-transition-old(root),
    ::view-transition-new(root) {
      animation: none;
      mix-blend-mode: normal;
    }
    
    @keyframes dark-enter {
      from {
        clip-path: inset(0 100% 0 0);
      }
      to {
        clip-path: inset(0 0 0 0);
      }
    }
    
    @keyframes light-enter {
      from {
        clip-path: inset(0 0 0 100%);
      }
      to {
        clip-path: inset(0 0 0 0);
      }
    }
    
    ${darkSelector}::view-transition-new(root) {
      animation: dark-enter ${duration}ms ${easing} forwards;
    }
    
    :not(${darkSelector})::view-transition-new(root) {
      animation: light-enter ${duration}ms ${easing} forwards;
    }
    
    ::view-transition-old(root) {
      animation: none;
    }
  `;
  document.head.appendChild(style);

  const transition = document.startViewTransition(() => {
    toggleClassDataTheme();
    root.classList.add("slide-transitioning");
  });

  transition.finished.finally(() => {
    style.remove();
    root.classList.remove("slide-transitioning");
  });
};
