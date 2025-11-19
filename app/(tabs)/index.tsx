import { Platform, Text, View } from "react-native"

export default function HomeScreen() {
  return (
    <View>
      <Text className="text-3xl text-red-500">Home Screen - Platform: {Platform.OS}</Text>
    </View>
  )
}
