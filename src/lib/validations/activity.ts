import { z } from 'zod';

export const createActivitySchema = z.object({
  name: z.string().min(1, 'Activity name is required'),
  description: z.string().optional(),
  date: z.string().min(1, 'Date is required'),
  startTime: z.string().min(1, 'Start time is required'),
  endTime: z.string().min(1, 'End time is required'),
  status: z.enum(['UPCOMING', 'ONGOING', 'COMPLETED', 'CANCELED']).optional(),
  registrationDeadline: z.string().optional(),
  roomId: z.string().optional(),
});

export const updateActivitySchema = createActivitySchema.partial();

export type CreateActivityFormData = z.infer<typeof createActivitySchema>;
export type UpdateActivityFormData = z.infer<typeof updateActivitySchema>;
