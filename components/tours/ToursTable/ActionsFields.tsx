'use client'

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useTourStore } from "@/lib/Stores/tourStore"
import Link from "next/link"

const tourActions = [
    {
        id: 1,
        label: "Update Info"
    },
    {
        id: 2,
        label: "Change Status"
    },

]

export default function ActionsFields({ id }: { id: string }) {
    const { setShowTourUpdateModal, setShowChangeTourStatusModal } = useTourStore()
    return (
        <div className="pl-2">
            <DropdownMenu>
                <DropdownMenuTrigger className="flex items-center justify-center flex-col">
                    <p className="text-center font-semibold text-xl cursor-pointer px-5 hover:scale-150 transition-all">
                        ...
                    </p>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="bg-blue-950 text-white" align="end">

                    <DropdownMenuSeparator />
                    {tourActions.map((action) => (
                        <Link href={`/dashboard/tours?action=${action.label.toLocaleLowerCase()}&id=${id}`} key={action.id} className="border-b px-8 border-white/20 py-2 cursor-pointer hover:bg-gray-700 rounded mx-3 flex flex-col" onClick={() => {
                            if (action.label === "Update Info") {
                                setShowTourUpdateModal(true)
                            } else if (action.label === "Change Status") {
                                setShowChangeTourStatusModal(true)
                            }
                        }}>
                            <p>{action.label}</p>
                        </Link>
                    ))}

                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    )
}
