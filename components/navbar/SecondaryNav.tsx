"use client";
import Link from "next/link";
import {
  FaFacebook,
  FaInstagram,
  FaTwitter,
  FaYoutube,
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaEnvelopeOpen,
  FaLinkedinIn,
} from "react-icons/fa";

export default function SecondaryNav() {
    return (
        <div className="bg-[#7FBF3F] px-10 hidden lg:block border-b border-slate-100 text-[#14141F]">
            <div className="grid grid-cols-2 gap-0">
                {/* Left Section with Contact Information */}
                <div className="text-center lg:text-left mb-2 lg:mb-0">
                    <div className="inline-flex items-center h-[45px]">
                        <small className="mr-3 text-light flex items-center">
                            <FaMapMarkerAlt className="mr-2" />
                            123 Street, New York, USA
                        </small>
                        <small className="mr-3 text-light flex items-center">
                            <FaPhoneAlt className="mr-2" />
                            +012 345 6789
                        </small>
                        <small className="text-light flex items-center">
                            <FaEnvelopeOpen className="mr-2" />
                            info@example.com
                        </small>
                    </div>
                </div>

                {/* Right Section with Social Media Icons */}
                <div className="text-center lg:text-right">
                    <div className="inline-flex items-center h-[45px]">
                        <Link
                            href="#"
                            className="btn btn-sm btn-outline-light rounded-full mr-2 flex items-center justify-center p-2"
                        >
                            <FaTwitter />
                        </Link>
                        <Link
                            href="#"
                            className="btn btn-sm btn-outline-light rounded-full mr-2 flex items-center justify-center p-2"
                        >
                            <FaFacebook />
                        </Link>
                        <Link
                            href="#"
                            className="btn btn-sm btn-outline-light rounded-full mr-2 flex items-center justify-center p-2"
                        >
                            <FaLinkedinIn />
                        </Link>
                        <Link
                            href="#"
                            className="btn btn-sm btn-outline-light rounded-full mr-2 flex items-center justify-center p-2"
                        >
                            <FaInstagram />
                        </Link>
                        <Link
                            href="#"
                            className="btn btn-sm btn-outline-light rounded-full flex items-center justify-center p-2"
                        >
                            <FaYoutube />
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}
