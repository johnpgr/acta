## Commands

```bash
# Root
pnpm dev                 # Run all apps in dev mode
pnpm typecheck           # TypeScript check all
pnpm format              # Prettier format all

# Mobile (Expo)
pnpm mobile ios          # Run iOS simulator
pnpm mobile android      # Run Android
pnpm mobile expo start   # Dev server (i/a for platform)
pnpm mobile lint         # Expo lint

# API (Nitro)
pnpm api dev             # Run API dev server
pnpm api build           # Build for Lambda

# Shared
pnpm --filter @acta/shared build  # Build schema types
pnpm --filter @acta/shared dev    # Watch mode

# SST Deployment
npx sst dev              # Local dev with cloud resources
npx sst deploy           # Deploy to AWS
npx sst secret set TursoUrl <url>
npx sst secret set TursoToken <token>
```

## Architecture

**Monorepo**: pnpm workspaces (`apps/*`, `packages/*`)
**Database**: Turso (libsql) + Drizzle ORM
**Sync**: expo-sqlite local DB syncs to Turso cloud
**Deploy**: SST to AWS Lambda

### packages/shared

- Drizzle schema (source of truth)
- Type exports for both apps
- Zod validators

### apps/mobile (Expo)

- **Stack**: Expo 55 + React Native 0.82 + React 19
- **Navigation**: Expo Router (file-based, typed routes)
- **Styling**: NativeWind (Tailwind for RN)
- **UI**: reactnativereusables (shadcn/ui for RN)
- **DB**: expo-sqlite with Turso sync
- **Icons**: SF Symbols (iOS) / Material Icons (Android/web)

### apps/api (Nitro)

- **Framework**: Nitro (nitro.build)
- **Preset**: aws-lambda
- **DB**: @libsql/client → Turso

## Structure

```
packages/
  shared/
    src/
      schema.ts           # Drizzle tables (routines, exercises)
      index.ts            # Exports

apps/
  mobile/
    app/                  # Expo Router pages
      _layout.tsx         # Root (Stack, SafeAreaProvider, PortalHost)
      (tabs)/_layout.tsx  # Tab nav
      (tabs)/index.tsx    # Home
      global.css
    components/ui/        # reactnativereusables components
    lib/
      db.ts               # Drizzle + expo-sqlite + Turso sync
      utils.ts            # cn() = clsx + tailwind-merge

  api/
    server/
      routes/             # Nitro API routes
        index.ts          # GET /
      utils/
        db.ts             # Drizzle + @libsql/client
    nitro.config.ts

sst.config.ts             # SST deployment config
```

## Database

Schema defined once in `packages/shared/src/schema.ts`:

- Use UUIDs for primary keys (sync safety)
- `userId` on all tables (multi-tenant)
- `createdAt`/`updatedAt` timestamps

Mobile sync pattern:

```typescript
import { db, syncDatabase } from "@/lib/db"
// Write locally, then sync
await db.insert(routines).values({...})
await syncDatabase()
```

## Conventions

- Path alias `@/*` for imports (mobile)
- `@acta/shared` workspace dependency in both apps
- Platform-specific: `Platform.select()` or `.web.ts/.ios.tsx`
- CVA for component variants
- SafeAreaProvider + PortalHost at root
- Prettier: no semicolons

## Environment Variables

Mobile (`.env`):

- `EXPO_PUBLIC_TURSO_SYNC_URL`
- `EXPO_PUBLIC_TURSO_TOKEN`

API (SST secrets):

- `TursoUrl`
- `TursoToken`
