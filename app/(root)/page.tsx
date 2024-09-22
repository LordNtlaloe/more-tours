import React from 'react'
import Navbar from "@/components/root/Navbar";
import SecondaryNav from "@/components/root/SecondaryNavbar";
import Footer from "@/components/root/Footer";
import HeroSection from '@/components/root/Hero';

export default function Home() {
  return (
    <div>
      <Navbar />
      <SecondaryNav />
      <div className="">
        <HeroSection />
      </div>
      <Footer />
    </div>
  )
}
