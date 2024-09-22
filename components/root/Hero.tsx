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
                modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
                spaceBetween={0}
                slidesPerView={1}
                navigation
                pagination={{ clickable: true }}
                scrollbar={{ draggable: true }}
                autoplay={{
                    delay: 4000,  // Carousel will autoplay every 4 seconds
                    disableOnInteraction: false,  // Autoplay will not stop after user interaction
                }}
                loop={true}  // Enables infinite loop for autoplay
                onSwiper={(swiper) => console.log(swiper)}
                onSlideChange={() => console.log('slide change')}
            >
                <SwiperSlide>
                    <div className="relative">
                        <img className="w-full h-[80vh] object-cover" src="/assets/img/carousel-1.jpg" alt="Carousel Image 1" />
                        <div className="absolute inset-0 bg-gradient-to-b from-[rgba(0,0,0,0.7)] to-[rgba(0,0,0,0.3)]"></div>
                        <div className="absolute inset-0 flex flex-col items-center justify-center z-10 text-center">
                            <div className="p-6 max-w-4xl mx-auto">
                                <h4 className="text-white uppercase text-lg md:text-xl mb-4">Tours & Travel</h4>
                                <h1 className="text-4xl md:text-6xl text-white font-bold leading-tight md:mb-6">Let's Discover The World Together</h1>
                                <a href="#" className="inline-block mt-4 text-center text-lg font-semibold rounded-lg py-3 px-6 bg-blue-600 text-white hover:bg-blue-700 transition-all">Book Now</a>
                            </div>
                        </div>
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className="relative">
                        <img className="w-full h-[80vh] object-cover" src="/assets/img/carousel-2.jpg" alt="Carousel Image 2" />
                        <div className="absolute inset-0 bg-gradient-to-b from-[rgba(0,0,0,0.7)] to-[rgba(0,0,0,0.3)]"></div>
                        <div className="absolute inset-0 flex flex-col items-center justify-center z-10 text-center">
                            <div className="p-6 max-w-4xl mx-auto">
                                <h4 className="text-white uppercase text-lg md:text-xl mb-4">Tours & Travel</h4>
                                <h1 className="text-4xl md:text-6xl text-white font-bold leading-tight md:mb-6">Discover Amazing Places With Us</h1>
                                <a href="#" className="inline-block mt-4 text-center text-lg font-semibold rounded-lg py-3 px-6 bg-blue-600 text-white hover:bg-blue-700 transition-all">Book Now</a>
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
