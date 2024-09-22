"use client";
// Import Swiper core and required modules
import { Navigation, Pagination, Scrollbar, A11y, Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

const Hero = () => {
    return (
        <div className="container mx-auto sm:px-0 max-w-full p-0">
            <Swiper
                modules={[Navigation, Pagination, Scrollbar, Autoplay]}
                spaceBetween={0}
                slidesPerView={1}
                navigation
                pagination={{ clickable: true }}
                scrollbar={{ draggable: true }}
                autoplay={{
                    delay: 3000,
                    disableOnInteraction: false,
                }}
                onSwiper={(swiper) => console.log(swiper)}
                onSlideChange={() => console.log('slide change')}
            >
                <SwiperSlide>
                    <div className="relative">
                        <img className="w-full h-auto" src="/assets/img/carousel-1.jpg" alt="Image" />
                        {/* RGB Background Tint Overlay */}
                        <div className="absolute inset-0 bg-[rgba(0,0,0,0.5)]"></div>
                        <div className="absolute inset-0 flex flex-col items-center justify-center z-10">
                            <div className="p-6" style={{ maxWidth: '900px' }}>
                                <h4 className="text-white uppercase md:mb-4">Tours & Travel</h4>
                                <h1 className="text-3xl text-white md:mb-6">Let's Discover The World Together</h1>
                                <a href="#" className="inline-block text-center border font-normal rounded py-1 px-3 leading-normal bg-blue-600 text-white hover:bg-blue-700 md:py-4 md:px-12 mt-2">Book Now</a>
                            </div>
                        </div>
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className="relative">
                        <img className="w-full h-auto" src="/assets/img/carousel-2.jpg" alt="Image" />
                        {/* RGB Background Tint Overlay */}
                        <div className="absolute inset-0 bg-[rgba(0,0,0,0.5)]"></div>
                        <div className="absolute inset-0 flex flex-col items-center justify-center z-10">
                            <div className="p-6" style={{ maxWidth: '900px' }}>
                                <h4 className="text-white uppercase md:mb-4">Tours & Travel</h4>
                                <h1 className="text-3xl text-white md:mb-6">Discover Amazing Places With Us</h1>
                                <a href="#" className="inline-block text-center border font-normal rounded py-1 px-3 leading-normal bg-blue-600 text-white hover:bg-blue-700 md:py-4 md:px-12 mt-2">Book Now</a>
                            </div>
                        </div>
                    </div>
                </SwiperSlide>
                {/* Add more slides as needed */}
            </Swiper>
        </div>
    );
};

export default Hero;
