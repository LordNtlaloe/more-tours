import React from 'react';
import Navbar from "@/components/root/Navbar";
import SecondaryNav from "@/components/root/SecondaryNavbar";
import Footer from "@/components/root/Footer";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div>
      <Navbar />
      <SecondaryNav />
      <main>{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
