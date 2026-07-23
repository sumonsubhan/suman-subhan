"use client";

import Image from "next/image";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";

import { updateEvent } from "@/actions/updateEvent";

export default function EditEventForm({ event }) {
  const router = useRouter();

  const [message, setMessage] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      title: event.title,
    },
  });

  async function onSubmit(data) {

    const formData = new FormData();
    formData.append("id", event._id);
    formData.append("title", data.title);

    // Only send image if changed
    if (data.cover?.length > 0) {
      formData.append("coverImage", data.cover[0]);
    }

    const result = await updateEvent(formData);

    setMessage(result.message);

    if (result.success) {
      setTimeout(() => {
        router.push("/admin/events");
        router.refresh();
      }, 1000);
    }
  }

  return (
    <div className="max-w-3xl mx-auto bg-white rounded-xl shadow p-8">
      <h1 className="text-3xl font-bold mb-8">Edit Event</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Title */}

        <div>
          <label className="font-medium">Event Title</label>

          <input
            className="input input-bordered w-full mt-2"
            {...register("title", {
              required: "Title is required",
            })}
          />

          {errors.title && (
            <p className="text-red-500 text-sm">{errors.title.message}</p>
          )}
        </div>

        {/* Existing Image */}

        <div>
          <label className="font-medium block mb-2">Current Cover</label>

          <Image
            src={event.coverImage}
            alt={event.title}
            width={200}
            height={200}
            className="rounded-lg object-cover h-auto w-auto"
          />
        </div>

        {/* New Image */}

        <div>
          <label className="font-medium">Replace Cover (optional)</label>

          <input
            type="file"
            accept="image/*"
            className="file-input file-input-bordered w-full mt-2"
            {...register("cover", {
              validate: {
                fileSize: (files) =>
                  !files?.length ||
                  files[0].size <= 5 * 1024 * 1024 ||
                  "Maximum size 5 MB",

                fileType: (files) =>
                  !files?.length ||
                  ["image/jpeg", "image/png", "image/webp"].includes(
                    files[0].type,
                  ) ||
                  "Only JPG PNG WEBP allowed",
              },
            })}
          />

          {errors.cover && (
            <p className="text-red-500 text-sm">{errors.cover.message}</p>
          )}
        </div>

        <button disabled={isSubmitting} className="btn btn-primary">
          {isSubmitting ? "Updating..." : "Update Event"}
        </button>

        {message && <p className="text-green-600 font-medium">{message}</p>}
      </form>
    </div>
  );
}
