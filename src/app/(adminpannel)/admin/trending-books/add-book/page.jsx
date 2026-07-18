"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";

import { addTrendingBook } from "@/actions/addTrendingBook";

export default function AddTrendingBook() {
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
    formData.append("purchaseURL", data.purchaseURL);
    formData.append("coverImage", data.cover[0]);

    const result = await addTrendingBook(formData);

    setMessage(result.message);

    if (result.success) {
      reset();
    }
  };

  return (
    <section className="max-w-5xl mx-auto bg-white rounded-xl shadow p-8">
      <h1 className="text-3xl font-bold mb-8">Add Trending Book</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Book Title */}

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

        {/* Purchase URL */}

        <div>
          <label className="font-medium">Purchase URL</label>

          <input
            {...register("purchaseURL", {
              required: true,
            })}
            placeholder="eg: https://seller.rokomari.com/book/541457/akattor-purbapor"
            className="input input-bordered w-full mt-2"
          />

          {errors.title && (
            <p className="text-red-500 text-sm mt-1">URL is required.</p>
          )}
        </div>

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

        <button disabled={isSubmitting} className="btn btn-primary">
          {isSubmitting ? "Uploading..." : "Add Book"}
        </button>

        {message && <p className="text-green-600 font-medium">{message}</p>}
      </form>
    </section>
  );
}
