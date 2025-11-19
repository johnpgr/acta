import { defineConfig } from "drizzle-kit"

if (!process.env.TURSO_DB_URL || !process.env.TURSO_DB_AUTH_TOKEN) {
  throw new Error(
    "TURSO_DB_URL and TURSO_DB_AUTH_TOKEN must be set in environment variables",
  )
}

export default defineConfig({
  schema: ["../../packages/shared/src/schema.ts", "./server/utils/schema.ts"],
  out: "./drizzle",
  dialect: "turso",
  dbCredentials: {
    url: process.env.TURSO_DB_URL!,
    authToken: process.env.TURSO_DB_AUTH_TOKEN,
  },
  casing: "snake_case",
})
