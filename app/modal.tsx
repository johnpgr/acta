import { Text } from "@/components/ui/text"
import { Link } from "expo-router"
import { View } from "react-native"

export default function ModalScreen() {
  return (
    <View className="flex-1 items-center justify-center bg-white dark:bg-black">
      <Link href="/" dismissTo>
        <Text>Go to home screen</Text>
      </Link>
    </View>
  )
}
