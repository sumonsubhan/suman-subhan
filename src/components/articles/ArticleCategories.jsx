import Image from "next/image";
import Link from "next/link";

export default function ArticleCategories({ categories }) {
  return (
    <div className="my-8 lg:my-10">
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-10">
        {categories.map((category) => (
          <Link
            key={category._id}
            href={`/article-categories/${category._id}`}
            className="space-y-4"
          >
            <Image
              src={category.coverImage}
              alt={category.title}
              width={400}
              height={200}
              className="rounded-lg w-full object-cover"
            />

            <div>
              <h2 className="text-xl font-bold">
                {category.title}
              </h2>

              <p className="mt-2 text-gray-600 line-clamp-2">
                {category.description}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}