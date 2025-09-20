"use client"

import { ColumnDef } from "@tanstack/react-table"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Payment = {
  id: string
  amount: number
  status: "pending" | "processing" | "success" | "failed"
  email: string
}

export const columns = [
  {
    id: "1",
    accessorKey: "status",
    header: "Status",
  },
  {
    id: "2",
    accessorKey: "email",
    header: "Email",
  },
  {
    id: "3",
    accessorKey: "amount",
    header: "Amount",
  },
]