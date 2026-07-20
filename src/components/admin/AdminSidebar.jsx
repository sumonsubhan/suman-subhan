"use client";

import { useState } from "react";
import { FaTimes } from "react-icons/fa";
import AdminNavLink from "./AdminNavLink";
import { IoMdMenu } from "react-icons/io";

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
    name: "Poems",
    href: "/admin/poems",
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
  {
    name: "Events",
    href: "/admin/events",
  },
  {
    name: "Blogs",
    href: "/admin/blogs",
  },
  {
    name: "Comments",
    href: "/admin/comments",
  },
];

export default function AdminSidebar() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={() => setOpen(true)}
        className="fixed top-5 left-4 z-50 lg:hidden bg-white p-2 rounded-lg shadow"
      >
        <IoMdMenu />
      </button>

      {/* Overlay */}
      {open && (
        <div
          onClick={() => setOpen(false)}
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed top-0 left-0 z-50
          h-screen w-72 bg-gray-900 text-white
          transition-transform duration-300
          ${open ? "translate-x-0" : "-translate-x-full"}
          lg:translate-x-0
        `}
      >
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

        <nav className="p-4">
          <ul className="space-y-2">
            {menuItems.map((item) => (
              <li key={item.href}>
                <AdminNavLink
                  href={item.href}
                  onClick={() => setOpen(false)}
                >
                  {item.name}
                </AdminNavLink>
              </li>
            ))}
          </ul>
        </nav>
      </aside>
    </>
  );
}