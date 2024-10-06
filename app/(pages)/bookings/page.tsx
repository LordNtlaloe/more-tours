import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { format } from 'date-fns'

// Define the structure of the Booking object
interface Booking {
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
    booking: Booking;
    mutate: (params: { chargeId: string; bookingId: string }) => Promise<void>; // Adjust return type as needed
}

const Card: React.FC<CardProps> = ({ booking, mutate }) => {
    return (
        <div className="w-[300px] min-h-full flex flex-col">
            <Link href={`/details/${booking.listing.id}`}>
                <Image
                    src={booking.listing.imageUrls[0]}
                    className="rounded-xl shadow-xl"
                    height={200}
                    width={300}
                    alt={booking.listing.name}
                />
            </Link>
            <div className="p-2 mt-2 flex flex-col gap-4">
                <span className="font-semibold text-lg">
                    {booking.listing.location}
                </span>
                <span>
                    {booking.listing.name}
                </span>
                <div>
                    <span className="text-slate-500">
                        {format(booking.startDate, "MMM do yyyy")}
                    </span>
                    <span className="px-2">-</span>
                    <span className="text-slate-500">
                        {format(booking.endDate, "MMM do yyyy")}
                    </span>
                </div>
                <div>
                    Total price: ${booking.daysDifference * booking.listing.pricePerNight}
                </div>
                <button
                    onClick={() => {
                        mutate({
                            chargeId: booking.chargeId,
                            bookingId: booking.id
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
