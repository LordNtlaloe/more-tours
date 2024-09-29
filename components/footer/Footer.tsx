import React from 'react';
import { FaFacebook, FaLinkedin, FaInstagram, FaTwitter, FaYoutube } from 'react-icons/fa';
import { MdEmail } from 'react-icons/md';
import { AiOutlinePhone } from 'react-icons/ai';
import { BiHome } from 'react-icons/bi';
import Link from 'next/link';
import Image from 'next/image';

export default function Footer() {
    return (
        <div>
            <div className="pt-8 bg-[#14141F] text-[#7FBF3F]">
                <div className="mx-auto w-full max-w-[1166px] px-4 xl:px-0">
                    <div className="flex flex-col justify-between sm:px-[18px] md:flex-row md:px-10">
                        <div className="md:w-[316px]">
                            <h1 className="text-white font-extrabold">
                                <Link href='/' className="flex-shrink-0">
                                    <Image src="/logo.png" width={80} height={80} alt="More Tours And Travel Logo" className="rounded-[5px]" />
                                </Link>
                            </h1>
                            <p className="mt-[18px] text-[15px] font-normal text-white/[80%]">
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos, fugit non. Incidunt dolorum adipisci, tempore asperiores nemo odio facere officiis enim animi placeat eaque nesciunt alias beatae id, at dicta.
                            </p>
                            <div className="mt-[18px] flex gap-4">

                                <a className="hover:scale-110" target="_blank" rel="noopener noreferrer" href="#">
                                    <FaFacebook className="text-white" size={24} />
                                </a>
                                <a className="hover:scale-110" target="_blank" rel="noopener noreferrer" href="#">
                                    <FaLinkedin className="text-white" size={24} />
                                </a>
                                <a className="hover:scale-110" target="_blank" rel="noopener noreferrer" href="#">
                                    <FaInstagram className="text-white" size={24} />
                                </a>
                                <a className="hover:scale-110" target="_blank" rel="noopener noreferrer" href="#">
                                    <FaTwitter className="text-white" size={24} />
                                </a>
                                <a className="hover:scale-110" target="_blank" rel="noopener noreferrer" href="#">
                                    <FaYoutube className="text-white" size={24} />
                                </a>
                            </div>
                        </div>
                        <div className="md:w-[316px]">
                            <p className="text-deutziawhite font-inter text-[18px] font-medium leading-normal text-[#7FBF3F]">Contact Us</p>
                            <div className="mt-[23px] flex">
                                <div className="flex h-[38px] w-[38px] items-center justify-center rounded-[75%] bg-[#212133]">
                                    <AiOutlinePhone className="text-[#7FBF3F]" size={24} />
                                </div>
                                <div className="ml-[18px]">
                                    <a href="tel:+911800123444" className="font-Inter text-[14px] font-medium text-white">+91 1800123444</a>
                                    <p className="font-Inter text-[12px] font-medium text-white">Support Number</p>
                                </div>
                            </div>
                            <div className="mt-[23px] flex">
                                <div className="flex h-[38px] w-[38px] items-center justify-center rounded-[75%] bg-[#212133]">
                                    <MdEmail className="text-[#7FBF3F]" size={24} />
                                </div>
                                <div className="ml-[18px]">
                                    <a href="mailto:help@lorem.com" className="font-Inter text-[14px] font-medium text-white">help@lorem.com</a>
                                    <p className="font-Inter text-[12px] font-medium text-white">Support Email</p>
                                </div>
                            </div>
                            <div className="mt-[23px] flex">
                                <div className="flex h-[38px] w-[38px] items-center justify-center rounded-[75%] bg-[#212133]">
                                    <BiHome className="text-[#7FBF3F]" size={24} />
                                </div>
                                <div className="ml-[18px]">
                                    <p className="font-Inter text-[14px] font-medium text-white">Sub Nerul, Mumbai, India, 123456</p>
                                    <p className="font-Inter text-[12px] font-medium text-white">Address</p>
                                </div>
                            </div>
                        </div>
                        <div className="mt-6 flex w-full flex-col justify-between text-white sm:flex-row md:mt-0 md:max-w-[341px]">
                            <div>
                                <p className="text-deutziawhite font-inter text-[18px] font-medium leading-normal text-[#7FBF3F]">Pages</p>
                                <ul>
                                    <li className="mt-[15px]"><a className="text-deutziawhite hover:text-deutziawhite/80 font-inter text-[15px] font-normal hover:font-semibold" href="/">Home</a></li>
                                    <li className="mt-[15px]"><a className="text-deutziawhite hover:text-deutziawhite/80 font-inter text-[15px] font-normal hover:font-semibold" href="/our-tutors">News</a></li>
                                    <li className="mt-[15px]"><a className="text-deutziawhite hover:text-deutziawhite/80 font-inter text-[15px] font-normal hover:font-semibold" href="/become-a-tutor">Contact</a></li>
                                    <li className="mt-[15px]"><a className="text-deutziawhite hover:text-deutziawhite/80 font-inter text-[15px] font-normal hover:font-semibold" href="/plans-and-pricing">Plans and pricing</a></li>
                                    <li className="mt-[15px]"><a className="text-deutziawhite hover:text-deutziawhite/80 font-inter text-[15px] font-normal hover:font-semibold" href="/terms-and-conditions">Terms and conditions</a></li>
                                    <li className="mt-[15px]"><a className="text-deutziawhite hover:text-deutziawhite/80 font-inter text-[15px] font-normal hover:font-semibold" href="/privacy-policy">Privacy policy</a></li>
                                </ul>
                            </div>
                            <div className="mt-6 flex flex-col gap-4 sm:mt-0">
                                <p className="text-deutziawhite font-inter text-[18px] font-medium text-[#7FBF3F]">Download the app</p>
                                <div className="flex gap-4 sm:flex-col">
                                    <a target="_blank" rel="noopener noreferrer" href="#">
                                        <img alt="Google Play Store" loading="lazy" width="168" height="50" decoding="async" className="w-auto" src="https://www.englishyaari.com/img/google-store.svg" />
                                    </a>
                                    <a target="_blank" rel="noopener noreferrer" href="#">
                                        <img alt="Apple App Store" loading="lazy" width="168" height="50" decoding="async" className="w-auto" src="https://www.englishyaari.com/img/apple-store.svg" />
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <hr className="mt-[30px] text-white" />
                    <div className="flex items-center justify-center pb-8 pt-[9px] md:py-8">
                        <p className="text-[10px] font-normal text-white md:text-[12px]">
                            © Copyright 2024, All Rights Reserved by YOUR WEBSITES. PVT. LTD
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
