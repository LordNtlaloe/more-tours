
import Image from "next/image";
import Menu from "./Menu";

import Link from "next/link";
import MobileMenu from "./MobileMenu";

export default function Navbar() {
    return (
        <main className="w-[100%] bg-[#14141F] h-20 text-[#F2F2F2] flex justify-between items-center px-10 sticky top-0 left-0 right-0 z-10">
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
    )
}
