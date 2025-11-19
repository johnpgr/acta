import { Link } from "expo-router"
import { Text, View } from "react-native"

export default function ModalScreen() {
  return (
    <View className="flex-1 items-center justify-center bg-white dark:bg-black">
      <Text>This is a modal</Text>
      <Link href="/" dismissTo className="mt-4 rounded bg-blue-500 px-4 py-2">
        <Text>Go to home screen</Text>
      </Link>
    </View>
  )
}
