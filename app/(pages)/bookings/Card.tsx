import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { format } from 'date-fns'

// Define the structure of the Reservation object
interface Reservation {
    id: string;
    chargeId: string;
    startDate: Date; // Adjust the type based on your data
    endDate: Date; // Adjust the type based on your data
    daysDifference: number;
    listing: {
        id: string; // Assuming you have an ID for the listing
        name: string;
        location: string;
        imageUrls: string[];
        pricePerNight: number; // Assuming this is a number
    };
}

// Define the props for the Card component
interface CardProps {
    reservation: Reservation;
    mutate: (params: { chargeId: string; reservationId: string }) => Promise<void>; // Adjust return type as needed
}

const Card: React.FC<CardProps> = ({ reservation, mutate }) => {
    return (
        <div className="w-[300px] min-h-full flex flex-col">
            <Link href={`/details/${reservation.listing.id}`}>
                <Image
                    src={reservation.listing.imageUrls[0]}
                    className="rounded-xl shadow-xl"
                    height={200}
                    width={300}
                    alt={reservation.listing.name}
                />
            </Link>
            <div className="p-2 mt-2 flex flex-col gap-4">
                <span className="font-semibold text-lg">
                    {reservation.listing.location}
                </span>
                <span>
                    {reservation.listing.name}
                </span>
                <div>
                    <span className="text-slate-500">
                        {format(reservation.startDate, "MMM do yyyy")}
                    </span>
                    <span className="px-2">-</span>
                    <span className="text-slate-500">
                        {format(reservation.endDate, "MMM do yyyy")}
                    </span>
                </div>
                <div>
                    Total price: ${reservation.daysDifference * reservation.listing.pricePerNight}
                </div>
                <button
                    onClick={() => {
                        mutate({
                            chargeId: reservation.chargeId,
                            reservationId: reservation.id
                        })
                    }}
                    className="w-full py-2 bg-red-500 text-white rounded-xl transition-all hover:bg-red-400"
                >
                    Cancel
                </button>
            </div>
        </div>
    )
}

export default Card;
