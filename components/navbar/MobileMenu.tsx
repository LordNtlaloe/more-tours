import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";
import { menuItems } from "@/lib/constants";
// import { SignInButton, SignUpButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { FaBars } from 'react-icons/fa';
import Image from "next/image";
import Link from "next/link";

const MobileMenu = () => {
    return (
        <div className="md:hidden">
            <Sheet>
                <SheetTrigger className="p-3 rounded-sm text-[#F2F2F2] transition duration-300">
                    <FaBars className="text-xl" />
                </SheetTrigger>
                <SheetContent
                    className="bg-[#1C2434] h-full text-[#F2F2F2] w-72 p-6"
                    side="left"
                >
                    <SheetHeader>
                        <SheetTitle className="font-bold py-3 flex justify-start">
                            <Link href='/'>
                                <Image src="/logo.png" width={80} height={80} alt="More Tours & Travel Logo" className="rounded-[10px]" />
                            </Link>
                        </SheetTitle>
                    </SheetHeader>
                    <div className="flex flex-col space-y-2 text-[#F2F2F2]">
                        {menuItems.map((item) => (
                            <SheetClose asChild key={item.id} className="text-[#F2F2F2] w-24">
                                <Link
                                    href={item.href}
                                    className="flex items-center py-1 px-4 rounded-md transition-all duration-300 bg-transparent hover:bg-blue-600"
                                >
                                    <item.icon className="flex-shrink-0 text-lg" />
                                    <p className="ml-3 text-lg">{item.label}</p>
                                </Link>
                            </SheetClose>
                        ))}
                    </div>
                    {/* Uncomment if using auth buttons
                    <div className="mt-6">
                        <SheetClose asChild>
                            <div>
                                <SignedIn>
                                    <UserButton afterSignOutUrl="/" />
                                </SignedIn>
                                <SignedOut>
                                    <SignUpButton>
                                        <button className="bg-blue-600 w-full rounded-md hover:bg-blue-700 py-2 my-2 transition duration-300">
                                            Register
                                        </button>
                                    </SignUpButton>
                                    <SignInButton>
                                        <button className="bg-red-600 w-full rounded-md hover:bg-red-700 py-2 transition duration-300">
                                            Sign In
                                        </button>
                                    </SignInButton>
                                </SignedOut>
                            </div>
                        </SheetClose>
                    </div> */}
                </SheetContent>
            </Sheet>
        </div>
    );
};

export default MobileMenu;
