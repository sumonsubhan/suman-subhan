"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import Image from "next/image";
import { updateArticleCategory } from "@/actions/updateArticleCategory";
import { useRouter } from "next/navigation";

export default function EditCategoryForm({ category }) {
  const router = useRouter();

  const [message, setMessage] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      title: category.title,
      description: category.description,
    },
  });

  async function onSubmit(data) {
    const formData = new FormData();

    formData.append("id", category._id);
    formData.append("title", data.title);
    formData.append("description", data.description);

    if (data.cover?.length) {
      formData.append("cover", data.cover[0]);
    }

    const result = await updateArticleCategory(formData);

    setMessage(result.message);

    if (result.success) {
      router.push(`/admin/articles`);
      router.refresh();
    }
  }

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">Edit Article Category</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div>
          <label className="block mb-2 font-medium">Category Title</label>

          <input
            className="input input-bordered w-full"
            {...register("title", {
              required: "Category title is required",
            })}
          />

          {errors.title && (
            <p className="text-red-500 mt-1 text-sm">{errors.title.message}</p>
          )}
        </div>

        <div>
          <label className="block mb-2 font-medium">Current Cover</label>

          <Image
            src={category.coverImage}
            alt={category.title}
            width={180}
            height={120}
            className="rounded-lg border h-auto w-auto"
          />
        </div>

        <div>
          <label className="block mb-2 font-medium">
            Change Cover (optional)
          </label>

          <input
            type="file"
            accept="image/*"
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
            <p className="text-red-500 mt-1 text-sm">{errors.cover.message}</p>
          )}
        </div>

        <div>
          <label className="block mb-2 font-medium">Description</label>

          <textarea
            rows={5}
            className="textarea textarea-bordered w-full"
            {...register("description", {
              required: "Description is required",
            })}
          />

          {errors.description && (
            <p className="text-red-500 mt-1 text-sm">
              {errors.description.message}
            </p>
          )}
        </div>

        <button disabled={isSubmitting} className="btn btn-primary">
          {isSubmitting ? "Updating..." : "Update Category"}
        </button>

        {message && <p className="text-green-600 mt-3">{message}</p>}
      </form>
    </div>
  );
}
