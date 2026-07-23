"use client";

import Image from "next/image";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { updatePhoto } from "@/actions/updatePhoto";
import { useRouter } from "next/navigation";

export default function EditPhotoForm({ photo }) {
  const router = useRouter();

  const [message, setMessage] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      caption: photo.caption,
    },
  });

  async function onSubmit(data) {

    const formData = new FormData();
    formData.append("id", photo._id);
    formData.append("caption", data.caption);

    const result = await updatePhoto(formData);

    setMessage(result.message);

    if (result.success) {
      setTimeout(() => {
        router.back();
        router.refresh();
      }, 1000);
    }
  }

  return (
    <div className="max-w-2xl mx-auto bg-white rounded-xl shadow p-8">
      <h1 className="text-3xl font-bold mb-8">Edit Photo</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div>
          <label className="font-medium">Current Photo</label>

          <Image
            src={photo.imageUrl}
            alt={photo.caption}
            width={300}
            height={300}
            className="rounded-lg mt-3 h-auto w-auto"
          />
        </div>

        <div>
          <label className="font-medium">Caption</label>

          <textarea
            rows={5}
            className="textarea textarea-bordered w-full mt-2"
            {...register("caption", {
              required: "Caption is required",

              maxLength: {
                value: 300,
                message: "Maximum 300 characters",
              },
            })}
          />

          {errors.caption && (
            <p className="text-red-500 text-sm">{errors.caption.message}</p>
          )}
        </div>

        <button disabled={isSubmitting} className="btn btn-primary">
          {isSubmitting ? "Updating..." : "Update Photo"}
        </button>

        {message && <p className="text-green-600">{message}</p>}
      </form>
    </div>
  );
}
