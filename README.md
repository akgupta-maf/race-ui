# race-ui

Internal shared React UI component library for MAF projects. Built with Headless UI, Tailwind CSS v4, and TypeScript.

## Components

| Component              | Description                                                             |
| ---------------------- | ----------------------------------------------------------------------- |
| `AutocompleteDropdown` | Searchable dropdown with autocomplete                                   |
| `CustomButton`         | Button with `solid`, `outline`, and `ghost` variants plus loading state |
| `Checkbox`             | Accessible checkbox input                                               |
| `CountryPopover`       | Country selector with flag support                                      |
| `CustomModal`          | Modal dialog                                                            |
| `Input`                | Text input field                                                        |
| `ProgressBar`          | Progress bar with context provider and hook                             |
| `RadioGroup`           | Radio button group                                                      |
| `RangeSlider`          | Range/slider input                                                      |
| `Tooltip`              | Tooltip overlay                                                         |
| `Typography`           | Text rendering with heading and body variants                           |

## Installation

This package is published to an internal Azure Artifacts feed. Ensure your `.npmrc` is configured to point to the registry.

```bash
npm install @maf/race-ui
```

### Peer Dependencies

```bash
npm install react react-dom @headlessui/react lucide-react clsx
```

| Package             | Version |
| ------------------- | ------- |
| `react`             | `>=18`  |
| `react-dom`         | `>=18`  |
| `@headlessui/react` | `>=2`   |
| `lucide-react`      | `>=0`   |
| `clsx`              | `>=2`   |

## Usage

### Import components

```tsx
import { CustomButton, Input, Typography } from '@maf/race-ui';
```

### Import styles

Import the compiled stylesheet once at the root of your app:

```tsx
import '@maf/race-ui/styles';
```

### Import theme

Import the Tailwind CSS theme to extend your own theme with race-ui design tokens:

```css
@import '@maf/race-ui/theme';
```

Or in your entry file:

```tsx
import '@maf/race-ui/theme';
```

### Theme tokens

The theme exposes CSS custom properties for colors, typography, and font families. Key tokens:

| Token                 | Value                |
| --------------------- | -------------------- |
| `--color-primary-cta` | `rgb(138, 21, 56)`   |
| `--color-primary`     | `rgb(49, 37, 28)`    |
| `--color-secondary`   | `rgb(180, 151, 90)`  |
| `--font-sans`         | `Roboto, sans-serif` |

## Development

```bash
# Install dependencies
npm install

# Build the library (outputs to dist/)
npm run build

# Build in watch mode
npm run dev

# Type check
npm run typecheck

# Start Storybook (component explorer on port 6006)
npm run storybook

# Build Storybook
npm run build-storybook
```

## Publishing

The `prepublishOnly` hook runs `npm run build` automatically. To publish:

```bash
npm publish
```

Ensure your npm auth token for the Azure Artifacts registry is set before publishing.

## Tech Stack

- **React 18** — UI framework
- **TypeScript 5** — Type safety
- **Tailwind CSS v4** — Utility-first styling
- **Headless UI v2** — Accessible, unstyled UI primitives
- **Lucide React** — Icon set
- **Vite** — Build tooling with library mode
- **Storybook 10** — Component documentation and development
