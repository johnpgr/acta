import { defineConfig } from "drizzle-kit"

export default defineConfig({
  schema: "../../packages/shared/src/schema.ts",
  out: "./drizzle",
  dialect: "turso",
  dbCredentials: {
    url: process.env.TURSO_URL!,
    authToken: process.env.TURSO_TOKEN,
  },
  casing: "snake_case",
})
