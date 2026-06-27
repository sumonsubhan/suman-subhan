"use client";

import Logo from "../logo/Logo";
import { FaBars } from "react-icons/fa";

export default function AdminHeader({ onMenuClick }) {
  return (
    <header className="sticky top-0 z-30 h-16 bg-white border-b shadow-sm">
      <div className="h-full px-4 md:px-6 flex items-center justify-between">
        {/* Mobile Menu */}
        <button
          onClick={onMenuClick}
          className="lg:hidden text-xl"
        >
          <FaBars />
        </button>

        <Logo />

        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gray-200" />
        </div>
      </div>
    </header>
  );
}