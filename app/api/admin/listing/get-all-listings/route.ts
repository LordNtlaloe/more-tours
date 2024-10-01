import { connectToDB } from "@/lib/database";
import isAdminUser from "@/lib/isAdminUser";
import { NextResponse } from "next/server";
import { NextRequest, NextResponse as NextApiResponse } from "next/server"; // Import types

// Type for context (ctx) with params
type Context = {
  params: {
    id: string;
  };
};

// GET Request
export async function GET(req: NextRequest, ctx: Context) {
  try {
    await isAdminUser();
    const db = await connectToDB();
    const { id } = ctx.params;

    const listing = await db.listing.findUnique({
      where: { id },
    });

    return NextApiResponse.json(listing);
  } catch (error: any) {
    return NextApiResponse.json({ error: error.message }, { status: 500 });
  }
}

// PUT Request
export async function PUT(req: NextRequest, ctx: Context) {
  try {
    await isAdminUser();

    const { id } = ctx.params;
    const body = await req.json();

    const db = await connectToDB();
    const updatedListing = await db.listing.update({
      where: { id },
      data: { ...body },
    });

    return NextApiResponse.json(updatedListing);
  } catch (error: any) {
    return NextApiResponse.json({ error: error.message }, { status: 500 });
  }
}

// DELETE Request
export async function DELETE(req: NextRequest, ctx: Context) {
  try {
    await isAdminUser();
    const db = await connectToDB();
    const { id } = ctx.params;

    const deletedListing = await db.listing.delete({
      where: { id },
    });

    if (deletedListing) {
      return NextApiResponse.json(
        { message: "Listing has been deleted successfully" },
        { status: 200 }
      );
    } else {
      return NextApiResponse.json(
        { error: `Listing with the id of ${id} doesn't exist!` },
        { status: 404 }
      );
    }
  } catch (error: any) {
    return NextApiResponse.json({ error: error.message }, { status: 500 });
  }
}
