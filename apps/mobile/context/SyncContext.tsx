import { createContext, useCallback, useContext, useState } from "react"
import { syncDatabase } from "@/lib/db"

interface SyncContextType {
  isSyncing: boolean
  lastSynced: Date | null
  sync: () => Promise<void>
}

const SyncContext = createContext<SyncContextType | null>(null)

export function SyncProvider({ children }: { children: React.ReactNode }) {
  const [isSyncing, setIsSyncing] = useState(false)
  const [lastSynced, setLastSynced] = useState<Date | null>(null)

  const sync = useCallback(async () => {
    if (isSyncing) return

    setIsSyncing(true)
    try {
      await syncDatabase()
      setLastSynced(new Date())
    } finally {
      setIsSyncing(false)
    }
  }, [isSyncing])

  return (
    <SyncContext.Provider value={{ isSyncing, lastSynced, sync }}>
      {children}
    </SyncContext.Provider>
  )
}

export function useSyncStatus() {
  const context = useContext(SyncContext)
  if (!context) {
    throw new Error("useSyncStatus must be used within a SyncProvider")
  }
  return context
}
