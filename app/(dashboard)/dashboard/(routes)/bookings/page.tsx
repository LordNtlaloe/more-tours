"use client";

import { useState, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import listPlugin from "@fullcalendar/list";
import { formatDate } from "@fullcalendar/core";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { DateSelectArg, EventClickArg } from "@fullcalendar/core";
import { getAllBookings } from "@/app/_actions/_tourBookingActions";
import { BookingsTable } from "@/components/booking/(BookingsTable)/BookingsTable";
import { columns } from "@/components/booking/(BookingsTable)/columns";

const CalendarPage = () => {
    const [currentBookings, setCurrentBookings] = useState<any[]>([]);
    const [selectedBookings, setSelectedBookings] = useState<any[]>([]);

    useEffect(() => {
        fetchBookings();
    }, []);

    const fetchBookings = async () => {
        try {
            const bookings = await getAllBookings();
            const formattedBookings = bookings.map((booking: any) => ({
                id: booking.id,
                title: booking.tourId, // Assuming this represents the tour name
                start: booking.bookingDate, // Assuming this is the booking date
                allDay: true,
            }));
            setCurrentBookings(formattedBookings);
        } catch (error) {
            console.error("Error fetching bookings:", error);
        }
    };

    const handleDateClick = (selected: DateSelectArg) => {
        const selectedDate = selected.startStr;
        const bookingsOnSelectedDate = currentBookings.filter((booking) => booking.start === selectedDate);
        setSelectedBookings(bookingsOnSelectedDate);
    };

    const handleEventClick = (selected: EventClickArg) => {
        if (window.confirm(`Do you want to remove the event '${selected.event.title}'?`)) {
            selected.event.remove();
        }
    };

    return (
        <div className="p-6">
            <p className="font-bold mb-4">Calendar</p>
            <div className="flex flex-col md:flex-row gap-4">
                {/* Sidebar for Event List */}
                <Card className="w-full md:w-1/4">
                    <CardHeader>
                        <p>Bookings This Month</p>
                    </CardHeader>
                    <CardContent>
                        <ul className="space-y-4">
                            {currentBookings.map((booking: any) => (
                                <li key={booking.id} className="p-4 bg-green-100 rounded-lg shadow-sm">
                                    <p className="font-semibold">{booking.title}</p>
                                    <p className="text-gray-500">
                                        {formatDate(booking.start, {
                                            year: "numeric",
                                            month: "short",
                                            day: "numeric",
                                        })}
                                    </p>
                                    <div className="mt-2">
                                        <p className="font-medium">Tour Details:</p>
                                        <p>Tour Name: {booking.title}</p>
                                        <p>Location: {booking.destination}</p>
                                        <p>Number of People: {booking.numberOfPeople}</p>
                                        <p>Total Price: ${booking.totalPrice}</p>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </CardContent>
                </Card>
                
                {/* Flex container for calendar and bookings table */}
                <div className="flex flex-col w-full md:w-3/4 gap-4">
                    {/* Full Calendar */}
                    <Card className="shadow-slate-200 shadow-sm p-4">
                        <FullCalendar
                            height="75vh"
                            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin, listPlugin]}
                            headerToolbar={{
                                left: "prev,next today",
                                center: "title",
                                right: "dayGridMonth,timeGridWeek,timeGridDay,listMonth",
                            }}
                            initialView="dayGridMonth"
                            editable={true}
                            selectable={true}
                            selectMirror={true}
                            dayMaxEvents={true}
                            select={handleDateClick}
                            eventClick={handleEventClick}
                            events={currentBookings}
                        />
                    </Card>

                    {/* Bookings Table */}
                    <Card className="shadow-slate-200 shadow-sm p-4">
                        <h1 className="mb-3 md:text-2xl font-bold">Registered Categories</h1>
                        <BookingsTable columns={columns} data={currentBookings} />
                    </Card>
                </div>
            </div>

            {/* Display selected bookings */}
            {selectedBookings.length > 0 && (
                <div className="mt-6">
                    <h3 className="text-lg font-bold">Bookings on Selected Date:</h3>
                    <ul className="space-y-4">
                        {selectedBookings.map((booking) => (
                            <li key={booking.id} className="p-4 bg-blue-100 rounded-lg shadow-sm">
                                <p className="font-semibold">{booking.title}</p>
                                <p className="text-gray-500">
                                    {formatDate(booking.start, {
                                        year: "numeric",
                                        month: "short",
                                        day: "numeric",
                                    })}
                                </p>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default CalendarPage;
