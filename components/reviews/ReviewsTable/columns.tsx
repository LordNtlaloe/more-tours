"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { ColumnDef } from "@tanstack/react-table";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";




export type Review = {
  id: string;
  rating: number;
  icon: string
  options: "update" | "delete";
};


export const columns: ColumnDef<Review>[] = [


  {
    accessorKey: "rating",
    header: "Rating",
  },
  {
    accessorKey: "comment",
    header: "Comment",
  },
  {

    accessorKey: "id",
    header: "Options",
    cell: ({ row }) => {
      const review = row.original

      return (
        <div className="flex gap-2 items-center">
          <Link href={'/dashboard/reviews/delete/?id=' + review.id}>
            <button type="button" className="bg-red-600 text-white px-3  p-1 rounded hover:bg-red-800" >
              Delete
            </button>
          </Link>
        </div>
      )
    }
  },
];