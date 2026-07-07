import Footer from "@/components/footer/Footer";
import Navbar from "@/components/header/Navbar";
import { Anek_Bangla } from "next/font/google";

const anekBangla = Anek_Bangla({
  subsets: ["bengali", "latin"],
});

export default function WebsiteLayout({ children }) {
  return (
    <div className={`${anekBangla.className} mx-auto w-11/12`}>
      <Navbar />
      <main>{children}</main>
      <Footer />
    </div>
  );
}