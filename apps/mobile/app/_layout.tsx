import { PortalHost } from "@rn-primitives/portal"
import { useMigrations } from "drizzle-orm/expo-sqlite/migrator"
import { Stack } from "expo-router"
import { StatusBar } from "expo-status-bar"
import { useEffect } from "react"
import { Text, View } from "react-native"
import "react-native-reanimated"
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context"
import "../global.css"

import { db, expoDb, syncDatabase } from "@/lib/db"
import migrations from "../drizzle/migrations"
import { SyncProvider } from "@/context/SyncContext"

export const unstable_settings = {
  anchor: "(tabs)",
}

export default function RootLayout() {
  const { success, error } = useMigrations(db, migrations)

  useEffect(() => {
    if (success) {
      // Initial sync after migrations complete
      syncDatabase()
    }
  }, [success])

  if (error) {
    return (
      <SafeAreaProvider>
        <SafeAreaView
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <Text style={{ color: "red" }}>Migration error: {error.message}</Text>
        </SafeAreaView>
      </SafeAreaProvider>
    )
  }

  if (!success) {
    return (
      <SafeAreaProvider>
        <SafeAreaView
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <Text>Loading database...</Text>
        </SafeAreaView>
      </SafeAreaProvider>
    )
  }

  return (
    <SafeAreaProvider>
      <SyncProvider>
        <SafeAreaView edges={["top", "left", "right"]} style={{ flex: 1 }}>
          <Stack>
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen
              name="modal"
              options={{ presentation: "modal", title: "Modal" }}
            />
          </Stack>
          <StatusBar style="auto" />
          <PortalHost />
        </SafeAreaView>
      </SyncProvider>
    </SafeAreaProvider>
  )
}
