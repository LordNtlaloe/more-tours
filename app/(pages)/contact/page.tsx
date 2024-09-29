import React from 'react';
import { AiOutlinePhone, AiOutlineMail } from 'react-icons/ai';
import { BiHome } from 'react-icons/bi';

export default function page() {
    return (
        <div>
            <form action="https://fabform.io/f/xxxxx" method="post">
                <section className="py-24">
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <div className="grid lg:grid-cols-2 grid-cols-1 gap-4">
                            <div className="lg:mb-0 mb-10">
                                <div className="group w-full h-full">
                                    <div className="relative h-full">
                                        <img 
                                            src="https://pagedone.io/asset/uploads/1696488602.png" 
                                            alt="Contact Us" 
                                            className="w-full h-full lg:rounded-l-2xl rounded-2xl object-cover"
                                        />
                                        <h1 className="font-manrope text-white text-4xl font-bold leading-10 absolute top-11 left-11">Contact Us</h1>
                                        <div className="absolute bottom-0 w-full lg:p-11 p-5">
                                            <div className="bg-white rounded-lg p-6 block">
                                                <a href="tel:4706011911" className="flex items-center mb-6">
                                                    <AiOutlinePhone className="w-6 h-6 text-[#7FBF3F]" />
                                                    <h5 className="text-black text-base font-normal leading-6 ml-5">470-601-1911</h5>
                                                </a>
                                                <a href="https://veilmail.io/irish-geoff" className="flex items-center mb-6">
                                                    <AiOutlineMail className="w-6 h-6 text-[#7FBF3F]" />
                                                    <h5 className="text-black text-base font-normal leading-6 ml-5">https://veilmail.io/irish-geoff</h5>
                                                </a>
                                                <a href="javascript:;" className="flex items-center">
                                                    <BiHome className="w-6 h-6 text-[#7FBF3F]" />
                                                    <h5 className="text-black text-base font-normal leading-6 ml-5">654 Sycamore Avenue, Meadowville, WA 76543</h5>
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-gray-50 p-5 lg:p-11 lg:rounded-r-2xl rounded-2xl">
                                <h2 className="text-[#7FBF3F] font-manrope text-4xl font-semibold leading-10 mb-11">Send Us A Message</h2>
                                <input type="text" className="w-full h-12 text-gray-600 placeholder-gray-400 shadow-sm bg-transparent text-lg font-normal leading-7 rounded-md border border-gray-200 focus:outline-none pl-4 mb-10" placeholder="Name" name="name" />
                                <input type="email" className="w-full h-12 text-gray-600 placeholder-gray-400 shadow-sm bg-transparent text-lg font-normal leading-7 rounded-md border border-gray-200 focus:outline-none pl-4 mb-10" placeholder="Email" name="email" />
                                <input type="text" className="w-full h-12 text-gray-600 placeholder-gray-400 shadow-sm bg-transparent text-lg font-normal leading-7 rounded-md border border-gray-200 focus:outline-none pl-4 mb-10" placeholder="Phone" name="phone" />
                                <div className="mb-10">
                                    <h4 className="text-gray-500 text-lg font-normal leading-7 mb-4">Preferred method of communication</h4>
                                    <div className="flex">
                                        <div className="flex items-center mr-11">
                                            <input id="radio-group-1" type="radio" name="radio-group" className="hidden" />
                                            <label htmlFor="radio-group-1" className="flex items-center cursor-pointer text-gray-500 text-base font-normal leading-6">
                                                <span className="border border-gray-300 rounded-md mr-2 w-4 h-4 ml-2"></span> Email
                                            </label>
                                        </div>
                                        <div className="flex items-center">
                                            <input id="radio-group-2" type="radio" name="radio-group" className="hidden" />
                                            <label htmlFor="radio-group-2" className="flex items-center cursor-pointer text-gray-500 text-base font-normal leading-6">
                                                <span className="border border-gray-300 rounded-md mr-2 w-4 h-4 ml-2"></span> Phone
                                            </label>
                                        </div>
                                    </div>
                                </div>
                                <input type="text" className="w-full h-12 text-gray-600 placeholder-gray-400 bg-transparent text-lg shadow-sm font-normal leading-7 rounded-md border border-gray-200 focus:outline-none pl-4 mb-10" placeholder="Message" name="message" />
                                <button className="w-full h-12 text-white text-base font-semibold leading-6 rounded-md transition-all duration-700 hover:bg-indigo-800 bg-[#7FBF3F] shadow-sm">Send</button>
                            </div>
                        </div>
                    </div>
                </section>
            </form>
        </div>
    );
}
