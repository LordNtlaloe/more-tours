import AXIOS_API from "@/utils/axiosAPI";
import { loadStripe } from "@stripe/stripe-js"

export const redirectToCheckout = async (
    listing: any,
    startDate: any,
    endDate: any,
    daysDifference: any
) => {
    try {

        const stripePublishableKey = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY;

        if (!stripePublishableKey) {
            throw new Error("NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY is not defined");
        }

        const stripe = await loadStripe(stripePublishableKey);

        if (!stripe) throw new Error("Stripe failed to initialize")

        const { data: { sessionId } } = await AXIOS_API.post('/stripe', {
            listing,
            startDate,
            endDate,
            daysDifference
        })

        const stripeError = await stripe.redirectToCheckout({
            sessionId
        })

        if (stripeError) {
            return
        }

    } catch (error) {
        console.log(error)
    }
}