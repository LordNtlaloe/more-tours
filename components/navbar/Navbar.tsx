"use client";
import Image from "next/image";
import Menu from "./Menu";
import Link from "next/link";
import MobileMenu from "./MobileMenu";
import { useState } from "react";
import { FiSearch } from "react-icons/fi";

export default function Navbar() {
    const [searchTerm, setSearchTerm] = useState("");

    return (
        <main className="w-full bg-[#14141F] h-20 text-[#F2F2F2] flex items-center justify-between px-10 sticky top-0 left-0 right-0 z-10">
            {/* Logo */}
            <Link href='/' className="flex-shrink-0">
                <Image src="/logo.png" width={80} height={80} alt="More Tours And Travel Logo" className="rounded-[5px]" />
            </Link>

            {/* Search Bar and Menu Container */}
            <div className="flex items-center space-x-4">
                {/* Search Bar */}
                <div className="relative w-full max-w-[500px]">
                    <input
                        type="text"
                        placeholder="Search..."
                        className="w-full p-2 border border-gray-300 rounded-md bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <FiSearch className="absolute right-3 top-3 text-gray-400" />
                </div>

                {/* Menu */}
                <div className="hidden md:flex">
                    <Menu />
                </div>
                <MobileMenu />
            </div>
        </main>
    );
}
