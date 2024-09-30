"use client"
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';
import Image from 'next/image'
import { register } from "swiper/element/bundle"
import { CiLocationOn } from "react-icons/ci"
import { FaBed, FaWifi } from "react-icons/fa"
import React, { useRef, useState } from 'react'
import { AiFillStar } from 'react-icons/ai'
import { format } from 'currency-formatter'
import BookModal from '@/components/book-modal/BookModal'
import { useQuery } from '@tanstack/react-query'
import { getListingById } from './service'
import { ClipLoader } from 'react-spinners'
import Reviews from './Reviews'
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';


register()

interface HotelDetailsProps {
    params: {
        id: string;
    };
}

const HotelDetails: React.FC<HotelDetailsProps> = ({ params }) => {
    const { id } = params
    const [showModal, setShowModal] = useState(false)
    const swiperElRef = useRef<HTMLDivElement>(null)

    const { data: listing, isFetching } = useQuery({
        queryKey: ["listings", { id }],
        queryFn: () => getListingById(id),
    })

    const handleShowModal = () => setShowModal(true)
    const handleHideModal = () => setShowModal(false)

    if (isFetching) {
        return (
            <div className="mt-20 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-screen">
                <ClipLoader color={"#123abc"} />
            </div>
        )
    }

    return (
        <div className={`min-h-screen w-full mt-24 ${showModal && "overflow-hidden"}`}>
            {showModal && listing && (
                <BookModal
                    listing={listing}
                    handleHideModal={handleHideModal}
                />
            )}
            <div className="h-full w-3/4 mx-auto">
                <div>
                    <div className="w-full h-[750px] overflow-hidden mx-auto">
                        <div className="w-full h-full">
                            <Swiper
                                slidesPerView={1}
                                modules={[Navigation, Pagination, Scrollbar, A11y]}
                                navigation
                                pagination={{ clickable: true }}
                                scrollbar={{ draggable: true }}
                                onSwiper={(swiper) => console.log(swiper)}
                                onSlideChange={() => console.log('slide change')}
                            >
                                {listing?.imageUrls?.map((imageUrl: string) => (
                                    <SwiperSlide key={imageUrl}>
                                        <Image
                                            className="h-[750px] w-full object-cover rounded-lg"
                                            height="750"
                                            width="750"
                                            src={imageUrl}
                                            blurDataURL={listing.blurredImage}
                                            placeholder="blur"
                                            alt="Hotel"
                                        />
                                    </SwiperSlide>
                                ))}
                            </Swiper>
                        </div>
                    </div>
                    <div className="mt-12 px-6 w-full flex items-center justify-between">
                        <h2 className="font-bold text-4xl">
                            {listing?.name}
                        </h2>
                        <div>
                            <span className="p-2 px-4 text-[22px] rounded-full bg-blue-600 text-white flex items-center gap-2">
                                <AiFillStar color="white" />
                                <span className="text-white">
                                    {listing?.avgRating}
                                </span>
                            </span>
                            <span>
                                {listing?.reviews?.length} reviews
                            </span>
                        </div>
                    </div>
                    <div className="mt-16 px-6 flex items-center gap-8">
                        <span className="flex items-center gap-2">
                            <CiLocationOn />
                            {listing?.location}
                        </span>
                        <span className="flex items-center gap-2">
                            {format(listing?.pricePerNight, { locale: "en-US" })}/night
                        </span>
                        <span className="flex items-center gap-2">
                            {listing?.beds} <FaBed />
                        </span>
                        {listing?.hasFreeWifi && (
                            <span className="flex items-center gap-2">
                                Free <FaWifi />
                            </span>
                        )}
                    </div>
                    <div className="mt-16 px-6 w-full flex items-end justify-between">
                        <p className="text-xl max-w-xl text-slate-700">
                            {listing?.desc}
                        </p>
                        <button
                            onClick={handleShowModal}
                            className="cursor-pointer rounded-lg py-2 px-6 text-xl text-white bg-blue-500"
                        >
                            Book
                        </button>
                    </div>
                </div>
                <div className="border-t-2 border-white-800 px-6 mt-16 mx-auto" >
                    <h1 className="mt-16 text-3xl font-bold">
                        Reviews
                    </h1>
                    <Reviews
                        id={id}
                    />
                </div>
            </div>
        </div>
    )
}