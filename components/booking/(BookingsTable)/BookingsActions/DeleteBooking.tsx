import { deleteOneBooking } from '@/app/_actions/_tourBookingActions'
import { showToastMessage } from '@/lib/generalFunctions'
import { useBookingsStore } from '@/lib/Stores/bookingsStore'
import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'

const DeleteBookings = () => {
    const router = useRouter()
    const { showBookingsDeleteModal, setShowBookingsDeleteModal, bookingsId, setBookingsID } = useBookingsStore()
    const seachParams = useSearchParams()
    const id = seachParams.get('id') as string
    const dateString = seachParams.get('date') as string

    const [bookingsDate, setBookingsDate] = useState<Date | null>(null)

    useEffect(() => {
        if (dateString) {
            const dateObject = new Date(dateString)
            setBookingsDate(dateObject)
        }
        setBookingsID(id)
        setShowBookingsDeleteModal(true)
    }, [])

    const deleteBookings = async () => {
        const deleted = await deleteOneBooking(bookingsId)
        if (deleted) {
            showToastMessage("info", "Booking was deleted from the system!")
            setBookingsID("")
            setShowBookingsDeleteModal(false)
            router.push('/dashboard/bookings')
        }
    }

    const handleCancel = () => {
        setBookingsID("")
        setShowBookingsDeleteModal(false)
        router.push('/dashboard/bookings')
    }

    return (
        <form onSubmit={deleteBookings} className='border rounded p-4'>
            {bookingsDate && (
                <h1 className='text-center'>You are about to delete bookings: <span className='font-bold text-lg text-red-600'>{bookingsDate.toDateString()}</span></h1>
            )}
            <p className='bg-red-600 text-white p-3 text-center mt-4'>Please note that this action will affect all toures with this booking!</p>

            <h1 className='my-6 text-red-600'>Are you sure? Press delete button to confirm!</h1>

            <div className="flex items-center justify-end gap-4 py-3 border-t">
                <button type='button' className="bg-blue-600 px-6 text-white py-1" onClick={handleCancel}>Cancel</button>
                <button type='submit' className="bg-red-600 text-white px-6 rounded py-1">Delete</button>
            </div>
        </form>
    )
}

export default DeleteBookings