import Footer from "@/components/footer/Footer";
import Hero from "@/components/hero/Hero";
import LandingPage from "@/components/hero/Hero";
import Navbar from "@/components/navbar/Navbar";
import SecondaryNav from "@/components/navbar/SecondaryNav";
import Image from "next/image";

export default function Home() {
  return (
    <div className="">
      <div className="">
        <Navbar />
        <SecondaryNav />
      </div>
      <Hero />
      <Footer />
    </div>

  );
}
