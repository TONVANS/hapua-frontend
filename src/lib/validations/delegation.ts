import { z } from 'zod';

export const createDelegationSchema = z.object({
  title: z.string().optional(),
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  email: z.string().email('Please enter a valid email address'),
  phoneNumber: z.string().optional(),
  position: z.string().optional(),
  organizationId: z.string().optional(),
  countryId: z.string().optional(),
});

export const updateDelegationSchema = createDelegationSchema.partial();

export const registerActivitySchema = z.object({
  delegationCode: z.string().min(1, 'Delegation code is required'),
  activityId: z.string().uuid('Invalid activity ID'),
});

export type CreateDelegationFormData = z.infer<typeof createDelegationSchema>;
export type UpdateDelegationFormData = z.infer<typeof updateDelegationSchema>;
export type RegisterActivityFormData = z.infer<typeof registerActivitySchema>;
