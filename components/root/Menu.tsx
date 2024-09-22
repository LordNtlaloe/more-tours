"use client";
import { menuItems } from "@/lib/constants";
import Link from "next/link";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignUpButton,
  UserButton,
} from "@clerk/nextjs";
import { useState } from "react";
import { FiMenu, FiUser } from "react-icons/fi";

const Menu = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="container mx-auto sm:px-4 max-w-full relative p-0">
      <nav className="relative flex flex-wrap items-center justify-between py-3 px-4 text-black lg:px-12">

        {/* Mobile toggle button */}
        <button
          className="py-1 px-2 text-md leading-normal bg-transparent border border-transparent rounded lg:hidden"
          type="button"
          onClick={() => setIsOpen(!isOpen)}
        >
          <FiMenu className="text-xl" />
        </button>

        {/* Navbar links */}
        <div className={`lg:flex flex-grow items-center ${isOpen ? "block" : "hidden"}`}>
          <div className="flex flex-wrap list-reset pl-0 mb-0 ms-auto py-0">
            {menuItems.map((item) => (
              <Link
                href={item.href}
                key={item.label}
                className="inline-block py-2 px-4 no-underline hover:text-blue-600"
              >
                {item.label}
              </Link>
            ))}

            {/* Dropdown menu */}
            <div className="relative">
              <a
                href="#"
                className="inline-block py-2 px-4 no-underline border-b-0 border-t border-l border-r"
              >
                Pages
              </a>
              <div className="absolute left-0 z-50 hidden list-reset py-2 mt-1 text-base bg-white border border-gray-300 rounded">
                <Link href="/destination" className="block w-full py-1 px-6">
                  Destination
                </Link>
                <Link href="/booking" className="block w-full py-1 px-6">
                  Booking
                </Link>
                <Link href="/team" className="block w-full py-1 px-6">
                  Travel Guides
                </Link>
                <Link href="/testimonial" className="block w-full py-1 px-6">
                  Testimonial
                </Link>
                <Link href="/404" className="block w-full py-1 px-6">
                  404 Page
                </Link>
              </div>
            </div>

            <Link href="/contact" className="inline-block py-2 px-4 no-underline">
              Contact
            </Link>
          </div>
        </div>

        {/* User menu */}
        <div className="relative ml-auto">
          <button className="circle-icon" onClick={() => setIsOpen(!isOpen)}>
            <FiUser className="text-xl" />
          </button>
          <div className={`absolute right-0 mt-2 w-48 bg-white border border-gray-300 rounded-lg shadow-lg ${isOpen ? "block" : "hidden"}`}>
            <ul className="list-reset p-2">
              <SignedIn>
                <li className="py-1 px-4 hover:bg-gray-100">
                  <Link href="/dashboard">
                    Dashboard
                  </Link>
                </li>
                <li className="py-1 px-4 hover:bg-gray-100">
                  <UserButton afterSignOutUrl="/" />
                </li>
              </SignedIn>
              <SignedOut>
                <li className="py-1 px-4 hover:bg-gray-100">
                  <SignUpButton>
                    <Link href="/register">Register</Link>
                  </SignUpButton>
                </li>
                <li className="py-1 px-4 hover:bg-gray-100">
                  <SignInButton>
                    <Link href="/login">Login</Link>
                  </SignInButton>
                </li>
              </SignedOut>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Menu;
