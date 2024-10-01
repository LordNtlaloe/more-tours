import { FiHome, FiInfo, FiClipboard, FiPackage, FiUsers, FiMapPin, FiFile, FiGrid, FiBox, FiBriefcase, FiCalendar, FiSettings } from "react-icons/fi";
import { AiOutlineCalendar, AiOutlineUserAdd, AiOutlineTable } from "react-icons/ai";
import { MdGridView } from "react-icons/md";
import { FaTools, FaUserCircle } from "react-icons/fa";

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
    icon: MdGridView,
    label: "Dashboard",
    route: "#",
    children: [{ label: "eCommerce", route: "/" }],
  },
  {
    icon: AiOutlineCalendar,
    label: "Calendar",
    route: "/calendar",
  },
  {
    icon: FaUserCircle,
    label: "Profile",
    route: "/profile",
  },
  {
    icon: AiOutlineUserAdd,
    label: "Forms",
    route: "#",
    children: [
      { label: "Form Elements", route: "/forms/form-elements" },
      { label: "Form Layout", route: "/forms/form-layout" },
    ],
  },
  {
    icon: AiOutlineTable,
    label: "Tables",
    route: "/tables",
  },
  {
    icon: FaTools,
    label: "Tools",
    route: "/tools",
  },
  {
    icon: FiSettings,
    label: "Settings",
    route: "/settings",
  },
]