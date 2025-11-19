import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core"
import { sql } from "drizzle-orm"
import { uuidv7 } from "@acta/shared"

// Cloud-only table (not synced to mobile devices)
export const users = sqliteTable("users", {
  id: text()
    .primaryKey()
    .$defaultFn(() => uuidv7()),
  deviceId: text().notNull().unique(), // Links to local device
  email: text(),
  updatedAt: integer({ mode: "timestamp" })
    .notNull()
    .default(sql`(unixepoch())`),
})

// Type definitions
export type User = typeof users.$inferSelect
export type NewUser = typeof users.$inferInsert
