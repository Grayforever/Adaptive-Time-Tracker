"use client"

import { ColumnDef } from "@tanstack/react-table"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type ClockedHours = {
//   id: string
//   task: string
//   project: string
//   billable: boolean
//   startTime: string
//   endTime: string
//   timeSpent: string
  id: string
  name: string
  emaiL: string
  image: string
  lastSeen: string
}

export const columns: ColumnDef<ClockedHours>[] = [
  {
    accessorKey: "task"
  },
  {
    accessorKey: "project"
  },
  {
    accessorKey: "billable"
  },
  {
    accessorKey: "startTime"
  },
  {
    accessorKey: "endTime"
  },
  {
    accessorKey: "timeSpent"
  },
]
