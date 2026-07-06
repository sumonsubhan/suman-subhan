import Link from "next/link";
import { FaArrowLeft, FaHouse } from "react-icons/fa6";

export default function NotFound() {
  return (
    <section className="flex min-h-[80vh] items-center justify-center px-4 py-12">
      <div className="max-w-2xl text-center">
        {/* 404 */}
        <h1 className="text-8xl font-extrabold tracking-tight text-bgprimary md:text-9xl">
          404
        </h1>

        {/* Heading */}
        <h2 className="mt-6 text-3xl font-bold text-gray-900 md:text-4xl">
          Page Not Found
        </h2>

        {/* Description */}
        <p className="mx-auto mt-5 max-w-xl text-lg leading-8 text-gray-600">
          Sorry, the page you are looking for does not exist, has been moved,
          or the URL may be incorrect.
        </p>

        {/* Actions */}
        <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-bgprimary px-6 py-3 font-medium text-white transition duration-300 hover:opacity-90"
          >
            <FaHouse />
            Go Home
          </Link>

          <Link href="/"
            className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-lg border border-bgprimary px-6 py-3 font-medium text-bgprimary transition duration-300 hover:bg-bgprimary hover:text-white"
          >
            <FaArrowLeft />
            Go Back
          </Link>
        </div>
      </div>
    </section>
  );
}