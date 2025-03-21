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
    billable: boolean
    startTime: string
    endTime: string
    taskDate: string
};

export const columns: ColumnDef<Task>[] = [
  {
    accessorKey: "description",
  },
  {
    accessorKey: "projectid",
  },
  {
    accessorKey: "workgroupid",
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
