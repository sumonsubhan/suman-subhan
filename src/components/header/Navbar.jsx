import Link from "next/link";
import React from "react";
import NavLink from "./NavLink";
import Logo from "../logo/Logo";
import { IoMdMenu } from "react-icons/io";

const Navbar = () => {
  const links = [
    { href: "/", label: "প্রচ্ছদ" },
    { href: "/about", label: "আপন আকর" },
    { href: "/books", label: "অক্ষরবৃত্ত" },
    { href: "/songs", label: "সুরসুধা" },
    { href: "/poems", label: "শব্দসুধা" },
    { href: "/album", label: "কালের ক্যানভাস" },
    { href: "/articles", label: "লেখালোক" },
  ];

  return (
    <nav className="p-4">
      {/* Mobile Nav*/}
      <div className="flex items-center justify-between md:hidden">
        <Logo></Logo>

        <div className="dropdown dropdown-end">
          <div tabIndex={0} role="button" className="btn btn-ghost">
            <IoMdMenu />
          </div>

          <ul
            tabIndex={0}
            className="menu dropdown-content bg-gray-200 rounded-box z-10 w-56 p-2 shadow"
          >
            {links.map((link) => (
              <li key={link.href}>
                <NavLink href={link.href}>{link.label}</NavLink>
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