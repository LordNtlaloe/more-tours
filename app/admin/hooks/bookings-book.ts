import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "react-hot-toast"
import { deleteBooking } from "@/app/(pages)/bookings/service"

// Define types for the parameters and response data
interface DeleteBookingParams {
    chargeId: string;
    reservationId: string;
}

interface DeleteBookingResponse {
    data: any; // Adjust this type based on your actual response structure
    error?: string;
}

export const useBookingHook = () => {
    const queryClient = useQueryClient()

    const { mutate: handleDeleteBooking, isPending } = useMutation<DeleteBookingResponse, Error, DeleteBookingParams>({
        mutationFn: ({ chargeId, reservationId }) => deleteBooking({ chargeId, reservationId }),
        onSuccess: handleSuccess
    })

    function handleSuccess(response: DeleteBookingResponse) {
        if (response.error) {
            toast.error(response.error);
        } else {
            toast.success("Successfully deleted a reservation")
            queryClient.invalidateQueries({
                queryKey: ["admin", "reservations"]
            })
        }
    }

    return {
        handleDeleteBooking,
        isPending
    }
}
