
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
      <div>
        <div className="md:hidden">
          <Sheet>
            <SheetTrigger>
              <MenuIcon />
            </SheetTrigger>
            <SheetContent
              className="bg-blue-950 h-full text-white w-72"
              side="left"
            >
              <SheetHeader>
                <SheetTitle className="font-bold border-b border-white mb-4 mt-3 py-4 flex justify-center">
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
                      className="flex py-2 border-b border-white/30 md:border-none cursor-pointer hover:scale-105 hover:font-bold transition-all"
                    >
                      <item.icon className="md:hidden flex justify-start" />
                      <p className="ml-3 md:ml-1">{item.label}</p>
                    </Link>
                  </SheetClose>
                ))}
              </div>
              <SheetClose asChild>
                <div>
                  <SignedIn>
                    <div>
                      <UserButton afterSignOutUrl="/" />
                    </div>
                  </SignedIn>
                  <SignedOut>
                    {/* Signed out users get sign in button */}
  
                    <SignUpButton>
                      <button className="bg-blue-600 px-3 rounded hover:bg-blue-700 w-full my-4 mt-10 py-2">Register</button>
                    </SignUpButton>
  
                    <SignInButton>
                      <button className="bg-red-600 px-3 rounded hover:bg-blue-700 w-full py-2">Sign-In</button>
                    </SignInButton>
  
                  </SignedOut>
  
                </div>
              </SheetClose>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    );
  };
  
  export default MobileMenu;