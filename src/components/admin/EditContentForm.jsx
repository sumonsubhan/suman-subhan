"use client";

import Image from "next/image";
import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { useRouter } from "next/navigation";

import TiptapEditor from "@/components/editor/TipTapEditor";
import { updateContent } from "@/actions/updateContent";

export default function EditContentForm({ content }) {
  const router = useRouter();

  const [message, setMessage] = useState("");

  const {
    register,
    handleSubmit,
    control,
    watch,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      title: content.title,

      shortNote: content.shortNote,

      content: content.content,
    },
  });

  async function onSubmit(data) {
    const formData = new FormData();

    formData.append("id", content._id);
    formData.append("title", data.title);
    formData.append("shortNote", data.shortNote);
    formData.append("content", data.content);

    if (data.coverImage?.length) {
      formData.append("coverImage", data.coverImage[0]);
    }

    const result = await updateContent(formData);

    setMessage(result.message);

    if (result.success) {
      router.push(`/admin/books/${content.bookId}`);
      router.refresh();
    }
  }

  return (
    <div className="max-w-3xl mx-auto bg-white rounded-xl shadow p-8">
      <h1 className="text-3xl font-bold mb-8">Edit Content</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div>
          <label className="font-medium">Title</label>

          <input
            className="input input-bordered w-full mt-2"
            {...register("title", {
              required: true,
            })}
          />
        </div>

        <div>
          <label className="font-medium">Current Cover</label>

          <Image
            src={content.coverImage}
            alt={content.title}
            width={150}
            height={150}
            className="rounded-lg mt-3 h-auto w-auto"
          />
        </div>

        <div>
          <label className="font-medium">Replace Cover</label>

          <input
            type="file"
            accept="image/*"
            className="file-input file-input-bordered w-full mt-2"
            {...register("coverImage")}
          />
        </div>

        <div>
          <label>Short Note</label>

          <textarea
            rows={4}
            className="textarea textarea-bordered w-full"
            {...register("shortNote", {
              required: true,
              maxLength: {
                value: 300,
                message: "Maximum 300 characters",
              },
            })}
          />
        </div>

        <div>
          <label className="font-medium">Content</label>

          <Controller
            name="content"
            control={control}
            rules={{
              required: true,
            }}
            render={({ field }) => (
              <TiptapEditor value={field.value} onChange={field.onChange} />
            )}
          />
        </div>

        <button disabled={isSubmitting} className="btn btn-primary">
          {isSubmitting ? "Updating..." : "Update Content"}
        </button>

        {message && <p className="text-green-600">{message}</p>}
      </form>
    </div>
  );
}
