import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "react-hot-toast"
import { deleteBooking } from "@/app/(pages)/bookings/service"

interface BookingProps{
    chargeId: string,
    reservationId: string
}

export const useReservationHook = () => {
    const queryClient = useQueryClient()

    const { mutate: handleDeleteReservation, isPending } = useMutation({
        mutationFn: ({ chargeId, reservationId }: BookingProps) => deleteBooking({ chargeId, reservationId }),
        onSuccess: handleSuccess
    })

    function handleSuccess() {
        toast.success("Successfully deleted a reservation")
        queryClient.invalidateQueries({
            queryKey: ["admin", "reservations"]
        })
    }

    return {
        handleDeleteReservation,
        isPending
    }
}