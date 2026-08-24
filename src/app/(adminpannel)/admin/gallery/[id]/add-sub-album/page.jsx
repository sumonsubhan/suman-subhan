"use client";

import { addSubAlbum } from "@/actions/addSubAlbum";
import { useParams } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";

export default function AddSubAlbum() {
  const params = useParams();
  const albumId = params.id;

  const [message, setMessage] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();

  async function onSubmit(data) {
    const formData = new FormData();

    formData.append("albumId", albumId);
    formData.append("title", data.title);
    formData.append("description", data.description);
    formData.append("cover", data.cover[0]);

    const result = await addSubAlbum(formData);

    setMessage(result.message);

    if (result.success) {
      reset();
    }
  }

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">
        Add New Event
      </h1>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-6"
      >
        {/* Title */}
        <div>
          <label className="block mb-2 text-lg font-medium">
            Event Name
          </label>

          <input
            type="text"
            placeholder="Example: পহেলা বৈশাখ ২০২৬"
            className="input input-bordered w-full"
            {...register("title", {
              required: "Event name is required",
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

        {/* Cover */}
        <div>
          <label className="block mb-2 text-lg font-medium">
            Cover Photo
          </label>

          <input
            type="file"
            accept="image/*"
            className="file-input file-input-bordered w-full"
            {...register("cover", {
              required: "Cover image is required",

              validate: {
                fileSize: (files) =>
                  files?.[0]?.size <=
                    5 * 1024 * 1024 ||
                  "Image must be smaller than 5 MB",

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

          {errors.cover && (
            <p className="text-red-500 mt-1 text-sm">
              {errors.cover.message}
            </p>
          )}
        </div>

        {/* Description */}
        <div>
          <label className="block mb-2 text-lg font-medium">
            Description
          </label>

          <textarea
            rows={5}
            placeholder="Write event description..."
            className="textarea textarea-bordered w-full"
            {...register("description", {
              required: "Description is required",
              minLength: {
                value: 10,
                message: "Minimum 10 characters",
              },
            })}
          />

          {errors.description && (
            <p className="text-red-500 mt-1 text-sm">
              {errors.description.message}
            </p>
          )}
        </div>

        <button
          disabled={isSubmitting}
          className="btn btn-primary"
        >
          {isSubmitting
            ? "Saving..."
            : "Create Event"}
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