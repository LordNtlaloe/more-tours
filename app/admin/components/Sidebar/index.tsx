"use client";

import React, { useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { MdDashboard, MdHotel } from "react-icons/md";
import { AiOutlineUser, AiFillStar, AiOutlineHome, AiOutlineArrowLeft } from "react-icons/ai";
import ClickOutside from "@/app/admin/components/ClickOutside"; // Assuming this component exists

const Sidebar = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false); // Local state for sidebar
  const currentPage = usePathname().split("/")[2];

  const sidebarData = [
    {
      text: "Dashboard",
      icon: <MdDashboard size={18} />,
      href: "/admin/dashboard",
      isCurrentPage: currentPage === "dashboard",
    },
    {
      text: "Users",
      icon: <AiOutlineUser size={18} />,
      href: "/admin/users",
      isCurrentPage: currentPage === "users",
    },
    {
      text: "Listings",
      icon: <MdHotel size={18} />,
      href: "/admin/listings",
      isCurrentPage: currentPage === "listings",
    },
    {
      text: "Reservations",
      icon: <AiOutlineHome size={18} />,
      href: "/admin/reservations",
      isCurrentPage: currentPage === "reservations",
    },
    {
      text: "Reviews",
      icon: <AiFillStar size={18} />,
      href: "/admin/reviews",
      isCurrentPage: currentPage === "reviews",
    },
  ];

  return (
    <ClickOutside onClick={() => setSidebarOpen(false)}>
      <aside
        className={`fixed left-0 top-0 z-50 h-screen w-72 flex flex-col bg-black transition-transform duration-300 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between px-6 py-6">
          <Link href="/">
            <Image src="/images/logo/logo.svg" width={176} height={32} alt="Logo" priority />
          </Link>

          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            aria-controls="sidebar"
            className="block lg:hidden"
          >
            <AiOutlineArrowLeft size={20} className="text-white" />
          </button>
        </div>

        <nav className="mt-5 px-4">
          {sidebarData.map((item) => (
            <Link
              key={item.text}
              href={item.href}
              className={`flex items-center gap-4 px-4 py-3 rounded-lg transition-colors ${
                item.isCurrentPage ? "bg-blue-600 text-white" : "text-gray-400"
              }`}
            >
              <span>{item.icon}</span>
              <span>{item.text}</span>
            </Link>
          ))}
        </nav>
      </aside>
    </ClickOutside>
  );
};

export default Sidebar;
