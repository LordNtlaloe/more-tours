"use client";

import React from 'react';
import { FaArrowRight } from 'react-icons/fa';
import Image from 'next/image';

const AboutSection = () => {
    return (
        <div className="container-xxl py-10 bg-white">
            <div className="container mx-auto px-4">
                <div className="flex flex-row items-center gap-8">
                    <div className="lg:w-1/2 wow fadeInUp" data-wow-delay="0.1s" style={{ minHeight: '400px' }}>
                        <div className="relative h-full rounded-lg overflow-hidden shadow-lg">
                            <Image 
                                src="/assets/img/about.jpg" // Ensure the path is correct
                                alt="About Us"
                                // layout="fill" 
                                objectFit="cover" // Ensures the image covers the container without distortion
                                quality={100} // Optional: for higher-quality images
                                priority // Optional: to preload important images
                                width={650}
                                height={150}
                            />
                        </div>
                    </div>
                    <div className="lg:w-1/2 wow fadeInUp" data-wow-delay="0.3s">
                        <h6 className="text-blue-600 text-lg mb-3">About Us</h6>
                        <h1 className="text-4xl font-bold mb-6">Welcome to <span className="text-blue-600">Tourist</span></h1>
                        <p className="mb-6 text-gray-600">
                            We offer amazing tours and services to help you explore the world with ease and comfort. 
                            Discover fantastic destinations and enjoy first-class experiences.
                        </p>
                        <div className="grid sm:grid-cols-2 gap-4 mb-6">
                            {[
                                "First Class Flights",
                                "Handpicked Hotels",
                                "5 Star Accommodations",
                                "Latest Model Vehicles",
                                "150 Premium City Tours",
                                "24/7 Service"
                            ].map((item, index) => (
                                <p key={index} className="flex items-center text-gray-700">
                                    <FaArrowRight className="text-blue-600 mr-2" /> {item}
                                </p>
                            ))}
                        </div>
                        <a className="inline-block align-middle text-center border font-normal rounded py-3 px-6 bg-blue-600 text-white hover:bg-blue-700 transition-colors" href="#">Read More</a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AboutSection;
