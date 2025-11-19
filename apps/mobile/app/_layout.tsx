import { PortalHost } from "@rn-primitives/portal"
import { Stack } from "expo-router"
import { StatusBar } from "expo-status-bar"
import "react-native-reanimated"
import "../global.css"

import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context"

export const unstable_settings = {
  anchor: "(tabs)",
}

export default function RootLayout() {
  return (
    <SafeAreaProvider>
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
    </SafeAreaProvider>
  )
}
