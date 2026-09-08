import { z } from 'zod';

export const createCountrySchema = z.object({
  name: z.string().min(1, 'Country name is required'),
  code: z.string().max(10).optional(),
});

export const updateCountrySchema = createCountrySchema.partial();

export const createOrganizationSchema = z.object({
  name: z.string().min(1, 'Organization name is required'),
  shortName: z.string().optional(),
});

export const updateOrganizationSchema = createOrganizationSchema.partial();

export type CreateCountryFormData = z.infer<typeof createCountrySchema>;
export type UpdateCountryFormData = z.infer<typeof updateCountrySchema>;
export type CreateOrganizationFormData = z.infer<typeof createOrganizationSchema>;
export type UpdateOrganizationFormData = z.infer<typeof updateOrganizationSchema>;
