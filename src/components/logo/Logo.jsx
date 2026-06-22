import Link from "next/link";
import React from "react";

const Logo = () => {
  return (
    <Link href="/">
      <h1 className="font-bold text-xl">সুমন সুবহান</h1>
      <p className="text-xs">কবি ও কথাসাহিত্যিক</p>
    </Link>
  );
};

export default Logo;
