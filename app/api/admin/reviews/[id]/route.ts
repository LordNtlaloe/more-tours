import { connectToDB } from "@/lib/database";
import isAdminUser from "@/lib/isAdminUser";
import { NextResponse, NextRequest } from "next/server"; // Import NextRequest type
import { Params } from "next/dist/shared/lib/router/utils/route-matcher"; // Import Params for ctx.params typing

export async function DELETE(req: NextRequest, ctx: { params: Params }) {
    try {
        await isAdminUser();
        const db = await connectToDB();
        const { id } = ctx.params;

        const review = await db.review.delete({
            where: { id: String(id) } // Assuming id is a number
        });

        if (review) {
            return NextResponse.json({ message: "Successfully deleted the review" });
        } else {
            return NextResponse.json({ message: `Review with the id of ${id} doesn't exist` }, { status: 404 });
        }
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
