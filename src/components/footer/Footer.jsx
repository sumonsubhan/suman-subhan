import React from "react";
import Logo from "../logo/Logo";
import Link from "next/link";

import { FaFacebook } from "react-icons/fa6";
import { FaYoutube } from "react-icons/fa";
import { FaWhatsappSquare } from "react-icons/fa";
import { BiLogoGmail } from "react-icons/bi";



const Footer = () => {
  return (
    <div className="bg-[url('/asset/footer.svg')] text-white p-4 rounded flex flex-col lg:flex-row justify-between">
      {/* Left Side */}
      <section className="flex flex-col">
        <div>
            <Logo></Logo>
        </div>
        <p className="mt-4">
          বাঙালি হৃদয়ের স্পন্দনে শব্দের কারুকাজ ।<br/>সাহিত্যের প্রতিটিবিন্দুতে
          জীবনের গভীরতা খুঁজে ফিরি ।
        </p>
      </section>

      {/* Right side */}
      <section className="flex flex-col gap-4 text-sm mt-10 lg:mt-0">
        <div className="flex justify-center gap-6">
          <Link href="/">প্রাইভেসি পলিসি</Link>
          <Link href="/">শর্তাবলী</Link>
          <Link href="/">যোগাযোগ</Link>
        </div>

        {/* Social Links */}
        <div className="flex gap-4 justify-center text-2xl">
          <a href="https://www.facebook.com/suman.ahmed.336" target="_blank" rel="noopener noreferrer"><FaFacebook /></a>
          <a href="https://api.whatsapp.com/send?phone=8801769665511" target="_blank" rel="noopener noreferrer"><FaWhatsappSquare /></a>
          <a href="https://www.youtube.com/channel/UCE2F2BllQs0ip071aXqQS3g" target="_blank" rel="noopener noreferrer"><FaYoutube /></a>
          <a href="mailto:sumansubhan1971@gmail.com"><BiLogoGmail /></a>
        </div>

        <div className="text-center">
            © {new Date().getFullYear()} সর্বস্বত্ব সংরক্ষিত | সুমন সুবহান
        </div>
      </section>
    </div>
  );
};

export default Footer;
