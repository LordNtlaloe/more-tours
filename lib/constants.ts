import { FiHome, FiSmartphone, FiUserPlus, FiGrid, FiBox, FiBriefcase, FiCalendar, FiUsers } from "react-icons/fi";

export const menuItems = [
  {
    id: 1,
    label: "Home",
    href: "/",
    icon: FiHome,
  },
  { id: 2, label: "Contact", href: "/contact", icon: FiSmartphone },
  {
    id: 3,
    label: "About",
    href: "/about",
    icon: FiUserPlus,
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
