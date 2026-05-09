import type { maintenanceLogSchema } from '@/modules/maintenance-logs/schemas';

import { z } from 'zod';

import {
  createMaintenanceLogFormSchema,
  maintenanceLogsSearchSchema,
} from '@/modules/maintenance-logs/schemas';

export type MaintenanceLog = z.infer<typeof maintenanceLogSchema>;

export type CreateMaintenanceLogFormData = z.infer<
  typeof createMaintenanceLogFormSchema
>;

export type MaintenanceLogsSearchParams = z.infer<
  typeof maintenanceLogsSearchSchema
>;
