"use client";

import { useForm } from "react-hook-form";
import { useState } from "react";
import { addPoem } from "@/actions/addPoem";

export default function AddPoem() {
  const [message, setMessage] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = async (data) => {
    const formData = new FormData();

    formData.append("title", data.title);
    formData.append("bookTitle", data.bookTitle);
    formData.append("cover", data.cover[0]);
    formData.append("videoURL", data.videoURL);
    formData.append("purchaseURL", data.purchaseURL);
    formData.append("description", data.description);

    const result = await addPoem(formData);

    setMessage(result.message);

    if (result.success) {
      reset();
    }
  };

  return (
    <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow p-8">
      <h1 className="text-3xl font-bold mb-8">Add New Poem</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Title */}

        <div>
          <label className="block mb-2 font-medium">Poem Title</label>

          <input
            type="text"
            className="input input-bordered w-full"
            placeholder="Enter poem title"
            {...register("title", {
              required: "Poem title is required",
            })}
          />

          {errors.title && (
            <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>
          )}
        </div>

        {/* Cover */}

        <div>
          <label className="block mb-2 font-medium">Cover Image</label>

          <input
            type="file"
            accept="image/*"
            className="file-input file-input-bordered w-full"
            {...register("cover", {
              required: "Cover image is required",
              validate: {
                fileSize: (files) =>
                  files?.[0]?.size <= 5 * 1024 * 1024 ||
                  "Image must be smaller than 5 MB",

                fileType: (files) =>
                  ["image/jpeg", "image/png", "image/webp"].includes(
                    files?.[0]?.type,
                  ) || "Only JPG, PNG and WEBP images are allowed",
              },
            })}
          />

          {errors.cover && (
            <p className="text-red-500 mt-1 text-sm">{errors.cover.message}</p>
          )}
        </div>

        {/* Video URL */}

        <div>
          <label className="block mb-2 font-medium">YouTube Video URL</label>

          <input
            type="url"
            className="input input-bordered w-full"
            placeholder="https://www.youtube.com/watch?v=..."
            {...register("videoURL", {
              required: "Video URL is required",
            })}
          />

          {errors.videoURL && (
            <p className="text-red-500 text-sm mt-1">
              {errors.videoURL.message}
            </p>
          )}
        </div>

        {/*Book Title */}
        <div>
          <label className="block mb-2 font-medium">Book Title</label>

          <input
            type="text"
            className="input input-bordered w-full"
            placeholder="Enter Book title"
            {...register("bookTitle", {
              required: "Book title is required",
            })}
          />

          {errors.bookTitle && (
            <p className="text-red-500 text-sm mt-1">
              {errors.bookTitle.message}
            </p>
          )}
        </div>

        {/* Purchase URL */}
        <div>
          <label className="font-medium">Book Purchase URL (optional) </label>

          <input
            {...register("purchaseURL")}
            placeholder="eg: https://seller.rokomari.com/book/541457/akattor-purbapor"
            className="input input-bordered w-full mt-2"
          />
        </div>

        {/* Description */}

        <div>
          <label className="block mb-2 font-medium">Description</label>

          <textarea
            rows={5}
            className="textarea textarea-bordered w-full"
            placeholder="Write a short description..."
            {...register("description", {
              required: "Description is required",
            })}
          />

          {errors.description && (
            <p className="text-red-500 text-sm mt-1">
              {errors.description.message}
            </p>
          )}
        </div>

        <button disabled={isSubmitting} className="btn btn-primary">
          {isSubmitting ? "Uploading..." : "Add Poem"}
        </button>

        {message && <p className="text-green-600 font-medium">{message}</p>}
      </form>
    </div>
  );
}
