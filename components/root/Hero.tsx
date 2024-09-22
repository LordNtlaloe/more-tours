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
        <div className="container mx-auto max-w-full p-0">
            <Swiper
                modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
                spaceBetween={0}
                slidesPerView={1}
                navigation
                pagination={{ clickable: true }}
                scrollbar={{ draggable: true }}
                autoplay={{
                    delay: 4000,
                    disableOnInteraction: false,
                }}
                loop={true}
            >
                {[1, 2].map((num) => (
                    <SwiperSlide key={num}>
                        <div className="relative">
                            <img className="w-full h-[80vh] object-cover" src={`/assets/img/carousel-${num}.jpg`} alt={`Carousel Image ${num}`} />
                            <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-transparent"></div>
                            <div className="absolute inset-0 flex flex-col items-center justify-center z-10 text-center">
                                <div className="p-6 max-w-3xl mx-auto">
                                    <h4 className="text-white uppercase text-lg md:text-xl mb-4">Tours & Travel</h4>
                                    <h1 className="text-4xl md:text-6xl text-white font-bold leading-tight md:mb-6">Discover Amazing Places With Us</h1>
                                    <a href="#" className="inline-block mt-4 text-center text-lg font-semibold rounded-full py-3 px-8 bg-blue-600 text-white hover:bg-blue-700 transition-all shadow-lg hover:shadow-xl">
                                        Book Now
                                    </a>
                                </div>
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
                {/* Add more slides as needed */}
            </Swiper>
        </div>
    );
};

export default Hero;
