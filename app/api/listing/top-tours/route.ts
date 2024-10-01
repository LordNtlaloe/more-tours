import { connectToDB } from "@/lib/database";
import { calcAndSortListings } from "@/lib/sortListings"
import { NextResponse } from "next/server";

export async function GET(req) {
    try {
        const db = await connectToDB();
        const listings = await db.listing.findMany({
            include: {
                reviews: true
            }
        })

        const sortedListings = calcAndSortListings(listings).slice(0, 4)

        return NextResponse.json(sortedListings)
    } catch (error: any) {
        return NextResponse.json({error: error.message}, {status: 500})
    }
}