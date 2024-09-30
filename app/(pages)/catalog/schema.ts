import { optionLocations, optionTypes } from "@/data/data";
import { z } from "zod";

// Ensure that you have at least one item for enum creation
const locationValues = optionLocations.map(({ value }) => value);
const typeValues = optionTypes.map(({ value }) => value);

// Check if locationValues and typeValues are not empty
if (locationValues.length === 0 || typeValues.length === 0) {
    throw new Error("Option locations and types must not be empty");
}

const schema = z.object({
    location: z.enum(locationValues as [string, ...string[]]),
    min_price: z.number().min(15, { message: "Price can't be less than $15!" }),
    max_price: z.number().max(50000, { message: "Price can't exceed more than $50k" }),
    type: z.enum(typeValues as [string, ...string[]]),
});

export {
    schema
}
