"use client"
import Link from "next/link";
import { FaArrowRotateRight, FaHouse } from "react-icons/fa6";

export default function Error({reset }) {


  return (
    <section className="flex min-h-[70vh] items-center justify-center px-4 py-12">
      <div className="w-full max-w-2xl text-center">
        {/* Error Code */}
        <h1 className="text-7xl font-extrabold text-bgprimary md:text-8xl">
          Oops!
        </h1>

        {/* Heading */}
        <h2 className="mt-6 text-3xl font-bold text-gray-900 md:text-4xl">
          Something Went Wrong
        </h2>

        {/* Description */}
        <p className="mx-auto mt-5 max-w-xl text-base leading-8 text-gray-600 md:text-lg">
          Please try again or Go to home page!
        </p>

        {/* Buttons */}
        <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">
          <button
            onClick={() => reset()}
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-bgprimary px-6 py-3 font-medium text-white transition hover:opacity-90"
          >
            <FaArrowRotateRight />
            Try Again
          </button>

          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 rounded-lg border border-bgprimary px-6 py-3 font-medium text-bgprimary transition hover:bg-bgprimary hover:text-white"
          >
            <FaHouse />
            Home
          </Link>
        </div>
      </div>
    </section>
  );
}