import AXIOS_API from "@/utils/axiosAPI";
import { AxiosResponse } from "axios"; // Import AxiosResponse for type safety

// Define the type for the reservation response
interface Reservation {
    id: string;
    // Add other properties as needed
}

// Define the type for the deleteReservation parameters
interface DeleteReservationParams {
    chargeId: string; // Specify the type for chargeId
    reservationId: string; // Specify the type for reservationId
}

// Function to get user reservations
export async function getUserReservations(): Promise<Reservation[]> {
    const { data } = await AXIOS_API.get<Reservation[]>("/reservation");
    return data;
}

// Function to delete a reservation
export async function deleteReservation({ chargeId, reservationId }: DeleteReservationParams): Promise<{ data: any; error?: string }> {
    const { data: refundData, error: refundError } = await refundPayment({ chargeId, reservationId });

    if (refundError) throw new Error("Couldn't refund your reservation");

    const { data } = await AXIOS_API.delete(`/reservation/${reservationId}`);
    return { data, error: undefined }; // Adjust this as per your API response
}

// Function to refund payment
async function refundPayment({ chargeId, reservationId }: DeleteReservationParams): Promise<{ data?: any; error?: string }> {
    try {
        const { data } = await AXIOS_API.delete(`/stripe?charge_id=${chargeId}&reservation_id=${reservationId}`);
        return { data }; // Return the data on success
    } catch (error) {
        // Handle the error appropriately
        const errorMessage = (error as { response?: { data?: { message?: string } } })?.response?.data?.message || "An error occurred while processing your request.";
        return { error: errorMessage }; // Return the error message
    }
}
