"use client";
import { menuItems } from "@/lib/constants";
import Link from "next/link";
import { signIn, useSession } from 'next-auth/react';
import React, { useState } from "react";
import { FiMenu, FiUser } from "react-icons/fi";
import UserButton from "../general/UserButton";

export default function Menu() {
    const [isOpen, setIsOpen] = useState(false);
    const [dropdownOpen, setDropdownOpen] = useState<number | null>(null); // Specify the type here
    const session = useSession();
    const user = session.data?.user; 
    return (
        <div className="container mx-auto sm:px-4 max-w-full relative p-0">
            <nav className="relative flex flex-wrap items-center justify-between py-3 px-1 text-[#F2F2F2] lg:px-6">

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
                    <div className="flex flex-row list-reset pl-0 mb-0 ms-auto py-0">
                        {menuItems.map((item) => (
                            <div key={item.id} className="relative">
                                {/* Check if the item has a dropdown */}
                                {item.dropdown ? (
                                    <>
                                        <button
                                            onClick={() => setDropdownOpen(dropdownOpen === item.id ? null : item.id)}
                                            className="inline-block py-2 px-4 no-underline hover:text-[#7FBF3F]"
                                        >
                                            {item.label}
                                        </button>
                                        {/* Render dropdown items if open */}
                                        {dropdownOpen === item.id && (
                                            <div className="absolute left-0 z-10 mt-1 w-48 bg-white border border-gray-300 rounded shadow-lg">
                                                {item.dropdown.map((dropdownItem) => (
                                                    <Link
                                                        key={dropdownItem.label}
                                                        href={dropdownItem.href}
                                                        className="block py-2 px-4 no-underline hover:bg-gray-100"
                                                    >
                                                        {dropdownItem.label}
                                                    </Link>
                                                ))}
                                            </div>
                                        )}
                                    </>
                                ) : (
                                    <Link
                                        href={item.href}
                                        className="inline-block py-2 px-4 no-underline hover:text-[#7FBF3F]"
                                    >
                                        {item.label}
                                    </Link>
                                )}
                            </div>
                        ))}
                    </div>
                    <div className="relative ml-auto">
                        <button className="circle-icon" onClick={() => setIsOpen(!isOpen)}>
                            <FiUser className="text-xl" />
                        </button>
                        <div className={`absolute right-0 mt-2 w-48 bg-white border border-gray-300 rounded-lg shadow-lg ${isOpen ? "block" : "hidden"}`}>
                            <ul className="list-reset p-2">
                                <li>
                                    {user && <UserButton user={user} />}
                                    {!user && session.status !== "loading" && <SignInButton />}
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </nav>
        </div>

    )
}
function SignInButton() {
    return (
        <button onClick={() => signIn()} type="submit">Sign In</button>
    )
}