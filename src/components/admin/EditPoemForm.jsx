"use client";

import Image from "next/image";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { useRouter } from "next/navigation";

import { updatePoem } from "@/actions/updatePoem";

export default function EditPoemForm({ poem }) {
  const router = useRouter();

  const [message, setMessage] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      title: poem.title,
      bookTitle: poem.bookTitle,
      videoURL: poem.videoURL,
      purchaseURL: poem.purchaseURL || "",
      description: poem.description,
    },
  });

  async function onSubmit(data) {

    const formData = new FormData();

    formData.append("id", poem._id);
    formData.append("title", data.title);
    formData.append("bookTitle", data.bookTitle);
    formData.append("videoURL", data.videoURL);
    formData.append("purchaseURL", data.purchaseURL || "");
    formData.append("description", data.description);

    if (data.cover?.length > 0) {
      formData.append("cover", data.cover[0]);
    }

    const result = await updatePoem(formData);

    setMessage(result.message);

    if (result.success) {
      router.push("/admin/poems");
      router.refresh();
    }
  }

  return (
    <div className="max-w-3xl mx-auto bg-white rounded-xl shadow p-8">
      <h1 className="text-3xl font-bold mb-8">Edit Poem</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div>
          <label className="font-medium">Poem Title</label>

          <input
            className="input input-bordered w-full mt-2"
            {...register("title", {
              required: "Title is required",
            })}
          />
        </div>

        <div>
          <label className="font-medium">Current Cover</label>

          <Image
            src={poem.coverImage}
            alt={poem.title}
            width={180}
            height={180}
            className="rounded-lg mt-3 h-auto w-auto"
          />
        </div>

        <div>
          <label className="font-medium">Replace Cover (Optional)</label>

          <input
            type="file"
            accept="image/*"
            className="file-input file-input-bordered w-full mt-2"
            {...register("cover")}
          />
        </div>

        <div>
          <label>YouTube Video URL</label>

          <input
            className="input input-bordered w-full mt-2"
            {...register("videoURL", {
              required: true,
            })}
          />
        </div>

        <div>
          <label>Book Title</label>

          <input
            className="input input-bordered w-full mt-2"
            {...register("bookTitle", {
              required: true,
            })}
          />
        </div>

        <div>
          <label>Purchase URL</label>

          <input
            className="input input-bordered w-full mt-2"
            {...register("purchaseURL")}
          />
        </div>

        <div>
          <label>Description</label>

          <textarea
            rows={5}
            className="textarea textarea-bordered w-full mt-2"
            {...register("description", {
              required: true,
            })}
          />
        </div>

        <button disabled={isSubmitting} className="btn btn-primary">
          {isSubmitting ? "Updating..." : "Update Poem"}
        </button>

        {message && <p className="text-green-600 font-medium">{message}</p>}
      </form>
    </div>
  );
}
