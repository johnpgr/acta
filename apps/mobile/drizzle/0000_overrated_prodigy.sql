CREATE TABLE `routines` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`userId` text NOT NULL,
	`updatedAt` integer DEFAULT (unixepoch()) NOT NULL
);
--> statement-breakpoint
CREATE TABLE `sets` (
	`id` text PRIMARY KEY NOT NULL,
	`workoutLogId` text,
	`exerciseName` text NOT NULL,
	`weight` integer,
	`reps` integer,
	`rpe` integer,
	`updatedAt` integer DEFAULT (unixepoch()) NOT NULL,
	FOREIGN KEY (`workoutLogId`) REFERENCES `workout_logs`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `workout_logs` (
	`id` text PRIMARY KEY NOT NULL,
	`routineId` text,
	`userId` text NOT NULL,
	`startedAt` integer NOT NULL,
	`completedAt` integer,
	`updatedAt` integer DEFAULT (unixepoch()) NOT NULL,
	FOREIGN KEY (`routineId`) REFERENCES `routines`(`id`) ON UPDATE no action ON DELETE no action
);
