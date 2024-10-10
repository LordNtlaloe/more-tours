'use server'

import { revalidatePath } from "next/cache";
import { connectToDB } from "../_database/database";
import { ObjectId } from "mongodb";

let dbConnection: any;
let database: any;

const init = async () => {
    const connection = await connectToDB();
    dbConnection = connection;
};

export const getBookingById = async (bookingId: string) => {
    if (!dbConnection) await init();

    try {
        const collection = database.collection("bookings");
        if (!collection) {
            throw new Error("Failed to connect to bookings collection");
        }

        const booking = await collection.aggregate([
            {
                $match: { _id: new ObjectId(bookingId) }
            },
            {
                $lookup: {
                    from: "users",
                    localField: "userId",
                    foreignField: "_id",
                    as: "user"
                }
            },
            {
                $lookup: {
                    from: "toures",
                    localField: "tourId",
                    foreignField: "_id",
                    as: "tour"
                }
            },
            {
                $project: {
                    _id: 1,
                    dateBooked: 1,
                    timeSlotBooked: 1,
                    dateOfBooking: 1,
                    timeOfBooking: 1,
                    bookingStatus: 1,
                    userName: { $arrayElemAt: ["$user.firstName", 0] },
                    tourName: { $arrayElemAt: ["$tour.tourName", 0] }
                }
            }
        ]).toArray();

        if (booking.length === 0) {
            return { error: "Booking not found" };
        }

        return booking[0];
    } catch (error: any) {
        console.error("An error occurred while fetching the booking:", error.message);
        return { error: error.message };
    }
};


export const saveNewTourBooking = async (formData: FormData) => {
  const userId = formData.get("userId") as string;
  const tourId = formData.get("tourId") as string;
  const dateBooked = formData.get('dateBooked') as string;
  const timeSlotBooked = formData.get('timeSlotBooked') as string;

  const data = {
      userId: userId,
      tourId: new ObjectId(tourId),
      dateBooked,
      timeSlotBooked,
      dateOfBooking: new Date().toLocaleDateString(),
      timeOfBooking: new Date().toLocaleTimeString(),
      bookingStatus: "pending"
  };

  if (!dbConnection) await init();

  try {
      const collection = await database.collection("bookings");

      if (!collection || !database) {
          return { error: "Failed to connect to collection BOOKINGS!!" };
      }

      const selectedDateTime = new Date(`${dateBooked}T${timeSlotBooked}`);
      const currentDateTime = new Date();

      if (selectedDateTime <= currentDateTime) {
          return { error: "Cannot book for a past or current time." };
      }

      const existingBooking = await collection.findOne({
          dateBooked,
          timeSlotBooked
      });

      if (existingBooking) {
          return { error: "This time slot is already booked. Please choose another time." };
      }
      
      const userBookingOnSameDay = await collection.findOne({
          userId,
          dateBooked
      });

      if (userBookingOnSameDay) {
          return { error: "You have already made a booking for today. Multiple bookings on the same day are not allowed." };
      }

      const newBooking = await collection.insertOne(data);
      revalidatePath('/dashboard/mybookings');
      return { bookingId: newBooking.insertedId };
  } catch (error: any) {
      console.log("An error occurred saving new booking:", error.message);
      return { error: error.message };
  }
};


export const getTourBookedSlots = async (tourId: string, date: string) => {
  if (!dbConnection) await init();

  try {
      const collection = await database?.collection("bookings");

      if (!database || !collection) {
          console.log("Failed to connect to collection..");
          return { error: "Failed to connect to collection" };
      }

      const bookings = await collection
          .find({ tourId: new ObjectId(tourId), dateBooked: date })
          .toArray();

      const bookedSlots = bookings.map((booking: { timeSlotBooked: any; }) => booking.timeSlotBooked);
      return bookedSlots;

  } catch (error: any) {
      console.log("GET BOOKED SLOTS:", error.message);
      return { "error": error.message };
  }
};


export const getAllBookings = async () => {
  try {
      if (!dbConnection) await init();

      const collection = database.collection("bookings");
      if (!collection) {
          throw new Error("Failed to connect to bookings collection");
      }

      const bookings = await collection.aggregate([
          {
              $lookup: {
                  from: "users",
                  localField: "userId",
                  foreignField: "_id",
                  as: "user"
              }
          },
          {
              $lookup: {
                  from: "toures",
                  localField: "tourId",
                  foreignField: "_id",
                  as: "tour"
              }
          },
          {
              $project: {
                  _id: 1,
                  dateBooked: 1,
                  timeSlotBooked: 1,
                  dateOfBooking: 1,
                  timeOfBooking: 1,
                  bookingStatus: 1,
                  name: { $arrayElemAt: ["$user.firstName", 0] },
                  tourName: { $arrayElemAt: ["$tour.name", 0] }
              }
          }
      ]).toArray();

      console.log("Bookings after lookup and projection:", bookings);

      return bookings;
  } catch (error: any) {
      console.error("An error occurred while fetching bookings:", error.message);
      return { error: error.message };
  }
};


export const getBookingsCountByTodayDate = async () => {
  try {
    if (!dbConnection) await init();

    const collection = database.collection("bookings");
    if (!collection) {
      throw new Error("Failed to connect to bookings collection");
    }

    const currentDate = new Date().toLocaleDateString();

    const bookingsCount = await collection
      .aggregate([
        {
          $match: {
            dateBooked: currentDate
          }
        },
        {
          $count: "count"
        }
      ])
      .toArray();

    if (bookingsCount.length > 0) {
      return bookingsCount[0].count; 
    } else {
      return 0; 
    }
  } catch (error: any) {
    console.error("An error occurred while fetching bookings count for today:", error.message);
    return { error: error.message };
  }
};

export const deleteOneBooking = async (_id: string) => {
  if (!dbConnection) await init();

  try {

    const collection = await database?.collection("bookings");

    if (!database || !collection) {
      console.log("Failed to connect to collection..");
      return;
    }

    const deleted = await collection
      .deleteOne({ "_id": new ObjectId(_id) });
    revalidatePath('/dashboard/bookings');
    return deleted;
  } catch (error: any) {
    console.log("An error occured...", error.message);
    return { error: error.message };
  }
};









