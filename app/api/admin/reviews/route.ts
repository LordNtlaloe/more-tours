import { connectToDB } from "@/lib/database";
import isAdminUser from "@/lib/isAdminUser";
import { NextResponse } from "next/server";

export async function GET(req) {
    try {
        await isAdminUser()
        const db = await connectToDB();
        const reviews = await db.review.findMany({})

        return NextResponse.json(reviews)
    } catch (error: any){
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}