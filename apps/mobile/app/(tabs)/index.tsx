import { useEffect, useState } from "react"
import { Text } from "@/components/ui/text"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card"
import { Link } from "expo-router"
import { View, FlatList, Pressable, ActivityIndicator } from "react-native"
import { useLiveQuery } from "drizzle-orm/expo-sqlite"
import { db, getDeviceId } from "@/lib/db"
import { routines } from "@acta/shared"
import { desc } from "drizzle-orm"
import { useSyncStatus } from "@/context/SyncContext"

export default function Dashboard() {
  const [deviceId, setDeviceId] = useState<string | null>(null)
  const { isSyncing, sync } = useSyncStatus()

  useEffect(() => {
    getDeviceId().then(setDeviceId)
  }, [])

  const { data } = useLiveQuery(
    db.select().from(routines).orderBy(desc(routines.createdAt)),
  )

  return (
    <View className="bg-background flex-1 p-4">
      <View className="mb-6 mt-10 flex-row items-center justify-between">
        <Text className="text-3xl font-bold">Acta</Text>
        <Button variant="outline" size="sm" onPress={sync} disabled={isSyncing}>
          {isSyncing ? <ActivityIndicator size="small" /> : <Text>Sync</Text>}
        </Button>
      </View>

      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Link href={`/workout/${item.id}`} asChild>
            <Pressable className="mb-3">
              <Card>
                <CardHeader>
                  <CardTitle>{item.name}</CardTitle>
                  <CardDescription>Last performed: Never</CardDescription>
                </CardHeader>
              </Card>
            </Pressable>
          </Link>
        )}
        ListEmptyComponent={
          <View className="mt-20 items-center">
            <Text className="text-muted-foreground">
              No routines found. Start your journey.
            </Text>
          </View>
        }
      />

      <Link href="/routine/new" asChild>
        <Pressable className="bg-primary absolute bottom-6 right-6 h-14 w-14 items-center justify-center rounded-full shadow-lg">
          <Text className="text-primary-foreground text-2xl">+</Text>
        </Pressable>
      </Link>
    </View>
  )
}
