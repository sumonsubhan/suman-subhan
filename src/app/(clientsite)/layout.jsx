import Footer from "@/components/footer/Footer";
import Navbar from "@/components/header/Navbar";
import { Anek_Bangla } from "next/font/google";

const anekBangla = Anek_Bangla({
  subsets: ["bengali", "latin"],
});

export default function WebsiteLayout({ children }) {
  return (
    <div className={`${anekBangla.className} max-w-11/12 mx-auto bg-white z-10 rounded-2xl`}>
      <Navbar />
      <main className="px-4 md:px-6 lg:px-30">{children}</main>
      <Footer />
    </div>
  );
}