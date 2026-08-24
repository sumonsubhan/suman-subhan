"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
import { updateSubAlbum } from "@/actions/updateSubAlbum";


export default function EditSubAlbum({
  subAlbum,
  albumId,
}) {
  const router = useRouter();

  const [message, setMessage] = useState("");

  const {
    register,
    handleSubmit,
    formState: {
      errors,
      isSubmitting,
    },
  } = useForm({
    defaultValues: {
      title: subAlbum.title,
      description: subAlbum.description,
    },
  });

  const onSubmit = async (data) => {
    setMessage("");

    const formData = new FormData();

    formData.append("id", subAlbum._id);
    formData.append("albumId", albumId);
    formData.append("title", data.title);
    formData.append(
      "description",
      data.description
    );

    // Only append image if admin selected a new one
    if (data.cover?.[0]) {
      formData.append(
        "cover",
        data.cover[0]
      );
    }

    const response = await updateSubAlbum(
      formData
    );

    if (response.success) {
      await Swal.fire({
        icon: "success",
        title: "Updated",
        text: response.message,
        timer: 1500,
        showConfirmButton: false,
      });

      router.push(
        `/admin/gallery/${albumId}`
      );

      router.refresh();
    } else {
      setMessage(response.message);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-6 bg-white p-8 rounded-xl shadow"
    >
      {/* Title */}
      <div>
        <label className="block mb-2 font-medium">
          Event Title
        </label>

        <input
          type="text"
          className="input input-bordered w-full"
          {...register("title", {
            required: "Event title is required",
            minLength: {
              value: 3,
              message:
                "Minimum 3 characters",
            },
          })}
        />

        {errors.title && (
          <p className="text-red-500 text-sm mt-1">
            {errors.title.message}
          </p>
        )}
      </div>

      {/* Description */}
      <div>
        <label className="block mb-2 font-medium">
          Description
        </label>

        <textarea
          rows={5}
          className="textarea textarea-bordered w-full"
          {...register("description", {
            required:
              "Description is required",
            minLength: {
              value: 10,
              message:
                "Minimum 10 characters",
            },
          })}
        />

        {errors.description && (
          <p className="text-red-500 text-sm mt-1">
            {errors.description.message}
          </p>
        )}
      </div>

      {/* Current Cover */}
      <div>
        <label className="block mb-2 font-medium">
          Current Cover
        </label>

        <img
          src={subAlbum.coverImage}
          alt={subAlbum.title}
          className="w-40 h-28 object-cover rounded-lg"
        />
      </div>

      {/* New Cover */}
      <div>
        <label className="block mb-2 font-medium">
          Change Cover
        </label>

        <input
          type="file"
          accept="image/jpeg,image/png,image/webp"
          className="file-input file-input-bordered w-full"
          {...register("cover", {
            validate: {
              fileSize: (files) =>
                !files?.[0] ||
                files[0].size <=
                  5 * 1024 * 1024 ||
                "Image must be smaller than 5 MB",

              fileType: (files) =>
                !files?.[0] ||
                [
                  "image/jpeg",
                  "image/png",
                  "image/webp",
                ].includes(files[0].type) ||
                "Only JPG, PNG and WEBP images are allowed",
            },
          })}
        />

        {errors.cover && (
          <p className="text-red-500 text-sm mt-1">
            {errors.cover.message}
          </p>
        )}
      </div>

      {/* Error */}
      {message && (
        <p className="text-red-500 font-medium">
          {message}
        </p>
      )}

      {/* Submit */}
      <button
        type="submit"
        disabled={isSubmitting}
        className="btn btn-primary"
      >
        {isSubmitting
          ? "Updating..."
          : "Update Event"}
      </button>
    </form>
  );
}