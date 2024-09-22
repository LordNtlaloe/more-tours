"use client";
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css'; // Import Swiper styles
import { getAllCategories } from '@/app/_actions/_categoryActions';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

export default function CategoryCarousel() {
    const [categoriesList, setCategoriesList] = useState([]);

    useEffect(() => {
        getCategoriesList();
    }, []);

    const getCategoriesList = async () => {
        const categories = await getAllCategories();
        setCategoriesList(categories);
    };

    return (
        <div className="py-10 bg-gray-100 w-full relative px-4 md:px-6 lg:px-8">
            <div className="text-center mb-8" data-wow-delay="0.1s">
                <h6 className="text-blue-500 text-lg uppercase tracking-wide mb-2">Select Tour By Category</h6>
                <h1 className="text-4xl font-bold text-gray-800">Tour Categories</h1>
            </div>
            <Swiper
                modules={[Autoplay, Pagination, Navigation]}
                slidesPerView={2} // Default to 2 items on small screens
                spaceBetween={0} // Spacing between slides
                slidesPerGroup={2} // Slide 2 items at a time on small screens
                loop={true} // Loop through the slides
                autoplay={{
                    delay: 2500,
                    disableOnInteraction: false,
                }}
                navigation={false} // Enable navigation
                pagination={false} // Enable pagination
                breakpoints={{
                    // Breakpoints for responsive design
                    640: {
                        slidesPerView: 3, // 3 items on small screens
                        slidesPerGroup: 3,
                    },
                    768: {
                        slidesPerView: 4, // 4 items on medium screens
                        slidesPerGroup: 4,
                    },
                    1024: {
                        slidesPerView: 5, // 5 items on large screens
                        slidesPerGroup: 5,
                    },
                }}
                className="mySwiper"
            >
                {categoriesList.map((category: any) => (
                    <SwiperSlide key={category._id} className="flex flex-col items-center">
                        <div className="flex flex-col items-center">
                            <div className="relative w-48 h-48 md:w-36 md:h-36 lg:w-40 lg:h-40 mb-2"> {/* Increased sizes */}
                                <Image
                                    src={category.icon}
                                    layout="fill"
                                    objectFit="cover"
                                    alt={category.name}
                                    className="rounded-xl"
                                />
                            </div>
                            <Link href={'/category/' + category.name} className="text-xs md:text-sm lg:text-md text-center font-semibold text-violet-700">
                                {category.name}
                            </Link>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
}
