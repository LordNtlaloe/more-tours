import { getCurrentUser } from "@/lib/currentUser";
import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: "2024-06-20",
});

export async function POST(req: Request) {
    try {
        // Parse the request body
        const {
            listing: { name, pricePerNight, id: listingId },
            startDate,
            endDate,
            daysDifference,
        } = await req.json();

        const stripe_obj = [
            {
                price_data: {
                    currency: "usd",
                    product_data: {
                        name,
                    },
                    unit_amount: pricePerNight * 100, // Convert price to cents
                },
                quantity: daysDifference,
            },
        ];

        // Get the current user
        const currentUser = await getCurrentUser();
        if (!currentUser) {
            return NextResponse.json({ error: "User not authenticated." }, { status: 401 });
        }

        // Create a Stripe checkout session
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            line_items: stripe_obj,
            mode: "payment",
            success_url: "http://localhost:3000/success-page",
            cancel_url: "http://localhost:3000",
            metadata: {
                startDate,
                endDate,
                listingId,
                pricePerNight,
                daysDifference,
                userId: currentUser.id,
                email: currentUser.email,
            },
        });

        return NextResponse.json({ sessionId: session.id });
    } catch (error: any) {
        console.error("Error creating checkout session:", error);
        return NextResponse.json({ error: "Failed to create checkout session." }, { status: 500 });
    }
}

export async function DELETE(req: Request) {
    try {
        const { searchParams } = new URL(req.url);
        const chargeId = searchParams.get("charge_id");
        const reservationId = searchParams.get("reservation_id");

        if (!chargeId || !reservationId) {
            return NextResponse.json({ error: "Charge ID and reservation ID are required." }, { status: 400 });
        }

        // Create a refund
        const refundedPayment = await stripe.refunds.create({
            charge: chargeId,
        });

        if (refundedPayment.status !== "succeeded") {
            return NextResponse.json(
                { error: `Can't cancel the reservation with an id of ${reservationId}` },
                { status: 400 }
            );
        }

        return NextResponse.json({ message: "Successfully cancelled the reservation" });
    } catch (error: any) {
        console.error("Error processing refund:", error);
        return NextResponse.json({ error: "Failed to cancel reservation." }, { status: 500 });
    }
}
