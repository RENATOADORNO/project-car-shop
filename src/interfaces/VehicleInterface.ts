import { z } from 'zod';

export const VehicleSchema = z.object({
  model: z.string().min(3),
  year: z.number().min(1900).max(2022),
  color: z.string().min(3),
  status: z.optional(z.boolean()),
  buyValue: z.number().int(),
});

export type Vehicle = z.infer<typeof VehicleSchema>;
