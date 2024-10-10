"use client"

import React, { useEffect, useState } from 'react';
import { Calendar } from "@/components/ui/calendar";
import { Button } from '@/components/ui/button';
import { SheetClose, SheetFooter } from '@/components/ui/sheet';
import { showToastMessage } from '@/lib/generalFunctions';
import { getTourBookedSlots, saveNewTourBooking } from '@/app/_actions/_tourBookingActions';
import { useClerk } from '@clerk/nextjs';
import { sendMail } from '@/app/_email/_mail';

const UpdateBookings = ({ _id }: { _id: string }) => {
    const [date, setDate] = useState<Date | undefined>(new Date());
    const [timeSlot, setTimeSlot] = useState<string[]>([]);
    const [selectedTime, setSelectedTime] = useState<string>('8:00');
    const [bookedSlots, setBookedSlots] = useState<string[]>([]);
    const { user } = useClerk();
    const userId = user?.id;
    const userEmail = user?.primaryEmailAddress?.emailAddress;

    useEffect(() => {
        if (date) {
          getTime();
          getBookedSlots();
        }
    }, [date]);

    const getBookedSlots = async () => {
        if (date) {
            const formattedDate = date.toISOString().split('T')[0];
            const bookedSlotsResponse = await getTourBookedSlots(_id, formattedDate);
            if (bookedSlotsResponse && !bookedSlotsResponse.error) {
                setBookedSlots(bookedSlotsResponse);
            }
        }
    };

    const saveTourBooking = async () => {
        if (!date || !selectedTime || !userId || !userEmail) return;

        const formData = new FormData();
        formData.append("tourId", _id);
        formData.append("userId", userId);
        formData.append("dateBooked", date.toISOString().split('T')[0]);
        formData.append("timeSlotBooked", selectedTime);

        const result = await saveNewTourBooking(formData);
        if (result.error) {
            showToastMessage("error", result.error);
        } else {
            showToastMessage("success", "Your booking has been confirmed.");
            await sendMail({
                to: userEmail,
                name: user?.firstName || 'User',
                subject: 'Booking Confirmation',
                body: `<p>Dear ${user?.firstName},</p><p>Your booking for ${date.toLocaleDateString()} at ${selectedTime} has been confirmed.</p><p>Thank you!</p>`
            });
            getBookedSlots();
        }
    };

    const getTime = () => {
        const timeList: string[] = [];
        for (let i = 8; i < 18; i++) {
            timeList.push(`${i}:00`);
            timeList.push(`${i}:30`);
        }
        setTimeSlot(timeList);
    };

    const handleTimeSlotClick = (slot: string) => {
        if (bookedSlots.includes(slot)) {
            showToastMessage("error", "This time slot is already booked.");
        } else {
            setSelectedTime(slot);
        }
    };

    const isPastDate = (date: Date) => {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        return date < today;
    };

    return (
        <main>
            {date !== undefined && (
            <form onSubmit={(e) => { e.preventDefault(); saveTourBooking(); }}>
                <h2 className='mt-4 pb-2 mb-4 font-semibold'>
                    Select Date: <span className='bg-primary px-4 py-1 rounded'>{date && date.toLocaleDateString()}</span>
                </h2>
                <div>
                    <Calendar
                        mode="single"
                        selected={date}
                        onSelect={setDate}
                        className="rounded border"
                        disabled={isPastDate}
                    />
                </div>

                <h2 className='mt-4 pb-2 border-b mb-4 font-semibold'>
                    Select Time Slot: <span className='bg-primary px-4 py-1 rounded'>{selectedTime}</span>
                </h2>
                <div className='grid grid-cols-3 gap-3'>
                    {timeSlot.map((slot: string, index: number) => (
                        <Button
                            key={index}
                            className={`rounded-full p-2 px-3 border-2 hover:bg-primary bg-white border-primary hover:text-white ${bookedSlots.includes(slot) && 'bg-gray-400 cursor-not-allowed'}`}
                            disabled={bookedSlots.includes(slot)}
                            onClick={() => handleTimeSlotClick(slot)}
                        >
                            {slot}
                        </Button>
                    ))}
                </div>

                <SheetFooter>
                    <SheetClose>
                        <div className="grid grid-cols-2 gap-3 p-4 border-t mt-3 w-full justify-end bg-primary/30">
                        <Button
                                type='submit'
                                disabled={!selectedTime || bookedSlots.includes(selectedTime) || (date && isPastDate(date))}
                                className="bg-blue-700 text-white rounded py-1 hover:bg-blue-500"
                            >
                                Book
                            </Button>

                        <Button
                                type='button'
                                className="bg-red-500 text-white rounded py-1 hover:bg-red-800"
                                onClick={() => setSelectedTime('')}
                            >
                                Close
                            </Button>
                        </div>
                    </SheetClose>
                </SheetFooter>
            </form>
            )}
        </main>
    )
};

export default UpdateBookings;