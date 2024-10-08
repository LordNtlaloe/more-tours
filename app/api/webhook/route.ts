import { connectToDB } from "@/lib/database";
import { getDatesInRange } from "@/lib/dateToMilliseconds";
import { headers } from "next/headers";
import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2024-06-20",
});

// Define the expected shape of metadata
interface SessionMetadata {
  startDate: string;
  endDate: string;
  listingId: string;
  pricePerNight: string; // Ensure this is the correct type
  daysDifference: string; // Ensure this is the correct type
  userId: string;
}

export async function POST(req: Request) {
  const sig = headers().get("stripe-signature") || '';
  const body = await req.text();

  let event;

  try {
    event = stripe.webhooks.constructEvent(body, sig, process.env.STRIPE_WEBHOOK_SECRET!);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object;

    // Ensure session.metadata has the expected shape
    const metadata = session.metadata as SessionMetadata;

    // Safely destructure metadata with default values to prevent undefined
    const {
      startDate = '',
      endDate = '',
      listingId = '',
      pricePerNight = '',
      daysDifference = '0',
      userId = '',
    } = metadata ?? {};

    // Retrieve payment intent details
    const paymentIntentId = session.payment_intent;
    const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);

    // Ensure chargeId is a string; fallback to an empty string if null
    const chargeId: string = paymentIntent.latest_charge !== null ? String(paymentIntent.latest_charge) : '';

    // Get reserved dates (an array of numbers, representing the dates in the range)
    const reservedDates = getDatesInRange(startDate, endDate); // Assumes getDatesInRange returns an array of dates (as numbers)

    // Create booking data with the correct structure for reservedDates
    const bookingData = {
      user: { connect: { id: userId } }, // Assuming userId is the identifier
      listing: { connect: { id: listingId } }, // Assuming listingId is the identifier
      startDate,
      endDate,
      chargeId, // chargeId is guaranteed to be a string now
      reservedDates: {
        create: reservedDates.map((date) => ({
          date, // Assuming 'date' is the correct field for reservedDates in the database
        })),
      },
      daysDifference: Number(daysDifference), // Convert to number
    };

    // Connect to the database
    const db = await connectToDB();

    // Create a new booking
    const newBooking = await db.booking.create({
      data: bookingData,
    });

    // Return the new booking
    return NextResponse.json(newBooking);
  }

  // Handle other events if necessary
  return NextResponse.json({ received: true }, { status: 200 });
}
