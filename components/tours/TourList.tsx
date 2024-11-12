import React from 'react';
import Image from 'next/image';
import Loading from '@/app/loading';
import BookAppointmentButton from './BookTourButton';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '../ui/sheet';
import TourBookingForm from '../booking/TourBookingForm';

interface Tour {
    id: number;
    title: string;
    description: string;
    price: number;
    image: string;
    destination: { name: string };
    category: { name: string };
}

type TourProps = {
    tourList: Tour[];
    title: string;
    loading: boolean;
};

export default function TourList({ tourList, title, loading }: TourProps) {
    return (
        <div className="py-10 bg-gray-100">
            <div className="container mx-auto px-4">
                <div className="text-center mb-8">
                    <h6 className="section-title text-blue-600 text-lg font-semibold">{title}</h6>
                    <h1 className="text-3xl font-bold mb-4">Awesome Packages</h1>
                </div>
                <div className="flex flex-wrap -mx-4 justify-center">
                    {loading ? (
                        <Loading />
                    ) : (
                        tourList.length > 0 ? (
                            tourList.map((tour) => (
                                <div key={tour.id} className="lg:w-1/3 px-4 mb-8">
                                    <div className="bg-white rounded-lg shadow-lg overflow-hidden transition-transform transform hover:scale-105">
                                        <Image
                                            className="w-full h-64 object-cover"
                                            src={tour.image}
                                            alt={tour.title}
                                            width={500}
                                            height={300}
                                        />
                                        <div className="p-6">
                                            <h3 className="text-lg font-semibold mb-2">{tour.title}</h3>
                                            <div className="flex justify-between mb-4">
                                                <small className="flex items-center">
                                                    <i className="fa fa-map-marker-alt text-blue-600 mr-1"></i>
                                                    {tour.destination ? tour.destination.name : 'Unknown Destination'}
                                                </small>
                                                <small className="flex items-center">
                                                    <i className="fa fa-calendar-alt text-blue-600 mr-1"></i>
                                                    3 days
                                                </small>
                                                <small className="flex items-center">
                                                    <i className="fa fa-user text-blue-600 mr-1"></i>
                                                    {tour.category ? tour.category.name : 'Unknown Category'}
                                                </small>
                                            </div>
                                            <h4 className="text-xl font-bold text-blue-600 mb-2">${tour.price.toFixed(2)}</h4>
                                            <div className="mb-3">
                                                {[...Array(5)].map((_, index) => (
                                                    <small key={index} className="fa fa-star text-blue-600"></small>
                                                ))}
                                            </div>
                                            <p className="text-gray-700 mb-4">{tour.description}</p>
                                            <div className="flex justify-between items-center">
                                                <a href={`/tours/${tour.id}`} className="bg-blue-600 text-white py-2 px-4 rounded transition duration-200 hover:bg-blue-700 w-auto">Read More...</a>
                                                <Sheet>
                                                    <SheetTrigger className="w-auto my-3">
                                                        <BookAppointmentButton tour={tour} />
                                                    </SheetTrigger>
                                                    <SheetContent className="bg-white overflow-auto">
                                                        <SheetHeader>
                                                            <SheetTitle className="bg-primary/30 p-3 text-center mt-8">Select Date and Time to book Service With Supplier</SheetTitle>
                                                            <SheetDescription>
                                                                <TourBookingForm id={tour.id.toString()} tourPrice={tour.price} tourName={tour.title} />
                                                            </SheetDescription>
                                                        </SheetHeader>

                                                    </SheetContent>
                                                </Sheet>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p className="text-center text-gray-700">No tours available at the moment.</p>
                        )
                    )}
                </div>
            </div>
        </div>
    );
}
