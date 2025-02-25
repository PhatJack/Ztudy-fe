import { z } from "zod";

const ThumbnailSchema = z.object({
  url: z.string().url(),
  width: z.number(),
  height: z.number(),
});

const SnippetSchema = z.object({
  publishedAt: z.string(),
  channelId: z.string(),
  title: z.string(),
  description: z.string(),
  thumbnails: z.object({
    default: ThumbnailSchema,
    medium: ThumbnailSchema,
    high: ThumbnailSchema,
    standard: ThumbnailSchema.optional(),
    maxres: ThumbnailSchema.optional(),
  }),
  channelTitle: z.string(),
  tags: z.array(z.string()).optional(),
  categoryId: z.string(),
  liveBroadcastContent: z.string(),
  localized: z.object({
    title: z.string(),
    description: z.string(),
  }),
});

const VideoItemSchema = z.object({
  kind: z.string(),
  etag: z.string(),
  id: z.string(),
  snippet: SnippetSchema,
});

export const YouTubeResponseSchema = z.object({
  kind: z.string(),
  etag: z.string(),
  items: z.array(VideoItemSchema),
  pageInfo: z.object({
    totalResults: z.number(),
    resultsPerPage: z.number(),
  }),
});

export type YouTubeResponse = z.infer<typeof YouTubeResponseSchema>;
