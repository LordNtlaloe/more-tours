"use client";
import { usePathname } from 'next/navigation';
import React, { ReactNode } from 'react';
import Navbar from '../navbar/Navbar';
import Footer from '../footer/Footer';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

interface LayoutProviderProps {
  children: ReactNode; // Explicitly typing the children prop
}

const LayoutProvider: React.FC<LayoutProviderProps> = ({ children }) => {
  const queryClient = new QueryClient();
  const pathname = usePathname();

  return (
    <>
      <QueryClientProvider client={queryClient}>
        {pathname !== "/login" && pathname !== "/signup" && !pathname.includes("/admin") && <Navbar />}
        {children}
        {pathname !== "/login" && pathname !== "/signup" && !pathname.includes("/admin") && <Footer />}
      </QueryClientProvider>
    </>
  );
};

export default LayoutProvider;
