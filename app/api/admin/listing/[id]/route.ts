import { connectToDB } from "@/lib/database"; // Ensure this imports the correct connectToDB function
import isAdminUser from "@/lib/isAdminUser";
import { NextResponse } from "next/server";

export async function GET(req, ctx) {
    try {
        await isAdminUser();

        const { id } = ctx.params;

        // Call connectToDB() to get the PrismaClient instance
        const db = await connectToDB();
        const listing = await db.listing.findUnique({
            where: { id }
        });

        return NextResponse.json(listing);
    } catch (error) {
        console.error(error); // Log the error for debugging
        return NextResponse.error();
    }
}

export async function PUT(req, ctx) {
    try {
        await isAdminUser();

        const { id } = ctx.params;
        const body = await req.json();

        // Call connectToDB() to get the PrismaClient instance
        const db = await connectToDB();
        const updatedListing = await db.listing.update({
            where: { id },
            data: { ...body }
        });

        return NextResponse.json(updatedListing);
    } catch (error) {
        console.error(error); // Log the error for debugging
        return NextResponse.error();
    }
}

export async function DELETE(req, ctx) {
    try {
        await isAdminUser();
        const { id } = ctx.params;

        // Call connectToDB() to get the PrismaClient instance
        const db = await connectToDB();
        const deletedListing = await db.listing.delete({
            where: { id }
        });

        if (deletedListing) {
            return NextResponse.json({ message: "Listing has been deleted successfully" }, { status: 200 });
        } else {
            return NextResponse.json({ message: `Listing with the id of ${id} doesn't exist!` }, { status: 404 });
        }
    } catch (error) {
        console.error(error); // Log the error for debugging
        return NextResponse.error();
    }
}
