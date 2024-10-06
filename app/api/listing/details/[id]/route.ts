import { connectToDB } from "@/lib/database";
import { NextResponse } from "next/server";

export async function GET(req, ctx) {
    try {
        const { id } = ctx.params;
        const db = await connectToDB();
        const listing = await db.listing.findUnique({
            where: {
                id
            },
            include: {
                reviews: true,
                bookings: true
            }
        });

        // Check if the listing is null
        if (!listing) {
            return NextResponse.json({ error: "Listing not found" }, { status: 404 });
        }

        // If the listing exists, calculate the average rating
        const avgRating = listing.reviews.length > 0
            ? listing.reviews.reduce((a, b) => a + b.stars, 0) / listing.reviews.length
            : 0;

        return NextResponse.json({
            ...listing,
            avgRating: avgRating ? Number(avgRating.toFixed(2)) : 0
        });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
