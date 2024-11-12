"use client"

import { deleteOneDestination } from '@/app/_actions/_destinationActions'
import { showToastMessage } from '@/lib/generalFunctions'
import { useDestinationStore } from '@/lib/Stores/destinationStore'
import { revalidatePath } from 'next/cache'
import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect } from 'react'

export default function DeleteDestination() {
    const router = useRouter()
    const { showDestinationDeleteModal, setShowDestinationDeleteModal, destinationId, destinationName, setDestinationID, setDestinationName } = useDestinationStore()
    const seachParams = useSearchParams()
    const id = seachParams.get('id') as string
    const name = seachParams.get('name') as string

    useEffect(() => {
        setDestinationID(id)
        setDestinationName(name)
        setShowDestinationDeleteModal(true)
    }, [])
    const deleteDestination = async () => {
        const deleted = await deleteOneDestination(destinationId)
        if (deleted) {
            showToastMessage("info", "Destination was deleted from the system!")
            setDestinationID("")
            setDestinationName("")
            setShowDestinationDeleteModal(false)
            router.push('/dashboard/destinations')
        }
    }
    return (
        <div>
            <form action={deleteDestination} className='border rounded p-4'>
                <h1 className='text-center'>You are about to delete destination: <span className='font-bold text-lg text-red-600'>{destinationName}</span></h1>
                <p className='bg-red-600 text-white p-3 text-center mt-4'>Please note that this action will affect all business with this destination!!!</p>

                <h1 className='my-6 text-red-600'>Are you sure? Press delete button to confirm!</h1>

                <div className="flex items-center justify-end gap-4 py-3 border-t">

                    <button type='button' className="bg-blue-600 px-6 text-white py-1 " onClick={() => {
                        setDestinationID("")
                        setDestinationName("")
                        setShowDestinationDeleteModal(false)
                        router.push('/dashboard/destinations')
                    }}>Cancel</button>

                    <button type='submit'
                        className="bg-red-600 text-white px-6 rounded py-1" >
                        Delete
                    </button>

                </div>
            </form>
        </div>
    )
}
