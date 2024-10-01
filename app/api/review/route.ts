import { connectToDB } from "@/lib/database";
import { getCurrentUser } from "@/lib/currentUser";
import { NextResponse } from "next/server";

export async function POST(req) {
    try {
        // Extracting the review text and stars from the request body
        const { text, stars } = await req.json();
        
        // Getting the current user from the session
        const currentUser = await getCurrentUser();
        
        // Check if the user is authenticated
        if (!currentUser) {
            return NextResponse.json({ error: "User is not authenticated." }, { status: 401 });
        }

        // Destructure user ID from current user
        const { id: userId } = currentUser;

        // Connect to the database
        const db = await connectToDB();
        const { searchParams } = new URL(req.url);
        
        // Retrieve the listing ID from the query parameters
        const listingId = searchParams.get("id");

        // Check if the listing ID is provided
        if (!listingId) {
            return NextResponse.json({ error: "Listing ID is required." }, { status: 400 });
        }

        // Create a new review in the database
        const createdReview = await db.review.create({
            data: {
                text,
                stars,
                listingId,
                userId
            },
            include: {
                user: true
            }
        });

        // Return the created review with a success status
        return NextResponse.json(createdReview, { status: 201 });
    } catch (error: any) {
        // Handle any errors and return an error response
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
