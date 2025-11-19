-- Auto-update updatedAt triggers for synced tables
CREATE TRIGGER update_routines_timestamp
AFTER UPDATE ON routines
BEGIN
  UPDATE routines SET updatedAt = unixepoch() WHERE id = NEW.id;
END;
--> statement-breakpoint
CREATE TRIGGER update_sets_timestamp
AFTER UPDATE ON sets
BEGIN
  UPDATE sets SET updatedAt = unixepoch() WHERE id = NEW.id;
END;
--> statement-breakpoint
CREATE TRIGGER update_workout_logs_timestamp
AFTER UPDATE ON workout_logs
BEGIN
  UPDATE workout_logs SET updatedAt = unixepoch() WHERE id = NEW.id;
END;
