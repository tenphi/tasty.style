# Tasty Website & Showcase

Official website and interactive showcase for [`@tenphi/tasty`](https://github.com/tenphi/tasty) — a CSS-in-JS styling engine for React with a declarative, state-aware DSL and design system integration.

This project serves as both the public-facing landing page for Tasty and a production-grade demonstration of its capabilities: SSR with streaming, OKHSL color theming via [`@tenphi/glaze`](https://github.com/tenphi/glaze), responsive state maps, sub-element styling, and more.

## Tech Stack

- **[Next.js 15](https://nextjs.org/)** — App Router, React Server Components
- **[React 19](https://react.dev/)** — concurrent features, streaming SSR
- **[@tenphi/tasty](https://github.com/tenphi/tasty)** — styling engine (runtime + SSR)
- **[@tenphi/glaze](https://github.com/tenphi/glaze)** — OKHSL color theme generator with WCAG contrast solving
- **[Shiki](https://shiki.style/)** — syntax highlighting with a custom Tasty DSL grammar
- **TypeScript**, **ESLint**, **Prettier**

## Features Demonstrated

- **SSR hydration** — `TastyRegistry` from `@tenphi/tasty/ssr/next` collects and inlines dynamic styles during server rendering
- **Custom state aliases** — `@mobile`, `@tablet`, `@desktop`, `@dark`, `@high-contrast`, `@reduce-motion` mapped to media/container/root queries
- **OKHSL color palette** — light, dark, and high-contrast schemes generated with `@tenphi/glaze`, including WCAG AA/AAA contrast solving
- **Theme & contrast switching** — runtime toggle via `data-schema` and `data-contrast` root attributes, with `prefers-color-scheme` / `prefers-contrast` fallback
- **Sub-element styling** — nested element selectors via `$` key (e.g., `Logo`, `LogoImg`)
- **Responsive state maps** — per-breakpoint value overrides in style objects
- **Variants & recipes** — component variants with `variants` key, global recipes via config
- **UI primitives library** — reusable `Button`, `Card`, `Badge`, `Tabs`, `Grid`, `Text`, and more in `app/ui/`
- **Custom Shiki grammar** — Tasty DSL syntax highlighting in code examples

## Getting Started

**Prerequisites:** Node.js >= 20, pnpm 10

```bash
git clone https://github.com/tenphi/tasty-nextjs-example.git
cd tasty-nextjs-example
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Scripts

| Command             | Description              |
| ------------------- | ------------------------ |
| `pnpm dev`          | Start Next.js dev server |
| `pnpm build`        | Production build         |
| `pnpm start`        | Start production server  |
| `pnpm lint`         | Run ESLint               |
| `pnpm lint:fix`     | Run ESLint with auto-fix |
| `pnpm format`       | Format with Prettier     |
| `pnpm format:check` | Check formatting         |
| `pnpm hygiene`      | Lint + format check      |
| `pnpm hygiene:fix`  | Auto-fix lint + format   |

## Project Structure

```
app/
  layout.tsx              # Root layout — imports SSR registry and global styles
  page.tsx                # Home page — composes all sections
  theme.ts                # Glaze color palette definition
  states.ts               # Shared custom state aliases (used by both configs)
  tasty-config.ts         # Runtime Tasty config (imports shared states)
  tasty-registry.tsx      # SSR style registry (TastyRegistry wrapper)
  components/             # Page sections
    Header.tsx            # Sticky header with nav, theme/contrast switchers
    Hero.tsx              # Hero with gradient title and CTAs
    Features.tsx          # Feature cards grid
    HowItWorks.tsx        # Interactive state mapping examples
    TokenShowcase.tsx     # Design token and color palette demos
    CodeShowcase.tsx      # Tabbed code examples
    Ecosystem.tsx         # Related tools (Glaze, ESLint plugin, VS Code ext)
    CallToAction.tsx      # Install command and CTA buttons
    Footer.tsx            # Links and copyright
    ThemeSwitcher.tsx     # Light/dark toggle
    ContrastSwitcher.tsx  # Normal/high-contrast toggle
  ui/                     # Reusable UI primitives
    Button.tsx, Card.tsx, Badge.tsx, Tabs.tsx, Grid.tsx,
    Text.tsx, Link.tsx, Space.tsx, CodeBlock.tsx, Switcher.tsx, ...
  lib/
    shiki.ts              # Shiki highlighter setup
    shiki-theme.ts        # Custom theme using Tasty color tokens
    tasty.tmLanguage.json # TextMate grammar for Tasty DSL
public/
  tasty.svg               # Logo
next.config.ts            # Next.js config
```

## How Tasty is Integrated

The project uses a two-layer integration:

1. **SSR** — `TastyStyleRegistry` wraps the app in `layout.tsx`. It uses `TastyRegistry` from `@tenphi/tasty/ssr/next` to collect styles generated during server rendering and inline them into the HTML response, ensuring no flash of unstyled content.

2. **Runtime** — `tasty-config.ts` calls `configure()` to register custom state aliases that map to media queries, root attribute selectors, and combined conditions. Components use `tasty()` to create styled elements with state-aware style objects.

```
SSR:     TastyRegistry ──► <style> tags inlined in HTML (dynamic, per-request)
Runtime: configure()   ──► custom states, tokens, plugins (client-side)
```

## License

MIT
