# use-theme-toggle

> 🌗 A lightweight theme toggler with animated transitions and customizable loader.

## Features

- ⚡ **Fast & Lightweight** – Minimal footprint and zero dependencies
- 🎨 **Customizable** – Plug in your own theme transition loader
- 💫 **Smooth Animations** – Built-in support for View Transitions API
- 💡 **Flexible Mode** – Class-based or attribute-based theme toggling
- 🌈 **Framework Agnostic** – Works with any frontend project

## Installation

```bash
npm install use-theme-toggle
```

## Usage

### Basic Usage

```ts
import { useThemeToggle } from 'use-theme-toggle'

const { toggle, onThemeToggled } = useThemeToggle()
```

### With Options

```ts
const { toggle, onThemeToggled } = useThemeToggle({
  mode: 'attribute',
  light: 'custom-light',
})
```

## Built-in Transitions

```ts
import { Diffusion, Slide } from 'use-theme-toggle'

// Use with options:
const { toggle, onThemeToggled } = useThemeToggle(Diffusion)
```

| Name   | Effect Description         |
|--------|----------------------------|
| `Diffusion` | A diffusive, ripple-like animation |
| `Slide`  | A directional slide-from-left transition |

You can also write your own loader by implementing the `TransitionLoader` type.

## Custom Loader

```ts
import type { TransitionLoader } from 'use-theme-toggle'

function myCustomTransition<Light, Dark>(): TransitionLoader<Light, Dark> {
  return (toggle, options, e) => {
    document.startViewTransition(() => {
      toggle()
    })
  }
}
```

## TypeScript

Full TypeScript support is built in, including:

- `ThemeToggleOptions`
- `ThemeToggleReturn`
- `TransitionLoader`

## License

[MIT](./LICENSE)
