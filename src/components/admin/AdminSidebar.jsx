"use client";

import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { FaBars, FaTimes } from "react-icons/fa";

const menuItems = [
  {
    name: "Dashboard",
    href: "/admin",
  },
  {
    name: "Books",
    href: "/admin/books",
  },
  {
    name: "Songs",
    href: "/admin/songs",
  },
  {
    name: "Gallery",
    href: "/admin/gallery",
  },
  {
    name: "Articles",
    href: "/admin/articles",
  },
];

export default function AdminSidebar() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <>
      {/* Mobile Topbar */}
      <div className="lg:hidden sticky top-0 z-50 h-16 bg-white border-b flex items-center justify-between px-4">
        <h1 className="font-bold text-lg">
          Admin Panel
        </h1>

        <button
          onClick={() => setOpen(true)}
          className="text-xl"
        >
          <FaBars />
        </button>
      </div>

      {/* Overlay */}
      {open && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed top-0 left-0 z-50
          h-screen w-72
          bg-gray-900 text-white
          transition-transform duration-300
          lg:translate-x-0
          ${open ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        {/* Sidebar Header */}
        <div className="h-16 px-6 border-b border-gray-700 flex items-center justify-between">
          <h1 className="text-xl font-bold">
            Admin Panel
          </h1>

          <button
            onClick={() => setOpen(false)}
            className="lg:hidden"
          >
            <FaTimes />
          </button>
        </div>

        {/* Menu */}
        <nav className="p-4">
          <ul className="space-y-2">
            {menuItems.map((item) => {
              const active = pathname === item.href;

              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className={`
                      block px-4 py-3 rounded-lg
                      transition-colors
                      ${
                        active
                          ? "bg-white text-gray-900 font-medium"
                          : "hover:bg-gray-800"
                      }
                    `}
                  >
                    {item.name}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </aside>
    </>
  );
}