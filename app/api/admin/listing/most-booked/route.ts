import { connectToDB } from "@/lib/database";
import isAdminUser from "@/lib/isAdminUser";
import { NextResponse } from "next/server";
import { NextRequest } from "next/server"; // Import NextRequest type

export async function GET(req: NextRequest) {
  try {
    await isAdminUser();
    const db = await connectToDB();

    // Type allListings as an array of listing objects
    const allListings = await db.listing.findMany({
      include: {
        bookings: true,
      },
    });

    // Find the most reserved listing
    const mostReservedListing = allListings.reduce((a, b) => {
      return a?.bookings?.length >= b?.bookings?.length ? a : b;
    });

    return NextResponse.json(mostReservedListing);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
