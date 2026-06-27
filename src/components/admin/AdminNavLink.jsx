"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function AdminNavLink({ href, children, onClick }) {
  const pathname = usePathname();

  let isActive = false;

  // Dashboard
  if (href === "/admin") {
    isActive = pathname === "/admin";
  } else {
    isActive =
      pathname === href ||
      pathname.startsWith(`${href}/`);
  }

  return (
    <Link
      href={href}
      onClick={onClick}
      className={`
        block px-4 py-3 rounded-lg transition-colors
        ${
          isActive
            ? "bg-white text-gray-900 font-semibold"
            : "hover:bg-gray-800"
        }
      `}
    >
      {children}
    </Link>
  );
}