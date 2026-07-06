"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const NavLink = ({
  href,
  children,
  className = "",
  onClick,
}) => {
  const pathname = usePathname();

  const isActive =
    href === "/"
      ? pathname === "/"
      : pathname.startsWith(href);

  return (
    <Link
      href={href}
      onClick={onClick}
      className={`${className} ${isActive ? "active" : ""}`}
    >
      {children}
    </Link>
  );
};

export default NavLink;