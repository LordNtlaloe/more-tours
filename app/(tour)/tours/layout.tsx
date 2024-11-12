import Navbar from '@/components/root/Navbar'
import SecondaryNav from '@/components/root/SecondaryNavbar'
import CategoriesSidebar from '@/components/categories/CategoriesSidebar'
import React from 'react'

export default function ToursLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="">
      <Navbar />
      <SecondaryNav />
      <div className="w-100">
        <div className="w-100 ">{children}</div>
      </div>
    </div>

  )
}
