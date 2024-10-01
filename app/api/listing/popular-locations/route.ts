import { connectToDB } from "@/lib/database";
import { NextResponse } from "next/server";
import isAdminUser from "@/lib/isAdminUser";

export async function GET(req){
    try {
        const db = await connectToDB();
        const listings = await db.listing.findMany({
            take: 10
        })

        return NextResponse.json(listings)
    } catch (error: any) {
        return NextResponse.json({error: error.message}, {status: 500})
    }
}

export async function POST(req) {
    try {
        await isAdminUser()
        const db = await connectToDB();
        const body = await req.json()
        Object.values(body).forEach((v) => {
            if (v === "") return NextResponse.json({ message: "Fill all fields!" })
        })

        const {
            name,
            location,
            desc,
            type,
            pricePerNight,
            beds,
            hasFreeWifi,
            imageUrls
        } = body

        const newListing = await db.listing.create({
            data: {
                name,
                location,
                desc,
                type,
                pricePerNight,
                beds,
                hasFreeWifi,
                imageUrls
            }
        })

        return NextResponse.json(newListing)
    } catch (error: any) {
        return NextResponse.json({error: error.message}, {status: 500})
    }
}