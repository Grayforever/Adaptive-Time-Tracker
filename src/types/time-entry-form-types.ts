import { z } from "zod"

export const ProjectSchema = z.object({
  id: z.string(),
  name: z.string(),
})

export const TimeEntryFormSchema = z.object({
  task: z.string().min(1, {
    message: "Please enter a task description"
  }),
  project: ProjectSchema,
  billable: z.boolean().default(false),
  startTime: z.date().nullable(),
  endTime: z.date().nullable(),
  createdAt: z.date().default(() => new Date()),
  date: z.date().default(() => new Date()),
  duration: z.number().min(0).optional(),
  status: z.enum(['running', 'stopped', 'paused']).default('stopped'),
})

export type TimeEntry = z.infer<typeof TimeEntryFormSchema>
