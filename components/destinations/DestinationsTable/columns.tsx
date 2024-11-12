"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { ColumnDef } from "@tanstack/react-table";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";




export type Destination = {
  id: string;
  name: string;
  description: string;
  image: string
  options: "update" | "delete";
};


export const columns: ColumnDef<Destination>[] = [


  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "description",
    header: "Description",
  },
  
  {

    accessorKey: "id",
    header: "OPTIONS",
    cell: ({ row }) => {
      const destination = row.original

      return (
        <div className="flex gap-2 items-center">
          <Link href={'/dashboard/destinations/update/1/?id=' + destination.id + '&name=' + destination.name}>
            <button className="bg-blue-600 text-white px-3 p-1 rounded hover:bg-blue-800">
              Update
            </button>
          </Link>
          <Link href={'/dashboard/destinations/delete/?id=' + destination.id + '&name=' + destination.name}>
            <button type="button" className="bg-red-600 text-white px-3  p-1 rounded hover:bg-red-800" >
              Delete
            </button>
          </Link>
        </div>
      )
    }
  },
];