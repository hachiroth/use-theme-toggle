# use-theme-toggle

> 🌗 A lightweight theme toggler with animated transitions and customizable strategies.

## Features

- ⚡ **Fast & Lightweight** – Minimal footprint and zero dependencies
- 🎨 **Customizable** – Plug in your own theme transition strategies
- 💫 **Smooth Animations** – Built-in support for View Transitions API
- 💡 **Flexible Mode** – Class-based or attribute-based theme toggling
- 🌈 **Framework Agnostic** – Works with any frontend project

## Installation

```bash
npm install use-theme-toggle
# or
pnpm add use-theme-toggle
```

## Usage

### Basic Usage

```ts
import { useThemeToggle } from "use-theme-toggle";

const { toggle, theme, isDark } = useThemeToggle();
```

### With Options

```ts
const { toggle } = useThemeToggle({
  light: "light",
  dark: "dark",
  mode: "data-theme", // or "class"
});
```

## Built-in Transitions

```ts
import { Ripple, Slide } from "use-theme-toggle";

// Use with options:
useThemeToggle(Ripple);
```

| Name   | Effect Description         |
|--------|----------------------------|
| `Ripple` | A diffusive, ripple-like animation |
| `Slide`  | A directional slide-from-left transition |

You can also write your own strategy by implementing the `TransitionLoader` type.

## Custom Strategy

```ts
import type { TransitionLoader } from "use-theme-toggle";

const myCustomTransition: TransitionLoader = (el, toggleClassDataTheme, meta, timing) => {
  document.startViewTransition(() => {
    toggle();
  });
};
```

## TypeScript

Full TypeScript support is built in, including:

- `ThemeToggleOptions`
- `ThemeToggleReturn`
- `TransitionLoader`

## License

[MIT](./LICENSE)
