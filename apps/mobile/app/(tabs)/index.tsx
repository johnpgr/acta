import { Text } from "@/components/ui/text"
import { Link } from "expo-router"
import { Platform, View } from "react-native"

export default function HomeScreen() {
  return (
    <View className="bg-background flex-1 flex-col gap-4">
      <Text className="text-3xl">Home Screen - Platform: {Platform.OS}</Text>
      <Link href="/modal">
        <Text>Open a modal</Text>
      </Link>
    </View>
  )
}
