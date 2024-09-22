"use client";

import React from 'react';
import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope, FaTwitter, FaFacebookF, FaYoutube, FaLinkedinIn } from 'react-icons/fa';

export default function Footer() {
  return (
    <div className="bg-gray-900 text-gray-100 footer pt-5 mt-5">
      <div className="container mx-auto py-5">
        <div className="flex flex-wrap g-5">
          <div className="lg:w-1/4 md:w-1/2 pr-4 pl-4">
            <h4 className="text-white mb-3">Company</h4>
            <ul className="list-none p-0">
              <li className="mb-2">
                <a className="inline-block py-1 px-3 text-blue-700 bg-transparent" href="">About Us</a>
              </li>
              <li className="mb-2">
                <a className="inline-block py-1 px-3 text-blue-700 bg-transparent" href="">Contact Us</a>
              </li>
              <li className="mb-2">
                <a className="inline-block py-1 px-3 text-blue-700 bg-transparent" href="">Privacy Policy</a>
              </li>
              <li className="mb-2">
                <a className="inline-block py-1 px-3 text-blue-700 bg-transparent" href="">Terms & Conditions</a>
              </li>
              <li>
                <a className="inline-block py-1 px-3 text-blue-700 bg-transparent" href="">FAQs & Help</a>
              </li>
            </ul>

          </div>
          <div className="lg:w-1/4 md:w-1/2 pr-4 pl-4">
            <h4 className="text-white mb-3">Contact</h4>
            <p className="mb-2"><FaMapMarkerAlt className="inline-block me-3" /> 123 Street, New York, USA</p>
            <p className="mb-2"><FaPhoneAlt className="inline-block me-3" /> +012 345 67890</p>
            <p className="mb-2"><FaEnvelope className="inline-block me-3" /> info@example.com</p>
            <div className="flex pt-2">
              <a className="inline-block border rounded py-1 px-3 text-gray-100 border-gray-100 hover:text-white bg-white hover:bg-gray-200 me-2" href="#"><FaTwitter /></a>
              <a className="inline-block border rounded py-1 px-3 text-gray-100 border-gray-100 hover:text-white bg-white hover:bg-gray-200 me-2" href="#"><FaFacebookF /></a>
              <a className="inline-block border rounded py-1 px-3 text-gray-100 border-gray-100 hover:text-white bg-white hover:bg-gray-200 me-2" href="#"><FaYoutube /></a>
              <a className="inline-block border rounded py-1 px-3 text-gray-100 border-gray-100 hover:text-white bg-white hover:bg-gray-200" href="#"><FaLinkedinIn /></a>
            </div>
          </div>
          <div className="lg:w-1/4 md:w-1/2 pr-4 pl-4">
            <h4 className="text-white mb-3">Gallery</h4>
            <div className="flex flex-wrap g-2 pt-2">
              <div className="w-1/3">
                <img className="max-w-full h-auto bg-gray-100 p-1" src="img/package-1.jpg" alt="" />
              </div>
              <div className="w-1/3">
                <img className="max-w-full h-auto bg-gray-100 p-1" src="img/package-2.jpg" alt="" />
              </div>
              <div className="w-1/3">
                <img className="max-w-full h-auto bg-gray-100 p-1" src="img/package-3.jpg" alt="" />
              </div>
            </div>
          </div>
          <div className="lg:w-1/4 md:w-1/2 pr-4 pl-4">
            <h4 className="text-white mb-3">Newsletter</h4>
            <p>Dolor amet sit justo amet elitr clita ipsum elitr est.</p>
            <div className="relative mx-auto" style={{ maxWidth: "400px" }}>
              <input className="block w-full py-3 px-4 mb-1 text-gray-800 border border-gray-200 rounded" type="text" placeholder="Your email" />
              <button type="button" className="absolute top-0 right-0 mt-2 me-2 py-2 px-3 bg-blue-600 text-white rounded">Sign Up</button>
            </div>
          </div>
        </div>
      </div>
      <div className="container mx-auto">
        <div className="flex flex-wrap">
          <div className="md:w-1/2 text-center text-md-start mb-3 md:mb-0">
            &copy; <a className="border-b" href="#">Your Site Name</a>, All Rights Reserved.
            Designed By <a className="border-b" href="https://htmlcodex.com">HTML Codex</a>
          </div>
          <div className="md:w-1/2 text-center text-md-end">
            <div className="footer-menu">
              <a href="">Home</a>
              <a href="">Cookies</a>
              <a href="">Help</a>
              <a href="">FAQs</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
