
import Image from "next/image";
import Menu from "./Menu";

import Link from "next/link";
import MobileMenu from "./MobileMenu";


const Navbar = () => {


  return (
    <main className="w-[100%] bg-blue-950 h-20 text-white flex justify-between items-center px-4 sticky top-0 left-0 right-0 z-10">
      {/* Logo */}
      <Link href='/'>
        <Image src="/logo.png" width={80} height={80} alt="More Tours And Travel Logo" className="rounded-[5px]" />
      </Link>

      <div>
        <div className="hidden md:flex">
          <Menu />
        </div>
        <MobileMenu />
      </div>
    </main>
  );
};

export default Navbar;