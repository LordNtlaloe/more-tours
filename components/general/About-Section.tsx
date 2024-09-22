"use client";

import React from 'react';
import { FaArrowRight } from 'react-icons/fa';
import Image from 'next/image';

const AboutSection = () => {
    return (
        <div className="container-xxl py-10 bg-white">
            <div className="container mx-auto px-4">
                <div className="flex flex-col lg:flex-row items-center gap-8">
                    <div className="lg:w-1/2 wow fadeInUp" data-wow-delay="0.1s" style={{ minHeight: '400px' }}>
                        <div className="relative h-full rounded-lg overflow-hidden shadow-lg transition-transform transform hover:scale-105">
                            <Image
                                src="/assets/img/about.jpg" // Ensure the path is correct
                                alt="About Us"
                                objectFit="cover"
                                quality={100}
                                priority
                                width={650}
                                height={400}
                            />
                        </div>
                    </div>
                    <div className="lg:w-1/2 wow fadeInUp" data-wow-delay="0.3s">
                        <h6 className="text-blue-600 text-lg mb-3 font-semibold">About Us</h6>
                        <h1 className="text-4xl font-bold mb-6 text-gray-800">Welcome to <span className="text-blue-600">More Tours & Travel</span></h1>
                        <p className="mb-6 text-gray-600 leading-relaxed">
                            More Tours (Pty) Ltd Trading as More Tours as More Tours and Travel is a private Tour Operating Company. The company is 100% owned by two Basotho who are very patriotic and have massive interest in the Tourism Sector, they are very passionate and more interested in promoting The Kingdom of Lesotho and its Tourist attractions to the rest of the world still playing a major role in seeing to it that domestic tourism also grows as well as selling the Beauty and culture of other African Countries.
                        </p>
                        <div className="gap-4 mb-6">
                            <a
                                href=""
                                className="inline-block text-center bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg shadow transition duration-300 transform hover:bg-blue-700 hover:scale-105"
                            >
                                Read More
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AboutSection;
