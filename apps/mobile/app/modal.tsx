import { Text } from "@/components/ui/text"
import { Link } from "expo-router"
import { View } from "react-native"

export default function ModalScreen() {
  return (
    <View style={{ flex: 1 }}>
      <Link href="/" dismissTo>
        <Text>Go to home screen</Text>
      </Link>
    </View>
  )
}
