import React, { useEffect, useState } from 'react';
import { Calendar } from "@/components/ui/calendar";
import { Button } from '@/components/ui/button';
import { SheetClose, SheetFooter } from '@/components/ui/sheet';
import { showToastMessage } from '@/lib/generalFunctions';
import { useClerk } from '@clerk/nextjs';
import { sendMail } from '@/app/_email/_mail';
import { saveNewTourBooking } from '@/app/_actions/_tourBookingActions';

const TourBookingForm = ({ id, tourPrice, tourName }: { id: string, tourPrice: number, tourName: string }) => {
    const [date, setDate] = useState<Date | undefined>(new Date());
    const [numberOfPeople, setNumberOfPeople] = useState<number>(1);
    const [totalPrice, setTotalPrice] = useState<number>(tourPrice); // Initialize with tour price
    const [bookedDates, setBookedDates] = useState<string[]>([]);
    const { user } = useClerk();
    const userId = user?.id;
    const userEmail = user?.primaryEmailAddress?.emailAddress;
    console.log(userEmail);
    useEffect(() => {
        if (date) {
            getBookedDates();
        }
    }, [date]);

    useEffect(() => {
        calculateTotalPrice(); // Recalculate total price whenever number of people changes
    }, [numberOfPeople]);

    const getBookedDates = () => {
        const storedBookings = JSON.parse(localStorage.getItem('bookings') || '[]');
        const formattedDate = date?.toISOString().split('T')[0];  // Extract date part
        const bookedSlots = storedBookings.filter((booking: any) => booking.dateBooked === formattedDate);
        const dates = bookedSlots.map((booking: any) => booking.dateBooked);
        setBookedDates(dates);
    };

    const calculateTotalPrice = () => {
        if (numberOfPeople <= 0) return;

        let price = tourPrice; // Start with full tour price
        if (numberOfPeople > 1) {
            price += (numberOfPeople - 1) * (tourPrice / 2); // Half price for additional people
        }
        setTotalPrice(price);
    };

    const saveBooking = async () => {
        if (!date || numberOfPeople <= 0 || !userId || !userEmail) return;
    
        const formData = new FormData();
        const formattedDate = date.toISOString();  // Convert to full ISO string
        formData.append("userId", userId);
        formData.append("tourId", id);
        formData.append("bookingDate", formattedDate);  
        formData.append("numberOfPeople", numberOfPeople.toString());
        formData.append("totalPrice", totalPrice.toString());
    
        const result = await saveNewTourBooking(formData);
        
        if (result.error) {
            showToastMessage("error", result.error);
        } else {
            try {
                
                await sendMail({
                    to: userEmail,
                    name: user?.firstName || 'User',
                    subject: 'Booking Confirmation',
                    body: `<p>Dear ${user?.firstName},</p>
                            <p>Your booking for ${tourName} on ${date?.toLocaleDateString()} for ${numberOfPeople} people has been confirmed.</p>
                            <p>Total Price: $${totalPrice.toFixed(2)}</p>
                            <p>Thank you!</p>`,
                });
            } catch (error) {
                console.error("Error sending confirmation email:", error);
                showToastMessage("error", "Error sending confirmation email.");
            }
            showToastMessage("success", "Your booking has been confirmed.");
            getBookedDates();
        }
    };
    
    const isPastDate = (date: Date) => {
        const today = new Date();
        today.setHours(0, 0, 0, 0);  // Reset time to midnight
        return date < today;
    };

    return (
        <main>
            {date !== undefined && (
                <form onSubmit={(e) => { e.preventDefault(); saveBooking(); }}>
                    <h2 className='mt-4 pb-2 mb-4 font-semibold'>
                        Select Date: <span className='bg-primary px-4 py-1 rounded'>{date.toLocaleDateString()}</span>
                    </h2>
                    <div>
                        <Calendar
                            mode="single"
                            selected={date}
                            onSelect={(selectedDate) => selectedDate && setDate(selectedDate)}
                            className="rounded border"
                            disabled={(day) => isPastDate(day)}
                        />
                    </div>

                    <h2 className='mt-4 pb-2 border-b mb-4 font-semibold'>
                        Number of People: 
                        <span className='bg-primary px-4 py-1 rounded'>
                            {numberOfPeople}
                        </span>
                    </h2>
                    <div className='mb-4'>
                        <input
                            type="number"
                            value={numberOfPeople}
                            min={1}
                            onChange={(e) => setNumberOfPeople(Number(e.target.value))}
                            className="border rounded px-4 py-2 w-full"
                            placeholder="Enter number of people"
                        />
                    </div>

                    <h2 className='mt-4 pb-2 border-b mb-4 font-semibold'>
                        Total Price: <span className='bg-primary px-4 py-1 rounded'>${totalPrice.toFixed(2)}</span>
                    </h2>

                    <SheetFooter>
                        <SheetClose>
                            <div className="grid grid-cols-2 gap-3 p-4 border-t mt-3 w-full justify-end bg-primary/30">
                                <Button
                                    type='submit'
                                    disabled={isPastDate(date) || numberOfPeople <= 0}
                                    className="bg-blue-700 text-white rounded py-1 hover:bg-blue-500"
                                >
                                    Book
                                </Button>
                                <Button
                                    type='button'
                                    className="bg-red-500 text-white rounded py-1 hover:bg-red-800"
                                    onClick={() => {
                                        setNumberOfPeople(1);
                                        setTotalPrice(tourPrice);
                                    }}
                                >
                                    Close
                                </Button>
                            </div>
                        </SheetClose>
                    </SheetFooter>
                </form>
            )}
        </main>
    );
};

export default TourBookingForm;
