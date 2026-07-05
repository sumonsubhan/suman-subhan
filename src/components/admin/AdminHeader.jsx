"use client";

import { logout } from "@/actions/logout";
import Logo from "../logo/Logo";
import { FaBars } from "react-icons/fa";
import Image from "next/image";

export default function AdminHeader({ onMenuClick, user }) {
  return (
    <header className="sticky top-0 z-30 h-16 bg-white border-b shadow-sm">
      <div className="h-full px-4 md:px-6 flex items-center justify-between">
        {/* Mobile Menu */}
        <button onClick={onMenuClick} className="lg:hidden text-xl">
          <FaBars />
        </button>

        <Logo />

        <div className="flex items-center gap-3">
         <div className="p-1 bg-gray-200 rounded-full">
           <Image
            src={user.image}
            alt="user.name"
            width={30}
            height={25}
            className="rounded-full"
          ></Image>
         </div>

          <div>
            <form action={logout}>
              <button className="btn btn-error">Logout</button>
            </form>
          </div>
        </div>
      </div>
    </header>
  );
}
