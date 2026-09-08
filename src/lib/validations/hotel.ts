import { z } from 'zod';

export const createHotelSchema = z.object({
  name: z.string().min(1, 'Hotel name is required'),
  address: z.string().min(1, 'Address is required'),
  description: z.string().optional(),
  starRating: z.number().min(1).max(5).optional(),
  contactInfo: z.string().optional(),
  websiteUrl: z.string().url('Must be a valid URL').optional().or(z.literal('')),
  mapUrl: z.string().url('Must be a valid URL').optional().or(z.literal('')),
  distanceToVenue: z.number().min(0).optional(),
  bookingUrl: z.string().url('Must be a valid URL').optional().or(z.literal('')),
  coverImage: z.any().optional(),
  images: z.any().optional(),
});

export const updateHotelSchema = createHotelSchema.partial();

export type CreateHotelFormData = z.infer<typeof createHotelSchema>;
export type UpdateHotelFormData = z.infer<typeof updateHotelSchema>;

