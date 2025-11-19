## Commands

```bash
# Root commands
pnpm dev                 # Run all apps in dev mode
pnpm typecheck           # TypeScript check all apps
pnpm format              # Prettier format all

# Mobile (Expo)
pnpm mobile ios          # Run iOS simulator
pnpm mobile android      # Run Android
pnpm mobile expo start   # Dev server (i/a for platform)
pnpm mobile lint         # Expo lint
pnpm mobile typecheck    # TypeScript check

# API (Nitro)
pnpm api dev             # Run API dev server
pnpm api build           # Build for production
pnpm api preview         # Preview production build
pnpm api typecheck       # TypeScript check
```

## Architecture

**Monorepo**: pnpm workspaces (`apps/*`)

### apps/mobile (Expo)
- **Stack**: Expo 55 + React Native 0.82 + React 19
- **Navigation**: Expo Router (file-based, typed routes)
- **Styling**: NativeWind (Tailwind for RN)
- **UI**: reactnativereusables (shadcn/ui for RN) - uses @rn-primitives
- **Icons**: SF Symbols (iOS) / Material Icons (Android/web) via `icon-symbol.tsx`

### apps/api (Nitro)
- **Framework**: Nitro (nitro.build)
- **Routes**: `routes/` directory (file-based routing)

## Structure

```
apps/
  mobile/
    app/                  # Expo Router pages
      _layout.tsx         # Root (Stack, SafeAreaProvider, PortalHost)
      (tabs)/_layout.tsx  # Tab nav
      (tabs)/index.tsx    # Home
      modal.tsx
      global.css
    components/
      ui/                 # UI components (button, dialog, select, etc.)
        icon-symbol.tsx   # SF Symbol → Material mapper
        text.tsx          # h1-h4, p, code variants
        button.tsx        # CVA variants
    lib/utils.ts          # cn() = clsx + tailwind-merge

  api/
    routes/               # Nitro API routes
      index.ts            # GET /
    nitro.config.ts
```

## Conventions

- Path alias `@/*` for imports (mobile)
- Platform-specific: `Platform.select()` or `.web.ts/.ios.tsx`
- CVA (class-variance-authority) for component variants
- SafeAreaProvider + PortalHost at root (required for modals/popovers)
- Haptic feedback on iOS tabs
- Prettier: no semicolons

## Config Notes

- tsconfig: strict mode everywhere
- tailwind.config: HSL theme vars, darkMode class
- New Architecture + React Compiler enabled (mobile)
