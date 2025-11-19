import journal from "./meta/_journal.json"
import m0000 from "./0000_overrated_prodigy.sql"
import m0001 from "./0001_add_updated_at_triggers.sql"

export default {
  journal,
  migrations: {
    m0000,
    m0001,
  },
}
