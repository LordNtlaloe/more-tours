import AXIOS_API from "@/utils/axiosAPI";

export async function updateListing({ bookingId, body }) {
    const { data: updatedListing } = await AXIOS_API.put(`/admin/bookings/${bookingId}`, body)

    return updatedListing
}

export async function deleteListing(id) {
    const { data } = await AXIOS_API.delete(`/admin/bookings/${id}`)

    return data
}

export async function getAllBookings(){
    const { data } = await AXIOS_API.get("/admin/bookings");
    return data
}
