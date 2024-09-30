import Image from 'next/image';
import React from 'react'
import { FaArrowRight } from 'react-icons/fa';

export default function AboutSection() {
    return (
        <div className="container mx-auto py-5 text-[#14141F]">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                <div className="relative min-h-[400px] wow fadeInUp" data-wow-delay="0.1s">
                    <Image className="absolute inset-0 w-full h-full object-cover" width={250} height={250} src="/assets/img/blog/blog_2_2.jpg" alt="" />
                </div>
                <div className="wow fadeInUp" data-wow-delay="0.3s">
                    <h6 className="section-title text-start text-[#7FBF3F] bg-white pe-3 relative inline-block uppercase before:absolute before:content-[''] before:w-[calc(100% before:+ before:80px)] before:h-[2px] before:top-[4px] before:-left-[40px] before:bg-[#7FBF3F]
                        after:absolute after:content-[''] after:w-[calc(100% after:+ after:120px)] after:h-[2px] after:bottom-[5px] after:-left-[60px] after:bg-[#7FBF3F]
                        before:w-[calc(100% before:+ before:40px)] before:left-[0] after:w-[calc(100% after:+ after:60px)] after:left-[0]">
                        About Us
                    </h6>
                    <h1 className="mb-4 text-5xl">Welcome to <span className="text-[#7FBF3F]">Tourist</span></h1>
                    <p className="mb-4">Tempor erat elitr rebum at clita. Diam dolor diam ipsum sit. Aliqu diam amet diam et eos. Clita erat ipsum et lorem et sit.</p>
                    <p className="mb-4">Tempor erat elitr rebum at clita. Diam dolor diam ipsum sit. Aliqu diam amet diam et eos. Clita erat ipsum et lorem et sit, sed stet lorem sit clita duo justo magna dolore erat amet.</p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                        <div className='flex flex-col'>
                            <p className="mb-0 flex flex-row">
                                <FaArrowRight className="fa fa-arrow-right text-primary mr-2"/>First Class Flights
                            </p>
                        </div>
                        <div className='flex flex-col'>
                            <p className="mb-0 flex flex-row"><FaArrowRight className="fa fa-arrow-right text-primary mr-2"/>Handpicked Hotels</p>
                        </div>
                        <div className='flex flex-row'>
                            <p className="mb-0 flex flex-row"><FaArrowRight className="fa fa-arrow-right text-primary mr-2"/>5 Star Accommodations</p>
                        </div>
                        <div className='flex flex-row'>
                            <p className="mb-0 flex flex-row"><FaArrowRight className="fa fa-arrow-right text-primary mr-2"/>Latest Model Vehicles</p>
                        </div>
                        <div className='flex flex-row'>
                            <p className="mb-0 flex flex-row"><FaArrowRight className="fa fa-arrow-right text-primary mr-2"/>150 Premium City Tours</p>
                        </div>
                        <div className='flex flex-row'>
                            <p className="mb-0 flex flex-row"><FaArrowRight className="fa fa-arrow-right text-primary mr-2"/>24/7 Service</p>
                        </div>
                    </div>
                    <a className="btn btn-primary py-3 px-5 mt-2" href="">Read More</a>
                </div>
            </div>
        </div>
    )
}
