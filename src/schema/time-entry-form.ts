import * as z from "zod";

export const TimeEntryFormSchema = z.object({
  date: z.date(),
  time: z.string(),
  description: z.string(),
  project: z.string(),
  task: z.string().min(1, {
    message: "Please enter a task"
  }),
  hours: z.number(),
  tags: z.array(z.string()).optional(),
  billable: z.boolean().optional(),
});
