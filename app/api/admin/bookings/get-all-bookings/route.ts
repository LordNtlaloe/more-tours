import { connectToDB } from "@/lib/database";
import isAdminUser from "@/lib/isAdminUser";
import { NextResponse } from "next/server";

export async function GET(req) {
    try {
        await isAdminUser();

        // Ensure connectToDB returns a Prisma client instance
        const prisma = await connectToDB();

        const getAllBookings = await prisma.booking.findMany({
            include: {
                listing: true,
                user: true
            }
        });

        const allBookingsTotalPrice = getAllBookings.map((booking) => {
            return {
                ...booking,
                totalPrice: booking.daysDifference * booking.listing.pricePerNight
            };
        });

        return NextResponse.json(allBookingsTotalPrice);
    } catch (error) {
        return NextResponse.error();
    }
}
