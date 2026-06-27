import Footer from "@/components/footer/Footer";
import Navbar from "@/components/header/Navbar";
import { Anek_Bangla } from "next/font/google";


const anekBangla = Anek_Bangla({
  subsets: ["bengali", "latin"],
});

export default function WebsiteLayout({ children }) {
  return (
    <div className={`${anekBangla.className} w-11/12 mx-auto`}>
      <Navbar />
      <div className="">
        {children}
      </div>
      <Footer />
    </div>
  );
}