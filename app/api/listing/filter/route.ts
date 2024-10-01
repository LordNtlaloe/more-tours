import { connectToDB } from "@/lib/database";
import { calcAndSortListings } from "@/lib/sortListings";
import { NextResponse } from "next/server";

export async function GET(req) {
    try {
        const { searchParams } = new URL(req.url);
        const db = await connectToDB();
        
        // Get the search parameters and ensure they are either strings or undefined
        const location = searchParams.get("location") || undefined;
        const min_price = Number(searchParams.get("min_price")) || 0; // Set a default if necessary
        const max_price = Number(searchParams.get("max_price")) || Number.MAX_VALUE; // Set a max default
        const type = searchParams.get("type") || undefined;

        const listings = await db.listing.findMany({
            where: {
                pricePerNight: {
                    gte: min_price,
                    lte: max_price
                },
                location,
                type
            },
            include: {
                reviews: true
            }
        });

        console.log(listings);
        const sortedListings = calcAndSortListings(listings);
        console.log(sortedListings);
        return NextResponse.json(sortedListings);
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
