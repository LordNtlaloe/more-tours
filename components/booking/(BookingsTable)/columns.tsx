
"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { ColumnDef } from "@tanstack/react-table";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import UpdateBookingtButton from "./BookingsActions/UpdateBookingsButton";



export type Booking = {
  tour: any;
  _id: string;
  name: string;
  icon: string
  options: "update" | "delete";
};


export const columns: ColumnDef<Booking>[] = [

    {
        accessorKey: "fullName",
        header: "Name",
    },
    {
        accessorKey: "tourName",
        header: "Tour Name",
    },
    {
        accessorKey: "dateBooked",
        header: "Date Booked",
    },
    {
        accessorKey: "timeSlotBooked",
        header: "Time Slot",
    },
    {
        accessorKey: "dateOfBooking",
        header: "Date of Booking",
    },
    {
        accessorKey: "timeOfBooking",
        header: "Time of Booking",
    },
    {
        accessorKey: "bookingStatus",
        header: "Booking Status",
    },
    {

    accessorKey: "_id",
    header: "OPTIONS",
    cell: ({ row }) => {
      const booking = row.original

      return (
        <div className="flex gap-2 items-center">
          <UpdateBookingtButton bookingID={booking._id} />
          <Link href={'/dashboard/bookings/delete/?id=' + booking._id}>
            <button type="button" className="bg-red-600 text-white px-3 p-1 rounded-2xl hover:bg-red-800" >
              Delete
            </button>
          </Link>
        </div>
      )
    }
  },
];