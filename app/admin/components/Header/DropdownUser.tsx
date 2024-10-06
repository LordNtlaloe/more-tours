import { useState } from 'react';
import Link from 'next/link'; // Adjust if you're using a different router
import Image from 'next/image';
import { FaUser, FaAddressBook, FaCog, FaSignOutAlt, FaChevronDown } from 'react-icons/fa';
import ClickOutside from '../ClickOutside'; // Adjust the import path as necessary
import { useSession } from 'next-auth/react';

const DropdownUser = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const session = useSession();
  const user = session.data?.user; 
  return (
    <ClickOutside onClick={() => setDropdownOpen(false)} className="relative">
      <Link
        onClick={() => setDropdownOpen(!dropdownOpen)}
        className="flex items-center gap-4"
        href="#"
      >
        <span className="hidden text-right lg:block">
          <span className="block text-sm font-medium text-black dark:text-white">
            {user?.name}
          </span>
          <span className="block text-xs">{user?.role}</span>
        </span>

        <span className="h-12 w-12 rounded-full">
          <Image
            width={112}
            height={112}
            src={user?.image || ""}
            alt="User"
            className='rounded-full'
          />
        </span>

        {/* Chevron down icon */}
        <FaChevronDown className="hidden fill-current sm:block text-lg" />
      </Link>

      {/* Dropdown Start */}
      {dropdownOpen && (
        <div
          className={`absolute right-0 mt-4 flex w-62.5 flex-col rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark`}
        >
          <ul className="flex flex-col gap-5 border-b border-stroke px-6 py-7.5 dark:border-strokedark">
            <li>
              <Link
                href="/profile"
                className="flex items-center gap-3.5 text-sm font-medium duration-300 ease-in-out hover:text-primary lg:text-base"
              >
                <FaUser className="text-lg" />
                My Profile
              </Link>
            </li>
            <li>
              <Link
                href="#"
                className="flex items-center gap-3.5 text-sm font-medium duration-300 ease-in-out hover:text-primary lg:text-base"
              >
                <FaAddressBook className="text-lg" />
                My Contacts
              </Link>
            </li>
            <li>
              <Link
                href="/settings"
                className="flex items-center gap-3.5 text-sm font-medium duration-300 ease-in-out hover:text-primary lg:text-base"
              >
                <FaCog className="text-lg" />
                Account Settings
              </Link>
            </li>
          </ul>
          <button className="flex items-center gap-3.5 px-6 py-4 text-sm font-medium duration-300 ease-in-out hover:text-primary lg:text-base">
            <FaSignOutAlt className="text-lg" />
            Sign Out
          </button>
        </div>
      )}
    </ClickOutside>
  );
};

export default DropdownUser;
