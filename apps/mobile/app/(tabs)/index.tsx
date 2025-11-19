import { Button } from "@/components/ui/button"
import { Text } from "@/components/ui/text"
import { Platform } from "react-native"
import { Link } from "expo-router"
import { SafeAreaView } from "react-native-safe-area-context"

export default function HomeScreen() {
  return (
    <SafeAreaView className="bg-background flex-1 flex-col gap-2">
      <Text className="text-3xl">Home Screen - Platform: {Platform.OS}</Text>
      <Link href="/modal">
        <Text>Open a modal</Text>
      </Link>
    </SafeAreaView>
  )
}
