"use client";

import React from "react";
import { useState } from "react";
import NavLink from "./NavLink";
import Logo from "../logo/Logo";
import { IoMdMenu } from "react-icons/io";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const links = [
    { href: "/", label: "প্রচ্ছদ" },
    { href: "/about", label: "আপন আকর" },
    { href: "/books", label: "অক্ষরবৃত্ত" },
    { href: "/songs", label: "সুরসুধা" },
    { href: "/poems", label: "শব্দসুধা" },
    { href: "/album", label: "কালের ক্যানভাস" },
    { href: "/article-categories", label: "লেখালোক" },
  ];

  return (
    <nav className="bg-[url('/asset/navbar.svg')] p-1 lg:p-3 sticky top-0 z-50 text-white rounded">
      {/* Mobile Nav*/}
      <div className="flex items-center justify-between md:hidden">
        <Logo></Logo>

        <div className="dropdown dropdown-end">
          <button onClick={() => setIsOpen(!isOpen)} className="btn btn-ghost">
            <IoMdMenu size={30}/>
          </button>

          <ul
            className={`menu dropdown-content text-bgprimary bg-gray-200 rounded-box z-10 w-56 p-2 shadow ${
              isOpen ? "block" : "hidden"
            }`}
          >
            {links.map((link) => (
              <li key={link.href}>
                <NavLink href={link.href} onClick={() => setIsOpen(false)}>
                  {link.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Tablet Nav*/}
      <div className="hidden md:flex lg:hidden justify-between items-center">
        <Logo></Logo>
        <div className="flex">
          {links.map((link) => (
            <NavLink key={link.href} href={link.href} className="btn1">
              {link.label}
            </NavLink>
          ))}
        </div>
      </div>

      {/* Desktop Navbar*/}
      <div className="hidden lg:flex justify-between items-center">
        <Logo></Logo>

        <div className="flex gap-4">
          {links.map((link) => (
            <NavLink key={link.href} href={link.href} className="btn1">
              {link.label}
            </NavLink>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
