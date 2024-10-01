import { connectToDB } from "@/lib/database";
import { getCurrentUser } from "@/lib/currentUser";
import { NextResponse } from "next/server";
import { getDatesInRange } from "@/lib/dateToMilliseconds";

// Define the structure of the reservation body
interface ReservationBody {
    startDate: string | Date;
    endDate: string | Date;
    listingId: string;
    daysDifference: number; 
    chargeId: string; // Added chargeId
}

export async function GET(req: Request) {
    try {
        const currentUser = await getCurrentUser();

        if (!currentUser) {
            return NextResponse.json({ message: "User not authenticated" }, { status: 401 });
        }

        const db = await connectToDB();

        const allReservations = currentUser.role ? 
            await db.reservation.findMany({ include: { listing: true, reservedDates: true } }) : // Include reservedDates
            await db.reservation.findMany({
                where: { userId: currentUser.id },
                include: { listing: true, reservedDates: true }, // Include reservedDates
            });

        return NextResponse.json(allReservations);
    } catch (error) {
        console.error(error);
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
}

export async function POST(req: Request) {
    try {
        const currentUser = await getCurrentUser();

        if (!currentUser) {
            return NextResponse.json({ message: "User not authenticated" }, { status: 401 });
        }

        const body: ReservationBody = await req.json();
        const db = await connectToDB();
        const { startDate, endDate, listingId, daysDifference, chargeId } = body;

        const listing = await db.listing.findUnique({
            where: { id: listingId },
            include: { reservations: { include: { reservedDates: true } } }, // Include reservedDates
        });

        if (!listing) {
            return NextResponse.json({ message: "Listing not found" }, { status: 404 });
        }

        // Collect all booked dates
        const allBookedDates: number[] = listing.reservations.flatMap(reservation =>
            reservation.reservedDates.map(reservedDate => reservedDate.date)
        );

        const getDates = getDatesInRange(startDate, endDate);
        const isUnavailable = allBookedDates.some(date => getDates.includes(date));

        if (isUnavailable) {
            return NextResponse.json({ message: "You are trying to reserve a booked date!" }, { status: 409 });
        }

        // Create new reservation
        const newReservation = await db.reservation.create({
            data: {
                startDate,
                endDate,
                listingId,
                daysDifference,
                chargeId, // Include chargeId
                userId: currentUser.id,
            },
        });

        // Create reserved dates entries
        const reservedDateEntries = getDates.map(date => ({
            date,
            reservationId: newReservation.id,
        }));

        await db.reservedDate.createMany({
            data: reservedDateEntries,
        });

        return NextResponse.json(newReservation);
    } catch (error) {
        console.error(error);
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
}
