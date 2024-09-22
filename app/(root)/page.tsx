import React from 'react'
import Navbar from "@/components/root/Navbar";
import SecondaryNav from "@/components/root/SecondaryNavbar";
import Footer from "@/components/root/Footer";
import HeroSection from '@/components/root/Hero';
import AboutSection from '@/components/general/About-Section';
import ServicesSection from '@/components/general/Services-Section';
import DestinationsList from '@/components/destinations/DestinationsList';
import CategoryCarousel from '@/components/categories/CategoriesCarousel';

export default function Home() {
  return (
    <div>
      <Navbar />
      <SecondaryNav />
      <div className="">
        <HeroSection />
        <AboutSection/>
        <ServicesSection />
        <DestinationsList />
        <CategoryCarousel />
      </div>
      <Footer />
    </div>
  )
}
