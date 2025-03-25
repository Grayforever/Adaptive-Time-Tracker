"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Task } from "@/API/TaskApi";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type ClockedHours = {
    id: number
    description: string
    projectid: string
    workgroupid: number
    billable: number
    startTimeDate: string
    endTimeDate: string
    taskDate: string
    projectName: string
    created_at: string
    updated_at: string
};

export const columns: ColumnDef<Task>[] = [
  {
    accessorKey: "description",
  },
  {
    accessorKey: "projectName",
  },
  {
    accessorKey: "billable",
  },
  {
    accessorKey: "startTime",
  },
  {
    accessorKey: "endTime",
  },
  {
    accessorKey: "taskDate",
  },
];
