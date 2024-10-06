import { connectToDB } from "@/lib/database";
import { NextResponse, NextRequest } from "next/server";
import isAdminUser from "@/lib/isAdminUser";

// GET request to fetch listings
export async function GET(req: NextRequest) {
  try {
    const db = await connectToDB();
    const listings = await db.listing.findMany({
      take: 10,  // Limit the number of listings returned
    });

    return NextResponse.json(listings);
  } catch (error: any) {
    console.error("GET Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// POST request to create a new listing (admin only)
export async function POST(req: NextRequest) {
  try {
    await isAdminUser();

    const db = await connectToDB();
    const body = await req.json();

    // Validate the input: if any required field is missing or empty, return an error
    const requiredFields = ["name", "location", "desc", "type", "pricePerNight", "beds", "hasFreeWifi"];
    for (let field of requiredFields) {
      if (!body[field]) {
        return NextResponse.json({ message: `The field "${field}" is required!` }, { status: 400 });
      }
    }

    // Destructure values from the body
    const { name, location, desc, type, pricePerNight, beds, hasFreeWifi } = body;

    // Create a new listing in the database
    const newListing = await db.listing.create({
      data: {
        name,
        location,
        desc,
        type,
        pricePerNight,
        beds,
        hasFreeWifi,
      },
    });

    return NextResponse.json(newListing);
  } catch (error: any) {
    console.error("POST Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
