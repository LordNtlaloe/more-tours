import AXIOS_API from "@/utils/axiosAPI";

export async function getAllListings() {
    const { data } = await AXIOS_API.get('/admin/listing/get-all-listings')

    return data
}

export async function getAllBookings() {
    const { data } = await AXIOS_API.get('/admin/booking/get-all-bookings')

    return data
}

export async function getAllRevenue() {
    const { data } = await AXIOS_API.get('/admin/booking/get-all-revenue')

    return data
}

export async function getAllUsers() {
    const { data } = await AXIOS_API.get('/admin/user/get-all-users')

    return data
}

export async function deleteReview(id) {
    const { data } = await AXIOS_API.delete(`/admin/review/${id}`)

    return data
}