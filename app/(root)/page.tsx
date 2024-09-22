"use client";
import React, { useState, useEffect } from 'react';
import Navbar from "@/components/root/Navbar";
import SecondaryNav from "@/components/root/SecondaryNavbar";
import Footer from "@/components/root/Footer";
import HeroSection from '@/components/root/Hero';
import AboutSection from '@/components/general/About-Section';
import ServicesSection from '@/components/general/Services-Section';
import DestinationsList from '@/components/destinations/DestinationsList';
import CategoryCarousel from '@/components/categories/CategoriesCarousel';
import { getAllTours } from '@/app/_actions/_tourActions';
import TourList from '@/components/tours/TourList';
import ContactSection from '@/components/general/Contact-Section';

export default function Home() {
    const [tourItems, setTourItems] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getTours();
    }, []);

    const getTours = async () => {
      setLoading(true);
      try {
          const tours = await getAllTours();
          console.log('Fetched Tours:', tours); // Inspect the structure here
          setTourItems(tours);
      } catch (error) {
          console.error('Failed to fetch tours:', error);
      } finally {
          setLoading(false);
      }
  };

    return (
        <div>
            <Navbar />
            <SecondaryNav />
            <div>
                <HeroSection />
                <AboutSection />
                <ServicesSection />
                <DestinationsList />
                <CategoryCarousel />
                <TourList tourList={tourItems} title='Our Tours' loading={loading} />
                <ContactSection />
            </div>
            <Footer />
        </div>
    );
}
