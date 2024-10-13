'use client'

import { ColumnDef } from "@tanstack/react-table";
import ActionsField from "./ActionsFields";

export type Tour = {
    id: string
    title: string
    description: string
    price: string
    category: string
    destination: string
};

export const tourTableColumns: ColumnDef<Tour>[] = [
    {
        accessorKey: "title",
        header: "Tour Name"
    },
    {
        accessorKey: "category",
        header: "Category"
    },
    {
        accessorKey: "description",
        header: "Tour Description"
    },
    {
        accessorKey: "price",
        header: "Tour Price"
    },
    {
        accessorKey: "destination",
        header: "District/Location"
    },
    {
        accessorKey: "status",
        header: "Status",
        cell: ({ row }) => {
            const status = row.getValue("status") as string
            return (
                <div className={status === 'pending' ? `bg-yellow-500 p-1` : status === 'active' ? "p-1 bg-green-700 text-white" : status === 'banned' ? "bg-red-700 text-white p-1" : "bg-white"}>
                    <p>{status}</p>
                </div>
            )
        }
    },

    {
        header: "ACTIONS",
        cell: ({ row }) => {
            const tour = row.original
            return <ActionsField id={tour.id} />
        }
    }
]