import { z } from 'zod';

export const createGallerySchema = z.object({
  title: z.string().optional(),
  mediaUrl: z.any().optional(),
  file: z.any().optional(),
  mediaType: z.enum(['IMAGE', 'VIDEO']),
  visibility: z.enum(['PUBLIC', 'PRIVATE']),
  description: z.string().optional(),
  activityId: z.string().min(1, 'Please select an activity'),
});


export const updateGallerySchema = createGallerySchema.partial();

export type CreateGalleryFormData = z.infer<typeof createGallerySchema>;
export type UpdateGalleryFormData = z.infer<typeof updateGallerySchema>;
