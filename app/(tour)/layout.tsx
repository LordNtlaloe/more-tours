import Navbar from '@/components/root/Navbar'
import SecondaryNav from '@/components/root/SecondaryNavbar'
import { Sidebar } from 'lucide-react'
import React from 'react'

export default function ToursLayout({children}: Readonly<{children: React.ReactNode}>) {
  return (
    <div className="">
      <Navbar />
      <SecondaryNav />
      <div className="md:grid md:grid-cols-4 ">
      <div className="border-r pl-2 border-b hidden md:block">
        {/* <CategoriesSidebar /> */}
      </div>
      
      <div className="col-span-3 pl-4">{children}</div>
    </div>
    </div>
    
  )
}
