import { z } from "zod"

export const TaskEntryFormSchema = z.object({
  description: z.string().min(1, "Task is required"),
  projectid: z.preprocess((val) => Number(val), z.number({ required_error: "Project is required" })),
  workgroupid: z.number().optional(),
  billable: z.boolean().default(false),
  startTimeDate: z.date(),
  endTimeDate: z.date(),
  taskDate: z.date().default(() => new Date()),
  createdBy: z.number()
})

export type TaskEntry = z.infer<typeof TaskEntryFormSchema>
