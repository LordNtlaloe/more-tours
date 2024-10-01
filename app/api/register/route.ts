import { connectToDB } from '@/lib/database'
import { NextResponse } from 'next/server'
import bcryptjs from 'bcryptjs'

export async function POST(req) {
    try {
        const body = await req.json()
        const db = await connectToDB();
        const {
            email,
            username,
            password
        } = body

        const isExisting = await db.user.findUnique({
            where: {
                email
            }
        })

        if (isExisting) {
            return NextResponse.json({ message: "You've already registered" }, { status: 409 })
        }

        const hashedPassword = await bcryptjs.hash(password, 10)

        await db.user.create({
            data: {
                email,
                username,
            }
        })

        return NextResponse.json({ message: "User has registered successfully" }, { status: 201 })
    } catch (error) {
        return NextResponse.json(error)
    }
}