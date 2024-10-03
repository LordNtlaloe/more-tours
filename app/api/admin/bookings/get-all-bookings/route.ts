import { connectToDB } from "@/lib/database";
import isAdminUser from "@/lib/isAdminUser";
import { NextResponse } from "next/server";

export async function GET(req) {
    try {
        await isAdminUser();

        // Ensure connectToDB returns a Prisma client instance
        const prisma = await connectToDB();

        const getAllBookings = await prisma.reservation.findMany({
            include: {
                listing: true,
                user: true
            }
        });

        const allBookingsTotalPrice = getAllBookings.map((reservation) => {
            return {
                ...reservation,
                totalPrice: reservation.daysDifference * reservation.listing.pricePerNight
            };
        });

        return NextResponse.json(allBookingsTotalPrice);
    } catch (error) {
        return NextResponse.error();
    }
}
