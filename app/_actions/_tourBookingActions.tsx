"use server"
import { revalidatePath } from "next/cache";
import { connectToDB } from "../_database/database";

// Initialize the Prisma connection
let dbConnection: any;

const init = async () => {
    if (!dbConnection) {
        dbConnection = await connectToDB();  // Fetch the Prisma client connection
    }
};

export const getBookingById = async (bookingId: string) => {
    if (!dbConnection) await init();

    try {
        const booking = await dbConnection.booking.findUnique({
            where: {
                id: bookingId, // Assuming bookingId is of type string
            },
            include: {
                user: { // Include related user data
                    select: {
                        firstName: true,
                    },
                },
                business: { // Include related business data
                    select: {
                        businessName: true,
                    },
                },
            },
        });

        if (!booking) {
            return { error: "Booking not found" };
        }

        // Return the booking data, combining user and business names
        return {
            id: booking.id,
            dateBooked: booking.dateBooked,
            dateOfBooking: booking.dateOfBooking,
            numberOfPeople: booking.numberOfPeople,
            bookingStatus: booking.bookingStatus,
            userName: booking.user.firstName,
            tourName: booking.tour.name,
        };
    } catch (error: any) {
        console.error("An error occurred while fetching the booking:", error.message);
        return { error: error.message };
    }
};

export const createTourBooking = async (formData: FormData) => {
    const userId = formData.get("userId") as string;
    const tourId = formData.get("businessId") as string;
    const dateBooked = formData.get('dateBooked') as string;
    const numberOfPeople = formData.get('numberOfPeople') as string;

    if (!dbConnection) await init();

    try {
        // Check if the selected time is in the future
        const selectedDateTime = new Date(`${dateBooked}`);
        const currentDateTime = new Date();

        if (selectedDateTime <= currentDateTime) {
            return { error: "Cannot book for a past or current time." };
        }

        // Check if the user has already booked for the day
        const userBookingOnSameDay = await dbConnection.booking.findFirst({
            where: {
                userId: Number(userId),
                dateBooked: new Date(dateBooked),
            },
        });

        if (userBookingOnSameDay) {
            return { error: "You have already made a booking for today. Multiple bookings on the same day are not allowed." };
        }

        // Check if the time slot is already booked
        const existingBooking = await dbConnection.booking.findFirst({
            where: {
                dateBooked: new Date(dateBooked)
            },
        });

        if (existingBooking) {
            return { error: "This time slot is already booked. Please choose another time." };
        }

        // Create a new booking
        const newBooking = await dbConnection.booking.create({
            data: {
                userId: Number(userId),
                tourId: Number(tourId), // Assuming businessId corresponds to tourId
                dateBooked: new Date(dateBooked),
                numberOfPeople: numberOfPeople,
                dateOfBooking: new Date(),
                timeOfBooking: new Date(),
                status: "PENDING", // Assuming you want to use the enum value
            },
        });

        // Revalidate the path for Next.js
        revalidatePath('/dashboard/mybookings');
        return { bookingId: newBooking.id };
    } catch (error: any) {
        console.log("An error occurred saving new booking:", error.message);
        return { error: error.message };
    }
};

export const getAllBookings = async () => {
    try {
      if (!dbConnection) await init();
  
      // Fetch all bookings with user and business details
      const bookings = await dbConnection.booking.findMany({
        include: {
          user: { select: { firstName: true } },  // Assuming you have a User relation
          tour: { select: { name: true } }, // Assuming tour relates to business
        },
      });
  
      // Map the result to include only necessary fields
      const formattedBookings = bookings.map((booking:any) => ({
        id: booking.id,
        dateBooked: booking.dateBooked,
        timeSlotBooked: booking.timeSlotBooked,
        dateOfBooking: booking.dateOfBooking,
        timeOfBooking: booking.timeOfBooking,
        bookingStatus: booking.status,
        name: booking.user?.firstName, // Using optional chaining for safety
        tourName: booking.tour?.name, // Adjust based on your relation name
      }));
  
      console.log("Bookings fetched:", formattedBookings);
  
      return formattedBookings;
    } catch (error: any) {
      console.error("An error occurred while fetching bookings:", error.message);
      return { error: error.message };
    }
  };
  