import { z } from "zod";

export const StudyGroupType = z.enum(["PUBLIC", "PRIVATE"]);

export const studyGroupSchema = z.object({
  id: z.string(),
  name: z.string(),
  code_invite: z.string(),
  created_at: z.string(),
  updated_at: z.string(),
  is_active: z.boolean(),
  creator_user: z.string(),
  category: z.string(),
  max_participants: z.string(),
  type: StudyGroupType,
	thumbnail: z.string().nullable(),
});

export type StudyGroupSchema = z.infer<typeof studyGroupSchema>;