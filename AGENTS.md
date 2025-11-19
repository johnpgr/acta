## Commands

```bash
pnpm ios                 # Run iOS simulator
pnpm android             # Run Android
pnpm lint                # Expo lint
pnpm typecheck           # TypeScript strict check
pnpm format              # Prettier + Tailwind class sort
pnpm expo start          # Dev server (i/a for platform)
```

## Architecture

**Stack**: Expo 55 + React Native 0.82 + React 19
**Navigation**: Expo Router (file-based, typed routes)
**Styling**: NativeWind (Tailwind for RN)
**UI**: reactnativereusables (shadcn/ui for RN) - uses @rn-primitives for accessible base components
**Icons**: SF Symbols (iOS) / Material Icons (Android/web) via `icon-symbol.tsx`

## Structure

```
app/
  _layout.tsx           # Root (Stack, SafeAreaProvider, PortalHost)
  (tabs)/_layout.tsx    # Tab nav
  (tabs)/index.tsx      # Home
  modal.tsx
  global.css

components/
  ui/                   # All UI components (button, dialog, select, etc.)
    icon-symbol.tsx     # SF Symbol → Material mapper
    text.tsx            # h1-h4, p, code variants
    button.tsx          # CVA variants: default/destructive/outline/secondary/ghost/link

lib/utils.ts            # cn() = clsx + tailwind-merge
```

## Conventions

- Path alias `@/*` for imports
- Platform-specific: `Platform.select()` or `.web.ts/.ios.tsx`
- CVA (class-variance-authority) for component variants
- SafeAreaProvider + PortalHost at root (required for modals/popovers)
- Haptic feedback on iOS tabs

## Config Notes

- tsconfig: strict mode, path alias `@/*`
- tailwind.config: HSL theme vars, darkMode class
- New Architecture + React Compiler enabled
- Prettier: no semicolons
