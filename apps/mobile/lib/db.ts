import { drizzle } from "drizzle-orm/expo-sqlite"
import { openDatabaseSync } from "expo-sqlite"
import * as schema from "@acta/shared"

const TURSO_SYNC_URL = process.env.EXPO_PUBLIC_TURSO_SYNC_URL
const TURSO_TOKEN = process.env.EXPO_PUBLIC_TURSO_TOKEN

const expoDb = openDatabaseSync("acta.db", {
  enableChangeListener: true,
})

export const db = drizzle(expoDb, { schema, casing: "snake_case" })

// Sync with Turso (call periodically or after writes)
export const syncDatabase = async () => {
  try {
    // @ts-expect-error - API may not be typed yet in canary
    await expoDb.syncWithTurso({
      syncUrl: TURSO_SYNC_URL,
      authToken: TURSO_TOKEN,
    })
    console.log("Sync successful")
  } catch (e) {
    console.error("Sync failed", e)
  }
}
