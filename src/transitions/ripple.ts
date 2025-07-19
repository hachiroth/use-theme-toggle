import type { TransitionLoader } from "@/types";

export const Ripple: TransitionLoader = (e, toggleClassDataTheme, { mode, dark, root }, timing) => {
  const { duration = 500, easing = "ease-in" } = timing || {};
  const x = e.clientX;
  const y = e.clientY;
  const radius = Math.hypot(
    Math.max(x, window.innerWidth),
    Math.max(y, window.innerHeight),
  );

  const darkSelector = mode === "class" ? `.${dark}` : `[data-theme="${dark}"]`;

  const existedStyle = document.querySelector(
    "style[data-ripple-transition]",
  );
  if (existedStyle)
    existedStyle.remove();

  const style = document.createElement("style");
  style.setAttribute("data-ripple-transition", "true");
  style.textContent = /* css */ `
    @keyframes ripple-transition {
      from {
        clip-path: circle(0px at ${x}px ${y}px);
      }to {
        clip-path: circle(${radius}px at ${x}px ${y}px)
      }
    }
    ::view-transition-old(root),
    ::view-transition-new(root) {
      animation: none;
      mix-blend-mode: normal;
    }
    ${darkSelector}::view-transition-new(root) {
      z-index: 1;
    }
    ${darkSelector}::view-transition-old(root) {
      z-index: 999;
      animation: ripple-transition ${duration}ms ${easing} forwards reverse;
    }
    ::view-transition-new(root) {
      z-index: 999;
      animation: ripple-transition ${duration}ms ${easing} forwards
    }
    ::view-transition-old(root) {
      z-index: 1;
    }
  `;
  document.head.appendChild(style);

  const transition = document.startViewTransition(() => {
    toggleClassDataTheme();
    root.classList.add("ripple-transitioning");
  });

  transition.finished.finally(() => {
    style.remove();
    root.classList.remove("ripple-transitioning");
  });
};
