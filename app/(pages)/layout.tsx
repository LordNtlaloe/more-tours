import Footer from "@/components/footer/Footer";
import Navbar from "@/components/navbar/Navbar";
import SecondaryNav from "@/components/navbar/SecondaryNav";

const PagesLayout = ({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) => {
    return (
        <div className="flex flex-col min-h-screen">
            <Navbar />
            <SecondaryNav />
            <main className="flex-grow flex items-center justify-center my-10">
                {children}
            </main>
            <Footer />
        </div>
    );
};

export default PagesLayout;
