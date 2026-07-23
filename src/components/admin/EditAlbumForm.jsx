"use client";

import Image from "next/image";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { updateAlbum } from "@/actions/updateAlbum";

export default function EditAlbumForm({ album }) {
  const router = useRouter();

  const [message, setMessage] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      title: album.title,
      description: album.description,
    },
  });

  async function onSubmit(data) {

    const formData = new FormData();

    formData.append("id", album._id);
    formData.append("title", data.title);
    formData.append("description", data.description);

    if (data.cover?.length) {
      formData.append("cover", data.cover[0]);
    }

    const result = await updateAlbum(formData);

    setMessage(result.message);

    if (result.success) {
      setTimeout(() => {
        router.push("/admin/gallery");
        router.refresh();
      }, 1000);
    }
  }

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">Edit Album</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div>
          <label className="font-medium">Album Title</label>

          <input
            className="input input-bordered w-full mt-2"
            {...register("title", {
              required: "Title is required",

              minLength: {
                value: 3,
                message: "Minimum 3 characters",
              },
            })}
          />

          {errors.title && (
            <p className="text-red-500 text-sm">{errors.title.message}</p>
          )}
        </div>

        <div>
          <label className="font-medium">Current Cover</label>

          <Image
            src={album.coverImage}
            alt={album.title}
            width={200}
            height={150}
            className="rounded-lg mt-3 h-auto w-auto"
          />
        </div>

        <div>
          <label className="font-medium">Replace Cover(Optional)</label>

          <input
            type="file"
            accept="image/*"
            className="file-input file-input-bordered w-full mt-2"
            {...register("cover", {
              validate: {
                fileSize: (files) =>
                  !files?.length ||
                  files[0].size <= 5 * 1024 * 1024 ||
                  "Image must be below 5MB",

                fileType: (files) =>
                  !files?.length ||
                  ["image/jpeg", "image/png", "image/webp"].includes(
                    files[0].type,
                  ) ||
                  "Only JPG PNG WEBP allowed",
              },
            })}
          />
        </div>

        <div>
          <label className="font-medium">Description</label>

          <textarea
            rows={5}
            className="textarea textarea-bordered w-full mt-2"
            {...register("description", {
              required: "Description required",

              minLength: {
                value: 10,
                message: "Minimum 10 characters",
              },
            })}
          />

          {errors.description && (
            <p className="text-red-500 text-sm">{errors.description.message}</p>
          )}
        </div>

        <button disabled={isSubmitting} className="btn btn-primary">
          {isSubmitting ? "Updating..." : "Update Album"}
        </button>

        {message && <p className="text-green-600">{message}</p>}
      </form>
    </div>
  );
}
