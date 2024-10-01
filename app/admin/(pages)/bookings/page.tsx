"use client"
import React from 'react'
import AdminLayout from '../../layout/AdminLayout'
import { DataTable } from '../../components/DataTable'
import { useQuery } from '@tanstack/react-query'
import { getAllBookings } from '../bookings/service'
import { ClipLoader } from 'react-spinners'
import { columns } from './table/Columns'

const Bookings = () => {
  const { data: allBookings, isLoading } = useQuery({
    queryFn: getAllBookings,
    queryKey: ["admin", "bookings"]
  })

  if (isLoading) return <ClipLoader />

  return (
    <AdminLayout>
      <div className="ml-12 h-screen w-full">
        <h2 className="text-3xl text-slate-800 font-bold whitespace-nowrap">
          All Listings
        </h2>
        <div className="mt-2 h-2/3 w-[50vw]">
          <DataTable
            columns={columns}
            data={allBookings ?? []} 
          />
        </div>
      </div>
    </AdminLayout>
  )
}

export default Bookings
