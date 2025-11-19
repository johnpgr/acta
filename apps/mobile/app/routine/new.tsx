import { useState, useEffect } from "react"
import { View } from "react-native"
import { useRouter } from "expo-router"
import { Text } from "@/components/ui/text"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { db, getDeviceId } from "@/lib/db"
import { routines } from "@acta/shared"
import { useSyncStatus } from "@/context/SyncContext"

export default function NewRoutine() {
  const [name, setName] = useState("")
  const [deviceId, setDeviceId] = useState<string | null>(null)
  const router = useRouter()
  const { sync } = useSyncStatus()

  useEffect(() => {
    getDeviceId().then(setDeviceId)
  }, [])

  const handleCreate = async () => {
    if (!name || !deviceId) return

    await db.insert(routines).values({
      name,
      userId: deviceId,
    })

    // Sync after write
    sync()

    router.back()
  }

  return (
    <View className="bg-background flex-1 p-4 pt-20">
      <Text className="mb-4 text-2xl font-bold">New Routine</Text>

      <Input
        placeholder="e.g., Push Day A"
        value={name}
        onChangeText={setName}
        autoFocus
        className="mb-4"
      />

      <Button onPress={handleCreate} disabled={!name}>
        <Text>Create Routine</Text>
      </Button>
    </View>
  )
}
