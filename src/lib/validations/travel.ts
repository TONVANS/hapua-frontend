import { z } from 'zod';

export const createTravelSchema = z.object({
  placeName: z.string().min(1, 'Place name is required'),
  location: z.string().min(1, 'Location is required'),
  description: z.string().optional(),
  openTime: z.string().optional(),
  closeTime: z.string().optional(),
  openDays: z.array(z.enum([
    'MONDAY',
    'TUESDAY',
    'WEDNESDAY',
    'THURSDAY',
    'FRIDAY',
    'SATURDAY',
    'SUNDAY',
  ])).optional(),
  mapUrl: z.string().url('Must be a valid URL').optional().or(z.literal('')),
  coverImage: z.any().optional(),
  images: z.any().optional(),
});

export const updateTravelSchema = createTravelSchema.partial();

export type CreateTravelFormData = z.infer<typeof createTravelSchema>;
export type UpdateTravelFormData = z.infer<typeof updateTravelSchema>;
