"use client";

import { useForm } from "react-hook-form";
import { useState } from "react";
import { addPhoto } from "@/actions/addPhoto";
import { useParams } from "next/navigation";

export default function AddPhoto() {
  const params = useParams();
  const id = params.id;

  const [message, setMessage] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = async (data) => {
    const formData = new FormData();

    formData.append("albumId", id);
    formData.append("caption", data.caption);
    formData.append("photo", data.photo[0]);

    const result = await addPhoto(formData);

    setMessage(result.message);

    if (result.success) {
      reset();
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-white rounded-xl shadow p-8">
      <h1 className="text-3xl font-bold mb-8">Add New Photo</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Photo */}

        <div>
          <label className="block font-medium mb-2">Photo</label>

          <input
            type="file"
            accept="image/*"
            className="file-input file-input-bordered w-full"
            {...register("photo", {
              required: "Please select an image",
            })}
          />

          {errors.photo && (
            <p className="text-red-500 mt-1 text-sm">{errors.photo.message}</p>
          )}
        </div>

        {/* Caption */}

        <div>
          <label className="block font-medium mb-2">Caption</label>

          <textarea
            rows={4}
            className="textarea textarea-bordered w-full"
            placeholder="Write a caption..."
            {...register("caption", {
              required: "Caption is required",
              maxLength: {
                value: 300,
                message: "Maximum 300 characters",
              },
            })}
          />

          {errors.caption && (
            <p className="text-red-500 mt-1 text-sm">
              {errors.caption.message}
            </p>
          )}
        </div>

        <button disabled={isSubmitting} className="btn btn-primary">
          {isSubmitting ? "Uploading..." : "Upload Photo"}
        </button>

        {message && <p className="text-green-600 font-medium">{message}</p>}
      </form>
    </div>
  );
}
