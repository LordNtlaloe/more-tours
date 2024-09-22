"use client";

import React from 'react';
import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope, FaTwitter, FaFacebookF, FaYoutube, FaLinkedinIn } from 'react-icons/fa';

export default function Footer() {
  return (
    <div className="bg-gray-900 text-gray-100 footer pt-5">
      <div className="container mx-auto py-5">
        <div className="flex flex-wrap -mx-4">
          {/* Company Section */}
          <div className="lg:w-1/4 md:w-1/2 px-4 mb-6">
            <h4 className="text-white mb-3">Company</h4>
            <ul className="list-none p-0">
              {["About Us", "Contact Us", "Privacy Policy", "Terms & Conditions", "FAQs & Help"].map((item, index) => (
                <li key={index} className="mb-2">
                  <a className="text-gray-400 hover:text-blue-500 transition" href="#">{item}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Section */}
          <div className="lg:w-1/4 md:w-1/2 px-4 mb-6">
            <h4 className="text-white mb-3">Contact</h4>
            <p className="flex items-center mb-2"><FaMapMarkerAlt className="mr-2" /> 123 Street, New York, USA</p>
            <p className="flex items-center mb-2"><FaPhoneAlt className="mr-2" /> +012 345 67890</p>
            <p className="flex items-center mb-2"><FaEnvelope className="mr-2" /> info@example.com</p>
            <div className="flex pt-2">
              {[FaTwitter, FaFacebookF, FaYoutube, FaLinkedinIn].map((Icon, index) => (
                <a key={index} className="border border-gray-100 text-gray-100 hover:text-white bg-transparent hover:bg-gray-800 transition rounded-full p-2 mx-1" href="#">
                  <Icon />
                </a>
              ))}
            </div>
          </div>

          {/* Gallery Section */}
          <div className="lg:w-1/4 md:w-1/2 px-4 mb-6">
            <h4 className="text-white mb-3">Gallery</h4>
            <div className="flex flex-wrap -mx-1">
              {[1, 2, 3, 4, 5, 6].map((item) => (
                <div key={item} className="w-1/3 px-1 mb-2">
                  <img className="rounded-lg" src={`/assets/img/destination-${item}.jpg`} alt={`Gallery Image ${item}`} />
                </div>
              ))}
            </div>
          </div>

          {/* Newsletter Section */}
          <div className="lg:w-1/4 md:w-1/2 px-4 mb-6">
            <h4 className="text-white mb-3">Newsletter</h4>
            <p className="text-gray-400 mb-3">Subscribe to our newsletter for updates.</p>
            <div className="relative">
              <input className="block w-full py-3 px-4 mb-2 text-gray-800 border border-gray-200 rounded" type="text" placeholder="Your email" />
              <button type="button" className="absolute  items-center top-0 right-0 mt-2 mr-2 py-1 px-3 bg-blue-600 text-white rounded">Sign Up</button>
            </div>
          </div>
        </div>
      </div>
      <div className="container mx-auto">
        <div className="flex flex-wrap justify-between py-4 border-t border-gray-700">
          <div className="text-center text-md-start mb-3 md:mb-0">
            &copy; <a className="hover:text-blue-500 transition" href="#">Your Site Name</a>, All Rights Reserved. Designed By <a className="hover:text-blue-500 transition" href="https://htmlcodex.com">HTML Codex</a>
          </div>
          <div className="text-center text-md-end">
            <div className="footer-menu">
              {["Home", "Cookies", "Help", "FAQs"].map((item, index) => (
                <a key={index} className="text-gray-400 hover:text-blue-500 mx-2 transition" href="#">{item}</a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
