import Link from "next/link";
import { FaLongArrowAltLeft, FaLongArrowAltRight } from "react-icons/fa";

export default function Pagination({
  page,
  totalPages,
  baseUrl,
}) {
  return (
    <div className="mt-10 flex flex-wrap justify-center gap-2">
      <Link
        href={`${baseUrl}?page=${page - 1}`}
        className={`btn btn-sm ${
          page === 1 && "pointer-events-none opacity-40"
        }`}
      >
        <FaLongArrowAltLeft />
      </Link>

      {Array.from({ length: totalPages }).map((_, i) => (
        <Link
          key={i}
          href={`${baseUrl}?page=${i + 1}`}
          className={`btn btn-sm ${
            page === i + 1
              ? "btn-primary"
              : "btn-outline"
          }`}
        >
          {i + 1}
        </Link>
      ))}

      <Link
        href={`${baseUrl}?page=${page + 1}`}
        className={`btn btn-sm ${
          page === totalPages &&
          "pointer-events-none opacity-40"
        }`}
      >
        <FaLongArrowAltRight />
      </Link>
    </div>
  );
}