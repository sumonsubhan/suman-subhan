"use client";

import { useForm } from "react-hook-form";
import { useState } from "react";
import { addPhoto } from "@/actions/addPhoto";
import { useParams } from "next/navigation";

export default function AddPhoto() {
  const params = useParams();

  const albumId = params.id;
  const subAlbumId = params.subAlbumId;

  const [message, setMessage] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = async (data) => {
    const formData = new FormData();

    formData.append("albumId", albumId);
    formData.append("subAlbumId", subAlbumId);
    formData.append("photo", data.photo[0]);

    const result = await addPhoto(formData);

    setMessage(result.message);

    if (result.success) {
      reset();
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-white rounded-xl shadow p-8">
      <h1 className="text-3xl font-bold mb-8">
        Add New Photo
      </h1>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-6"
      >
        <div>
          <label className="block font-medium mb-2">
            Photo
          </label>

          <input
            type="file"
            accept="image/*"
            className="file-input file-input-bordered w-full"
            {...register("photo", {
              required: "Photo is required",

              validate: {
                fileSize: (files) =>
                  files?.[0]?.size <=
                    10 * 1024 * 1024 ||
                  "Image must be smaller than 10 MB",

                fileType: (files) =>
                  [
                    "image/jpeg",
                    "image/png",
                    "image/webp",
                  ].includes(files?.[0]?.type) ||
                  "Only JPG, PNG and WEBP images are allowed",
              },
            })}
          />

          {errors.photo && (
            <p className="text-red-500 mt-1 text-sm">
              {errors.photo.message}
            </p>
          )}
        </div>

        <button
          disabled={isSubmitting}
          className="btn btn-primary"
        >
          {isSubmitting
            ? "Uploading..."
            : "Upload Photo"}
        </button>

        {message && (
          <p className="text-green-600 font-medium">
            {message}
          </p>
        )}
      </form>
    </div>
  );
}