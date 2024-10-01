import { connectToDB } from "@/lib/database";
import isAdminUser from "@/lib/isAdminUser";
import { NextResponse, NextRequest } from "next/server";
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";

// GET handler
export async function GET(req: NextRequest, ctx: { params: Params }) {
    try {
        await isAdminUser();
        const db = await connectToDB();
        const { id } = ctx.params;

        const user = await db.user.findUnique({
            where: { id: String(id) }, // Assuming id is a number, adjust if it is a string
        });

        return NextResponse.json(user);
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

// PUT handler
export async function PUT(req: NextRequest, ctx: { params: Params }) {
    try {
        await isAdminUser();
        const db = await connectToDB();
        const { id } = ctx.params;
        const body = await req.json();

        const updatedUser = await db.user.update({
            data: { ...body },
            where: { id: String(id) }, // Assuming id is a number
        });

        return NextResponse.json(updatedUser);
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

// DELETE handler
export async function DELETE(req: NextRequest, ctx: { params: Params }) {
    try {
        await isAdminUser();
        const db = await connectToDB();
        const { id } = ctx.params;

        const deletedUser = await db.user.delete({
            where: { id: String(id) }, // Assuming id is a number
        });

        if (deletedUser) {
            return NextResponse.json({ message: "User has been successfully deleted!" }, { status: 200 });
        } else {
            return NextResponse.json({ message: `User with the id of ${id} doesn't exist!` }, { status: 404 });
        }
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
