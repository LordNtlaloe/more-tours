'use client'


import { NotebookPen } from 'lucide-react'
import React, { useState } from 'react'


const BookAppointmentButton = ({ tour }: { tour: any }) => {

  return (
    <main>
      <div>
        <h1 className="bg-blue-600 text-white hover:bg-primary/80 transition-all py-2 px-3 rounded-[5px] flex gap-2 items-center w-auto justify-center"> <NotebookPen />Book Apointment</h1>
      </div>

    </main>
  )
}

export default BookAppointmentButton