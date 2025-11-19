import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core"
import { relations, sql } from "drizzle-orm"
import { uuidv7 } from "uuidv7"

export const routines = sqliteTable("routines", {
  id: text()
    .primaryKey()
    .$defaultFn(() => uuidv7()),
  name: text().notNull(),
  userId: text().notNull(),
  updatedAt: integer({ mode: "timestamp" })
    .notNull()
    .default(sql`(unixepoch())`),
})

export const exercises = sqliteTable("exercises", {
  id: text()
    .primaryKey()
    .$defaultFn(() => uuidv7()),
  routineId: text().references(() => routines.id),
  name: text().notNull(),
  updatedAt: integer({ mode: "timestamp" })
    .notNull()
    .default(sql`(unixepoch())`),
})

// Relations
export const routinesRelations = relations(routines, ({ many }) => ({
  exercises: many(exercises),
}))

export const exercisesRelations = relations(exercises, ({ one }) => ({
  routine: one(routines, {
    fields: [exercises.routineId],
    references: [routines.id],
  }),
}))

// Type definitions
export type Routine = typeof routines.$inferSelect
export type NewRoutine = typeof routines.$inferInsert
export type Exercise = typeof exercises.$inferSelect
export type NewExercise = typeof exercises.$inferInsert
