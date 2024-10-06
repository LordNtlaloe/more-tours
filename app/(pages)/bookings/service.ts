import AXIOS_API from "@/utils/axiosAPI";
import { AxiosResponse } from "axios"; // Import AxiosResponse for type safety

// Define the type for the booking response
interface Booking {
    id: string;
    // Add other properties as needed
}

// Define the type for the deleteBooking parameters
interface DeleteBookingParams {
    chargeId: string; // Specify the type for chargeId
    bookingId: string; // Specify the type for bookingId
}

// Function to get user bookings
export async function getUserBookings(): Promise<Booking[]> {
    const { data } = await AXIOS_API.get<Booking[]>("/booking");
    return data;
}

// Function to delete a booking
export async function deleteBooking({ chargeId, bookingId }: DeleteBookingParams): Promise<{ data: any; error?: string }> {
    const { data: refundData, error: refundError } = await refundPayment({ chargeId, bookingId });

    if (refundError) throw new Error("Couldn't refund your booking");

    const { data } = await AXIOS_API.delete(`/booking/${bookingId}`);
    return { data, error: undefined }; // Adjust this as per your API response
}

// Function to refund payment
async function refundPayment({ chargeId, bookingId }: DeleteBookingParams): Promise<{ data?: any; error?: string }> {
    try {
        const { data } = await AXIOS_API.delete(`/stripe?charge_id=${chargeId}&booking_id=${bookingId}`);
        return { data }; // Return the data on success
    } catch (error) {
        // Handle the error appropriately
        const errorMessage = (error as { response?: { data?: { message?: string } } })?.response?.data?.message || "An error occurred while processing your request.";
        return { error: errorMessage }; // Return the error message
    }
}
