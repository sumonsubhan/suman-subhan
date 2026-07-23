"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";

import { updateBook } from "@/actions/updateBook";
import { BOOK_CATEGORIES } from "@/lib/bookCategories";

export default function EditBookForm({ book }) {
  const router = useRouter();
  const [message, setMessage] = useState("");

  const {
    register,
    watch,
    setValue,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      title: book.title,
      category: book.category,
      categorySlug: book.categorySlug,
      purchaseURL: book.purchaseURL || "",
    },
  });

  // Update category slug automatically
  const selectedCategory = watch("category");

  useEffect(() => {
    const selected = BOOK_CATEGORIES.find(
      (item) => item.label === selectedCategory,
    );

    setValue("categorySlug", selected?.slug || "");
  }, [selectedCategory, setValue]);

  async function onSubmit(data) {
    setMessage("");

    const formData = new FormData();

    formData.append("id", book._id);
    formData.append("title", data.title);
    formData.append("category", data.category);
    formData.append("categorySlug", data.categorySlug);
    formData.append("purchaseURL", data.purchaseURL || "");

    // Append image only if user selected a new one
    if (data.cover?.length > 0) {
      formData.append("coverImage", data.cover[0]);
    }

    const result = await updateBook(formData);

    setMessage(result.message);

    if (result.success) {
      setTimeout(() => {
        router.push("/admin/books");
        router.refresh();
      }, 1000);
    }
  }

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">Edit Book</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Title */}
        <div>
          <label className="block mb-2 text-lg font-medium">
            Book Title
          </label>

          <input
            type="text"
            placeholder="Book title"
            className="input input-bordered w-full"
            {...register("title", {
              required: "Book title is required",
              minLength: {
                value: 3,
                message: "Minimum 3 characters",
              },
            })}
          />

          {errors.title && (
            <p className="text-red-500 mt-1 text-sm">
              {errors.title.message}
            </p>
          )}
        </div>

        {/* Current Cover */}
        <div>
          <label className="block mb-2 text-lg font-medium">
            Current Cover
          </label>

          <Image
            src={book.coverImage}
            alt={book.title}
            width={180}
            height={250}
            className="rounded-lg border object-cover h-auto w-auto"
          />
        </div>

        {/* Upload New Cover */}
        <div>
          <label className="block mb-2 text-lg font-medium">
            Replace Cover (Optional)
          </label>

          <input
            type="file"
            accept="image/jpeg,image/png,image/webp"
            className="file-input file-input-bordered w-full"
            {...register("cover", {
              validate: {
                fileSize: (files) =>
                  !files?.length ||
                  files[0].size <= 5 * 1024 * 1024 ||
                  "Image must be smaller than 5 MB",

                fileType: (files) =>
                  !files?.length ||
                  ["image/jpeg", "image/png", "image/webp"].includes(
                    files[0].type,
                  ) ||
                  "Only JPG, PNG and WEBP images are allowed",
              },
            })}
          />

          {errors.cover && (
            <p className="text-red-500 mt-1 text-sm">
              {errors.cover.message}
            </p>
          )}
        </div>

        {/* Category */}
        <div>
          <label className="block mb-2 text-lg font-medium">
            Category
          </label>

          <select
            className="select select-bordered w-full"
            {...register("category", {
              required: "Category is required",
            })}
          >
            <option value="">Select Category</option>

            {BOOK_CATEGORIES.map((category) => (
              <option key={category.slug} value={category.label}>
                {category.label}
              </option>
            ))}
          </select>

          {errors.category && (
            <p className="text-red-500 mt-1 text-sm">
              {errors.category.message}
            </p>
          )}
        </div>

        {/* Hidden Slug */}
        <input type="hidden" {...register("categorySlug")} />

        {/* Purchase URL */}
        <div>
          <label className="block mb-2 text-lg font-medium">
            Purchase URL
          </label>

          <input
            type="url"
            placeholder="https://seller.rokomari.com/book/..."
            className="input input-bordered w-full"
            {...register("purchaseURL")}
          />
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="btn btn-primary"
        >
          {isSubmitting ? "Updating..." : "Update Book"}
        </button>

        {message && (
          <p
            className={`font-medium ${
              message.toLowerCase().includes("success")
                ? "text-green-600"
                : "text-red-500"
            }`}
          >
            {message}
          </p>
        )}
      </form>
    </div>
  );
}