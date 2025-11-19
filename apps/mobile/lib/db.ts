import { drizzle } from "drizzle-orm/expo-sqlite"
import { openDatabaseSync } from "expo-sqlite"
import * as schema from "@acta/shared"
import { uuidv7 } from "@acta/shared"
import AsyncStorage from "@react-native-async-storage/async-storage"

if (
  !process.env.EXPO_PUBLIC_TURSO_DB_URL ||
  !process.env.EXPO_PUBLIC_TURSO_DB_AUTH_TOKEN
) {
  throw new Error("Turso DB URL and Auth Token must be set in .env")
}

const TURSO_DB_URL = process.env.EXPO_PUBLIC_TURSO_DB_URL
const TURSO_AUTH_TOKEN = process.env.EXPO_PUBLIC_TURSO_DB_AUTH_TOKEN
const DEVICE_ID_KEY = "acta_device_id"

export const expoDb = openDatabaseSync("acta.db", {
  enableChangeListener: true,
  libSQLOptions: {
    url: TURSO_DB_URL,
    authToken: TURSO_AUTH_TOKEN,
  },
})

export const db = drizzle(expoDb, { schema, casing: "snake_case" })

// Generate or retrieve device ID (acts as userId before auth)
export const getDeviceId = async (): Promise<string> => {
  let deviceId = await AsyncStorage.getItem(DEVICE_ID_KEY)
  if (!deviceId) {
    deviceId = uuidv7()
    await AsyncStorage.setItem(DEVICE_ID_KEY, deviceId)
  }
  return deviceId
}

// Sync with Turso
export const syncDatabase = async () => {
  try {
    await expoDb.syncLibSQL()
    console.log("Sync successful")
  } catch (e) {
    console.error("Sync failed", e)
  }
}
