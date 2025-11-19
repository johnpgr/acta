import { createClient } from "@libsql/client"
import { drizzle } from "drizzle-orm/libsql"
import * as sharedSchema from "@acta/shared"
import * as apiSchema from "./schema"

const client = createClient({
  url: process.env.TURSO_URL!,
  authToken: process.env.TURSO_TOKEN,
})

export const db = drizzle(client, {
  schema: { ...sharedSchema, ...apiSchema },
  casing: "snake_case",
})
