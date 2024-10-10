'use client'

import { Dialog, DialogTrigger, DialogContent, DialogTitle, DialogDescription } from '@radix-ui/react-dialog'
import { Sheet, SheetTrigger, SheetContent, SheetHeader, SheetTitle, SheetDescription } from '@/components/ui/sheet'
import { Link, NotebookPen } from 'lucide-react'
import React from 'react'

const UpdateBookingtButton = ({ bookingID }: { bookingID: any }) => {
  return (
    <main>
      <Dialog>
        <DialogTrigger>
          <button type="button" className="bg-blue-600 text-white px-3 p-1 rounded-2xl hover:bg-blue-800">
            Update
          </button>
        </DialogTrigger>
        <DialogContent>
          <DialogTitle>Update Booking</DialogTitle>
          <DialogDescription>
            {/* <UpdateBookings _id={bookingID} /> */}
          </DialogDescription>
        </DialogContent>
      </Dialog>

      <Link href={`/dashboard/bookings/delete/?id=${bookingID}`}>
        <button type="button" className="bg-red-600 text-white px-3 p-1 rounded-2xl hover:bg-red-800">
          Delete
        </button>
      </Link>
    </main>
  )
}

export default UpdateBookingtButton