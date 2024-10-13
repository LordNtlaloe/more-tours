'use server'

import { revalidatePath } from "next/cache";
import { connectToDB } from "../_database/database";

let dbConnection: any;

const init = async () => {
    const connection = await connectToDB();
    dbConnection = connection;
};

export const saveNewTourBooking = async (formData: FormData) => {

    if (!dbConnection) if (!dbConnection) await init();

    const data = {
        userId: formData.get("userId") as string,
        tourId: Number(formData.get("tourId")),
        dateBooked: new Date(),
        bookingDate:formData.get("bookingDate") as string,
        bookingStatus: "PENDING",
        numberOfPeople: Number(formData.get("numberOfPeople")),
        totalPrice: parseFloat(formData.get("totalPrice") as string)
    };

    try {
        const userBookingOnSameDay = await dbConnection.booking.findFirst({
            where: {
                userId: data.userId,
                dateBooked: data.dateBooked,
            },
        });

        if (userBookingOnSameDay) {
            return { error: "You have already made a booking for today. Multiple bookings on the same day are not allowed." };
        }

        const newBooking = await dbConnection.booking.create({
            data: {
                userId: data.userId,
                tourId: data.tourId,
                numberOfPeople: data.numberOfPeople,
                status: data.bookingStatus,
                totalPrice: data.totalPrice,
                dateBooked: data.dateBooked,
                bookingDate: data.bookingDate,
            },
        });
        console.log(data);
        revalidatePath('/dashboard/mybookings');
        return { bookingId: newBooking.id };
    } catch (error: any) {
        console.log("An error occurred while creating a new booking:", error.message);
        return { error: error.message };
    }
};


export const getBookingById = async (bookingId: string) => {
    if (!dbConnection) if (!dbConnection) await init();

    try {
        const booking = await dbConnection.booking.findUnique({
            where: { id: bookingId },
            include: {
                user: { select: { firstName: true } },
                tour: { select: { tourName: true } },
            },
        });

        if (!booking) {
            return { error: "Booking not found" };
        }

        return {
            ...booking,
            userName: booking.user.firstName,
            tourName: booking.tour.tourName,
        };
    } catch (error: any) {
        console.error("An error occurred while fetching the booking:", error.message);
        return { error: error.message };
    }
};

export const getTourBookedSlots = async (tourId: string, date: string) => {
    if (!dbConnection) if (!dbConnection) await init();

    try {
        const bookings = await dbConnection.booking.findMany({
            where: {
                tourId: tourId,
                dateBooked: date,
            },
            select: { timeSlotBooked: true },
        });

        const bookedSlots = bookings.map((booking: { timeSlotBooked: any; }) => booking.timeSlotBooked);
        return bookedSlots;
    } catch (error: any) {
        console.log("GET BOOKED SLOTS:", error.message);
        return { error: error.message };
    }
};

export const getAllBookings = async () => {
    if (!dbConnection) await init();
  
    try {
      const bookings = await dbConnection.booking.findMany({
        include: {
          user: { select: { name: true } }, // Fetching user details
          tour: { 
            select: { 
              title: true, 
              destination: true, 
              price: true,
              startDate: true,
              endDate: true
            } 
          }, // Fetching tour details
        },
        orderBy: { dateBooked: 'desc' }, // Sorting by booking date
      });
  
      return bookings.map((booking: { id: any; dateBooked: any; user: { name: any; }; tour: { title: any; destination: any; price: any; numberOfPeople: any; startDate: any; endDate: any; }; status: any; totalPrice: any; bookingDate: any; numberOfPeople: any; }) => ({
        id: booking.id,
        dateBooked: booking.dateBooked,
        userId: booking.user.name, // Display user's name
        tour: {
          title: booking.tour.title,
          destination: booking.tour.destination,
          price: booking.tour.price,
          startDate: booking.tour.startDate,
          endDate: booking.tour.endDate
        },
        status: booking.status,
        totalPrice: booking.totalPrice,
        bookingDate: booking.bookingDate,
        numberOfPeople: booking.numberOfPeople
      }));
    } catch (error: any) {
      console.error("An error occurred while fetching bookings:", error.message);
      return [];
    }
  };


export const getBookingsCountByTodayDate = async () => {
    if (!dbConnection) await init();

    try {
        const currentDate = new Date().toLocaleDateString();

        const bookingsCount = await dbConnection.booking.count({
            where: { dateBooked: currentDate },
        });

        return bookingsCount;
    } catch (error: any) {
        console.error("An error occurred while fetching bookings count for today:", error.message);
        return { error: error.message };
    }
};

export const deleteOneBooking = async (bookingId: string) => {
    if (!dbConnection) await init();

    try {
        const deleted = await dbConnection.booking.delete({
            where: { id: bookingId },
        });
        revalidatePath('/dashboard/bookings');
        return deleted;
    } catch (error: any) {
        console.log("An error occurred while deleting the booking:", error.message);
        return { error: error.message };
    }
};