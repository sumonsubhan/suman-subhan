"use client";

import { addBook } from "@/actions/addBooks";
import { BOOK_CATEGORIES } from "@/lib/bookCategories";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

export default function AddBook() {
  const [message, setMessage] = useState("");
  const {
    register,
    watch,
    setValue,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      categorySlug: "",
    },
  });

  // Set slug based on category
  const selectedCategory = watch("category");

  useEffect(() => {
    const selected = BOOK_CATEGORIES.find(
      (item) => item.label === selectedCategory,
    );
    setValue("categorySlug", selected?.slug || "");
  }, [selectedCategory, setValue]);

  async function onSubmit(data) {
    const formData = new FormData();

    formData.append("title", data.title);
    formData.append("coverImage", data.cover[0]);
    formData.append("category", data.category);
    formData.append("categorySlug", data.categorySlug);
    formData.append("purchaseURL", data.purchaseURL);

    const result = await addBook(formData);

    setMessage(result.message);

    if (result.success) {
      reset();
    }
  }

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">Add New Book</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Title */}
        <div>
          <label className="block mb-2 text-lg font-medium">Book Title</label>

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
            <p className="text-red-500 mt-1 text-sm">{errors.title.message}</p>
          )}
        </div>

        {/* Cover */}
        <div>
          <label className="block mb-2 text-lg font-medium">Cover Photo</label>

          <input
            type="file"
            accept="image/*"
            className="file-input file-input-bordered w-full"
            {...register("cover", {
              required: "Cover image is required",
            })}
          />

          {errors.cover && (
            <p className="text-red-500 mt-1 text-sm">{errors.cover.message}</p>
          )}
        </div>

        {/* Category */}
        <div>
          <label className="font-medium">Category</label>

          <select
            {...register("category", {
              required: true,
            })}
            className="select select-bordered w-full mt-2"
          >
            <option value="">Select Category</option>

            {BOOK_CATEGORIES.map((category) => (
              <option key={category.slug} value={category.label}>
                {category.label}
              </option>
            ))}
          </select>

          {errors.category && (
            <p className="text-red-500 text-sm mt-1">Category is required.</p>
          )}
        </div>

        {/* Slug */}
        <input type="hidden" {...register("categorySlug")} />

        {/* Purchase URL */}
        <div>
          <label className="font-medium">Purchase URL</label>

          <input
            {...register("purchaseURL")}
            placeholder="eg: https://seller.rokomari.com/book/541457/akattor-purbapor"
            className="input input-bordered w-full mt-2"
          />
        </div>

        <button disabled={isSubmitting} className="btn btn-primary">
          {isSubmitting ? "Saving..." : "Add Book"}
        </button>

        <p className="text-green-500">{message}</p>
      </form>
    </div>
  );
}
