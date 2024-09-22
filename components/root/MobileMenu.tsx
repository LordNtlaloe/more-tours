import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { menuItems } from "@/lib/constants";
import { SignInButton, SignUpButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { MenuIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const MobileMenu = () => {
  return (
    <div className="md:hidden">
      <Sheet>
        <SheetTrigger className="p-2 rounded bg-blue-600 text-white">
          <MenuIcon />
        </SheetTrigger>
        <SheetContent
          className="bg-blue-950 h-full text-white w-72 p-4"
          side="left"
        >
          <SheetHeader>
            <SheetTitle className="font-bold border-b border-white mb-4 py-3 flex justify-center">
              <Link href='/'>
                <Image src="/logo.jpg" width={80} height={80} alt="UniServe" className="rounded-[5px]" />
              </Link>
            </SheetTitle>
          </SheetHeader>
          <div>
            {menuItems.map((item) => (
              <SheetClose asChild key={item.id}>
                <Link
                  href={item.href}
                  className="flex py-2 border-b border-white/30 hover:bg-blue-600 transition-all rounded-md"
                >
                  <item.icon className="flex-shrink-0" />
                  <p className="ml-3">{item.label}</p>
                </Link>
              </SheetClose>
            ))}
          </div>
          <div className="mt-4">
            <SheetClose asChild>
              <div>
                <SignedIn>
                  <UserButton afterSignOutUrl="/" />
                </SignedIn>
                <SignedOut>
                  <SignUpButton>
                    <button className="bg-blue-600 w-full rounded-md hover:bg-blue-700 py-2 my-2 transition">
                      Register
                    </button>
                  </SignUpButton>
                  <SignInButton>
                    <button className="bg-red-600 w-full rounded-md hover:bg-red-700 py-2 transition">
                      Sign In
                    </button>
                  </SignInButton>
                </SignedOut>
              </div>
            </SheetClose>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default MobileMenu;
