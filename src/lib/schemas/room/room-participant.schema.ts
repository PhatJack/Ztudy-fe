import { z } from "zod";

const RoomParticipantSchema = z.object({
	id: z.number	(),
	joined_at: z.string().datetime(),
	is_admin: z.boolean(),
	is_out: z.boolean(),
	is_approved: z.boolean(),
	room: z.number(),
	user: z.number(),
});

export type RoomParticipantSchema = z.infer<typeof RoomParticipantSchema>;