"use client";

import { addBook } from "@/actions/addBooks";
import TiptapEditor from "@/components/editor/TipTapEditor";
import { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";

import { BOOK_CATEGORIES } from "@/lib/bookCategories";

export default function AddBook() {
  const [message, setMessage] = useState("");

  const {
    register,
    control,
    watch,
    setValue,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      content: "",
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

  const onSubmit = async (data) => {
    console.log(data);
    const formData = new FormData();

    formData.append("title", data.title);
    formData.append("bookName", data.bookName);
    formData.append("category", data.category);
    formData.append("categorySlug", data.categorySlug);
    formData.append("coverImage", data.cover[0]);
    formData.append("shortNote", data.shortNote);
    formData.append("content", data.content);

    console.log(formData);
    const result = await addBook(formData);

    setMessage(result.message);

    if (result.success) {
      reset();
    }
  };

  return (
    <section className="max-w-5xl mx-auto bg-white rounded-xl shadow p-8">
      <h1 className="text-3xl font-bold mb-8">Add New Book</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Book Name */}

        <div>
          <label className="font-medium">Title</label>

          <input
            {...register("title", {
              required: true,
            })}
            className="input input-bordered w-full mt-2"
          />

          {errors.title && (
            <p className="text-red-500 text-sm mt-1">Title is required.</p>
          )}
        </div>

        <div>
          <label className="font-medium">Book Name</label>

          <input
            {...register("bookName", {
              required: true,
            })}
            className="input input-bordered w-full mt-2"
          />

          {errors.title && (
            <p className="text-red-500 text-sm mt-1">Book name is required.</p>
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

        {/* Cover */}
        <div>
          <label className="font-medium">Cover Image</label>

          <input
            type="file"
            accept="image/*"
            {...register("cover", { required: true })}
            className="file-input file-input-bordered w-full mt-2"
          />
          {errors.cover && (
            <p className="text-red-500 text-sm mt-1">
              Cover image is required.
            </p>
          )}
        </div>

        {/* Short Note */}

        <div>
          <label className="font-medium">Short Note</label>

          <textarea
            rows={4}
            {...register("shortNote", { required: true })}
            className="textarea textarea-bordered w-full mt-2"
            placeholder="Write a short introduction..."
          />
          {errors.shortNote && (
            <p className="text-red-500 text-sm mt-1">Short note is required.</p>
          )}
        </div>

        {/* Book Content */}

        <div>
          <label className="font-medium mb-2 block">Book Content</label>

          <Controller
            control={control}
            name="content"
            rules={{
              required: true,
            }}
            render={({ field }) => (
              <TiptapEditor value={field.value} onChange={field.onChange} />
            )}
          />

          {errors.content && (
            <p className="text-red-500 mt-2">Content is required.</p>
          )}
        </div>

        <button disabled={isSubmitting} className="btn btn-primary">
          {isSubmitting ? "Uploading..." : "Add Book"}
        </button>

        {message && <p className="text-green-600 font-medium">{message}</p>}
      </form>
    </section>
  );
}
