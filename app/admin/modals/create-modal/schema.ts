import { optionLocations, optionTypes } from "@/data/data";
import { z } from "zod"

// Convert the string arrays into tuples using type assertion
const typeValues = optionTypes.map(({ value }) => value) as [string, ...string[]];
const locationValues = optionLocations.map(({ value }) => value) as [string, ...string[]];

const schema = z.object({
    name: z.string().min(1, { message: "Name is required!" }),
    desc: z.string().min(1, { message: "Description is required!" }),
    beds: z.number().min(1, { message: "Beds are required!" }),
    hasFreeWifi: z.boolean().optional(),
    type: z.enum(typeValues), // Pass the tuple
    location: z.enum(locationValues), // Pass the tuple
    pricePerNight: z.number().min(15, { message: "Price must be above $15!" }).max(50000, { message: "Price can't be above $50k!" })
})

export { schema }
