"use client";

import React from 'react';
import { FaGlobe, FaHotel, FaUser, FaCog } from 'react-icons/fa'; // Importing React Icons

export default function ServicesSection() {
    return (
        <div className="py-10 bg-gray-100">
            <div className="container mx-auto px-4">
                <div className="text-center mb-8" data-wow-delay="0.1s">
                    <h6 className="text-blue-500 text-lg uppercase tracking-wide mb-2">Services</h6>
                    <h1 className="text-4xl font-bold text-gray-800">Our Services</h1>
                </div>
                <div className="flex flex-wrap -mx-2">
                    {[
                        { icon: FaGlobe, title: "WorldWide Tours", description: "Explore the world with our exclusive tours." },
                        { icon: FaHotel, title: "Hotel Reservation", description: "Book the best hotels with ease." },
                        { icon: FaUser, title: "Travel Guides", description: "Expert guides to make your trip memorable." },
                        { icon: FaCog, title: "Event Management", description: "End-to-end event management services." },
                        { icon: FaGlobe, title: "WorldWide Tours", description: "Explore the world with our exclusive tours." },
                        { icon: FaHotel, title: "Hotel Reservation", description: "Book the best hotels with ease." },
                        { icon: FaUser, title: "Travel Guides", description: "Expert guides to make your trip memorable." },
                        { icon: FaCog, title: "Event Management", description: "End-to-end event management services." },
                    ].map((service, index) => (
                        <div key={index} className="lg:w-3/12 px-2 sm:w-6/12 mb-6">
                            <div className="bg-white rounded-lg shadow-lg p-6 transition duration-300 ease-in-out hover:shadow-xl">
                                <div className="text-blue-500 mb-4 text-4xl">
                                    <service.icon />
                                </div>
                                <h5 className="text-xl font-semibold text-gray-800 mb-3">{service.title}</h5>
                                <p className="text-gray-600">{service.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
