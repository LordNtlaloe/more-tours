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
                        { icon: FaGlobe, title: "Experience", description: "An excellent reputation for personal services, quality and value through extensive research and a comprehensive database backed up by ten years of experience in the travel industry. Our agents travel to the places they sell on a regular basis." },
                        { icon: FaHotel, title: "Quality", description: "Professional customer oriented consultation providing hassle free travel. Email capabilities for convenience and prompt booking and information. Creative but persistent approach to search for the most appropriate travel arrangements and identifying the best possible value." },
                        { icon: FaUser, title: "Value", description: "With our “Know How”, and as a sales agent for almost all major international airlines, we do not only offer competitive prices to our customer, but we are also able to pass on very competitive prices and a maximum opportunity for choices and flexibility we even offer a stress free luggage arrangement for our clients." },
                    ].map((service, index) => (
                        <div key={index} className="lg:w-3/12 px-2 sm:w-6/12 mb-6 flex">
                            <div className="bg-white rounded-lg shadow-lg p-6 flex flex-col justify-between transition duration-300 ease-in-out hover:shadow-xl h-full">
                                <div>
                                    <div className="text-blue-500 mb-4 text-4xl">
                                        <service.icon />
                                    </div>
                                    <h5 className="text-xl font-semibold text-gray-800 mb-3">{service.title}</h5>
                                    <p className="text-gray-600">{service.description}</p>
                                </div>
                                <div className="mt-auto">
                                    <a href="/services" className="text-blue-600 font-semibold hover:underline">Learn More</a>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
