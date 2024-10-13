
"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { ColumnDef } from "@tanstack/react-table";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import UpdateBookingtButton from "./BookingsActions/UpdateBookingsButton";



export type Booking = {
  tour: any;
  id: string;
  userId: string;
  tourId: string;
  numberOfPeople: number;
  status: string;
  totalPrice:string;
  bookingDate:string;
  options: "update" | "delete";
};


export const columns: ColumnDef<Booking>[] = [

    {
        accessorKey: "id",
        header: "ID",
    },
    {
        accessorKey: "userId",
        header: "User ID",
    },
    {
        accessorKey: "tourId",
        header: "Tour ID",
    },
    {
        accessorKey: "numberOfPeople",
        header: "Number Of People",
    },
    {
        accessorKey: "status",
        header: "Booking Status",
    },
    {
        accessorKey: "totalPrice",
        header: "Total Price",
    },
    {
        accessorKey: "bookingDate",
        header: "Tour Date",
    },
    {

    accessorKey: "id",
    header: "OPTIONS",
    cell: ({ row }) => {
      const booking = row.original

      return (
        <div className="flex gap-2 items-center">
          <UpdateBookingtButton bookingID={booking.id} />
          <Link href={'/dashboard/bookings/delete/?id=' + booking.id}>
            <button type="button" className="bg-red-600 text-white px-3 p-1 rounded-2xl hover:bg-red-800" >
              Delete
            </button>
          </Link>
        </div>
      )
    }
  },
];