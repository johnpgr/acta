import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core"
import { relations, sql } from "drizzle-orm"
import { uuidv7 } from "uuidv7"

// Synced tables (replicated to mobile devices)
export const routines = sqliteTable("routines", {
  id: text()
    .primaryKey()
    .$defaultFn(() => uuidv7()),
  name: text().notNull(),
  userId: text().notNull(), // Device ID locally, links to users.deviceId
  updatedAt: integer({ mode: "timestamp" })
    .notNull()
    .default(sql`(unixepoch())`),
})

export const workoutLogs = sqliteTable("workout_logs", {
  id: text()
    .primaryKey()
    .$defaultFn(() => uuidv7()),
  routineId: text().references(() => routines.id),
  userId: text().notNull(),
  startedAt: integer({ mode: "timestamp" }).notNull(),
  completedAt: integer({ mode: "timestamp" }),
  updatedAt: integer({ mode: "timestamp" })
    .notNull()
    .default(sql`(unixepoch())`),
})

export const sets = sqliteTable("sets", {
  id: text()
    .primaryKey()
    .$defaultFn(() => uuidv7()),
  workoutLogId: text().references(() => workoutLogs.id),
  exerciseName: text().notNull(),
  weight: integer(),
  reps: integer(),
  rpe: integer(),
  updatedAt: integer({ mode: "timestamp" })
    .notNull()
    .default(sql`(unixepoch())`),
})

// Relations
export const routinesRelations = relations(routines, ({ many }) => ({
  workoutLogs: many(workoutLogs),
}))

export const workoutLogsRelations = relations(workoutLogs, ({ one, many }) => ({
  routine: one(routines, {
    fields: [workoutLogs.routineId],
    references: [routines.id],
  }),
  sets: many(sets),
}))

export const setsRelations = relations(sets, ({ one }) => ({
  workoutLog: one(workoutLogs, {
    fields: [sets.workoutLogId],
    references: [workoutLogs.id],
  }),
}))

// Type definitions
export type Routine = typeof routines.$inferSelect
export type NewRoutine = typeof routines.$inferInsert
export type WorkoutLog = typeof workoutLogs.$inferSelect
export type NewWorkoutLog = typeof workoutLogs.$inferInsert
export type Set = typeof sets.$inferSelect
export type NewSet = typeof sets.$inferInsert
