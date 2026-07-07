"use client";

import { Controller, useForm } from "react-hook-form";
import { useState } from "react";
import { useParams } from "next/navigation";
import TiptapEditor from "@/components/editor/TipTapEditor";
import { addContent } from "@/actions/addContent";

export default function AddContent() {
  const params = useParams();
  const id = params.id;
  console.log(id);

  const [message, setMessage] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = async (data) => {
    const formData = new FormData();

    formData.append("bookId", id);
    formData.append("title", data.title);
    formData.append("coverImage", data.coverImage[0]);
    formData.append("shortNote", data.shortNote);
    formData.append("content", data.content);

    console.log(formData);

    const result = await addContent(formData);

    setMessage(result.message);

    if (result.success) {
      reset();
    }
  };

  return (
    <div className="max-w-3xl mx-auto bg-white rounded-xl shadow p-8">
      <h1 className="text-3xl font-bold mb-8">Add New Content</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Title */}

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

        {/* Photo */}
        <div>
          <label className="block font-medium mb-2">Cover Image</label>

          <input
            type="file"
            accept="image/*"
            className="file-input file-input-bordered w-full"
            {...register("coverImage", {
              required: "Please select an image",
            })}
          />

          {errors.coverImage && (
            <p className="text-red-500 mt-1 text-sm">
              {errors.coverImage.message}
            </p>
          )}
        </div>

        {/* Short Note */}

        <div>
          <label className="block font-medium mb-2">Short Note</label>

          <textarea
            rows={4}
            className="textarea textarea-bordered w-full"
            placeholder="Write a short note..."
            {...register("shortNote", {
              required: "Short note is required",
              maxLength: {
                value: 300,
                message: "Maximum 300 characters",
              },
            })}
          />

          {errors.shortNote && (
            <p className="text-red-500 mt-1 text-sm">
              {errors.shortNote.message}
            </p>
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
          {isSubmitting ? "Uploading..." : "Upload Content"}
        </button>

        {message && <p className="text-green-600 font-medium">{message}</p>}
      </form>
    </div>
  );
}
