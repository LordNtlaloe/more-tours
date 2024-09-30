import { optionLocations, optionTypes } from "@/data/data";
import { z } from "zod";

// Convert array of values into a tuple-like structure
const locationValues = optionLocations.map(({ value }) => value) as [string, ...string[]];
const typeValues = optionTypes.map(({ value }) => value) as [string, ...string[]];

const schema = z.object({
    name: z.string().min(1, { message: "Name is required!" }),
    desc: z.string().min(1, { message: "Description is required!" }),
    beds: z.number().min(1, { message: "Beds are required!" }),
    hasFreeWifi: z.boolean().optional(),
    type: z.enum(typeValues), // Now it will accept this tuple
    location: z.enum(locationValues), // Now it will accept this tuple
    pricePerNight: z.number().min(15, {message: "Price must be above $15"}).max(50000, {message: "Price can't exceed $50k!"})
})

export {
    schema
}
