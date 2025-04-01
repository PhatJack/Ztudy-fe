import { z } from "zod";

export const leaderboardSchema = z.object({
	id: z.number(),
	username: z.string(),
	avatar: z.string().nullable(),
	rank: z.number(),
	total_time: z.coerce.number(),
})

export type LeaderboardSchema = z.infer<typeof leaderboardSchema>