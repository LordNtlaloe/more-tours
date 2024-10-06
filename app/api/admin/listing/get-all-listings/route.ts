import { connectToDB } from "@/lib/database";
import isAdminUser from "@/lib/isAdminUser";
import { NextRequest, NextResponse } from "next/server";

// Type for context (ctx) with params
type Context = {
  params: {
    id: string;
  };
};

// GET Request
export async function GET(req: NextRequest, { params }: Context) {
  try {
    await isAdminUser();
    const db = await connectToDB();
    const { id } = params;

    const listing = await db.listing.findUnique({
      where: { id },
    });

    if (!listing) {
      return NextResponse.json({ error: `Listing with id ${id} not found` }, { status: 404 });
    }

    return NextResponse.json(listing);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// PUT Request
export async function PUT(req: NextRequest, { params }: Context) {
  try {
    await isAdminUser();
    const { id } = params;
    const body = await req.json();

    const db = await connectToDB();
    const updatedListing = await db.listing.update({
      where: { id },
      data: { ...body },
    });

    return NextResponse.json(updatedListing);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// DELETE Request
export async function DELETE(req: NextRequest, { params }: Context) {
  try {
    await isAdminUser();
    const db = await connectToDB();
    const { id } = params;

    const deletedListing = await db.listing.delete({
      where: { id },
    });

    return NextResponse.json(
      { message: "Listing has been deleted successfully" },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
