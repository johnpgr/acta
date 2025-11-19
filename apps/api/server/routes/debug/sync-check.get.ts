import { db } from "../../utils/db"
import { routines } from "@acta/shared"
import { desc } from "drizzle-orm"
import { defineEventHandler } from "h3"

export default defineEventHandler(async () => {
  const latestRoutines = await db
    .select()
    .from(routines)
    .orderBy(desc(routines.id))
    .limit(5)

  return {
    status: "ok",
    source: "aws-lambda-nitro",
    data: latestRoutines,
  }
})
