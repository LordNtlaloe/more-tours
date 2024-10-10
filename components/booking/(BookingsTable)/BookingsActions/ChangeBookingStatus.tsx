'use client'

import { getTourById, updateTourStatus } from '@/app/_actions/_tourActions'
import Modal from '@/components/general/Modal'
import { useTourStore } from '@/lib/Stores/tourStore'
import { ChevronDown, X } from 'lucide-react'
import React, { useEffect, useState } from 'react'

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { showConfirmationMessage, showToastMessage } from '@/lib/generalFunctions'


const menuItems = [
    {
        id: 1,
        label: "approved"
    },
    {
        id: 1,
        label: "pending"
    },
    {
        id: 1,
        label: "completed"
    },
]

const ChangeTourStatus = ({ id }: { id: string }) => {
    const { showTourChangeStatusModal, setShowChangeTourStatusModal } = useTourStore()
    const [tour, setTour] = useState<any>()
    const [selectedState, setSelectedState] = useState("Not Selected")

    const getTour = async () => {
        const result = await getTourById(id)
        setTour(result)
        return result
    }

    const updateStatus = async () => {
        if (selectedState === "Not Selected") {
            showConfirmationMessage("error", "Please select new status!")
            return
        }
        if (tour?.status === selectedState) {
            showConfirmationMessage("error", "You have not changed the state of the tour!")
            return
        }
        try {

            await updateTourStatus(id, selectedState)

            showToastMessage('success', "Tour status successfully updated.")
            setShowChangeTourStatusModal(false)

        } catch (error: any) {
            showToastMessage("error", "An error occured updating tour state: " + error.message,)
        }
    }

    useEffect(() => {
        getTour()
    }, [id])
    return (
        <div>
            {showTourChangeStatusModal &&
                <Modal isVisible={true} onClose={''} >
                    <div className=' flex items-center justify-end'>
                        <button onClick={() => setShowChangeTourStatusModal(false)} className=' hover:text-red-500 hover:scale-125 transition-all'><X /></button>
                    </div>
                    <div className='p-6 bg-blue-900 text-white my-4 md:w-[500px] w-[350px] rounded'>
                        <h1 className='text-lg font-bold'>CHANGE BUSINESS STATUS</h1>
                    </div>
                    <div>
                        <h1 className='my-3'>Tour Name: <span className='font-bold text-sm'>{tour?.tourName}</span></h1>
                        <h1>Current Status: <span className='font-bold text-sm'>{tour?.status}</span></h1>
                        <div className='flex items-center gap-1'>
                            <h1>Change to:</h1>
                            <DropdownMenu>
                                <DropdownMenuTrigger><ChevronDown /></DropdownMenuTrigger>
                                <DropdownMenuContent className='bg-blue-900 text-white'>
                                    <DropdownMenuSeparator />
                                    {menuItems.map((item) => (
                                        <div className='py-1 border-b border-white/10 cursor-pointer hover:bg-gray-600/30 rounded-[5px]' key={item.id} onSelect={(selected) => setSelectedState(item.label)}>
                                            <DropdownMenuItem className='cursor-pointer' onClick={() => setSelectedState(item.label)} >{item.label}</DropdownMenuItem>
                                        </div>
                                    ))}
                                </DropdownMenuContent>
                            </DropdownMenu>
                            <h1 className='ml-4 bg-green-700 text-white font-semibold px-4 my-6'>{selectedState}</h1>

                        </div>
                        <div className='border-t mt-3 pt-3 border-black flex items-center '>
                            <button onClick={updateStatus} className='bg-red-500 py-1 px-3 rounded text-white mr-3'>
                                Change
                            </button>
                            <button className='bg-blue-500 py-1 px-3 rounded text-white' onClick={() => {
                                setShowChangeTourStatusModal(false)
                            }}>
                                Cancel
                            </button>

                        </div>
                    </div>
                </Modal>
            }
        </div>
    )
}

export default ChangeTourStatus