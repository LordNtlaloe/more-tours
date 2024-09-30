import AXIOS_API from "@/utils/axiosAPI";

export async function getFilteredListings(values: { location: any; min_price: any; max_price: any; type: any; }) {
    
    const url = `/listing/filter?location=${values.location}&min_price=${values.min_price}&max_price=${values.max_price}&type=${values.type}`
    const { data } = await AXIOS_API.get(url)

    if (data) {
        const blurredImages = await Promise.all(
            data.map((listing: { imageUrls: any[]; }) => AXIOS_API.get(`/base64?url=${listing.imageUrls[0]}`))
        )
        const filteredHotels = blurredImages.map((img, idx) => {
            const blurredImage = img.data
            const currentHotel = data[idx]

            return { ...currentHotel, blurredImage }
        })

        console.log(filteredHotels)
        return filteredHotels
    }
}