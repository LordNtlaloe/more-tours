import { FiHome, FiInfo, FiClipboard, FiPackage, FiUsers, FiMapPin, FiFile, FiGrid, FiBox, FiBriefcase, FiCalendar } from "react-icons/fi";

export const menuItems = [
  {
    id: 1,
    label: "Home",
    href: "/",
    icon: FiHome,
  },
  {
    id: 2,
    label: "About",
    href: "/about",
    icon: FiInfo,
  },
  {
    id: 3,
    label: "Services",
    href: "/services",
    icon: FiClipboard,
  },
  {
    id: 4,
    label: "Tours",
    href: "/tours",
    icon: FiPackage,
  },
  {
    id: 5,
    label: "More",
    href: "#", // Placeholder for dropdown
    icon: FiFile,
    dropdown: [
      { label: "Destination", href: "/destination" },
      { label: "Booking", href: "/booking" },
      { label: "Travel Guides", href: "/team" },
      { label: "Testimonial", href: "/testimonial" },
      { label: "404 Page", href: "/404" },
    ],
  },
  {
    id: 6,
    label: "Contact",
    href: "/contact",
    icon: FiMapPin,
  },
];


export const dashboardMenu = [
  {
    id: 1,
    label: "Dashboard",
    href: "/dashboard",
    icon: FiGrid,
    color: 'text-sky-500'
  },
  {
    id: 2,
    label: "Businesses",
    href: "/dashboard/businesses",
    icon: FiBriefcase,
    color: '#39F4B3'
  },
  {
    id: 3,
    label: "Category",
    href: "/dashboard/categories",
    icon: FiBox,
    color: 'text-sky-500'
  },
  {
    id: 4,
    label: "Bookings",
    href: "/dashboard/bookings",
    icon: FiCalendar,
    color: '#39F4B3'
  },
  {
    id: 5,
    label: "Users",
    href: "/dashboard/users",
    icon: FiUsers,
    color: '#39F4B3'
  },
];
