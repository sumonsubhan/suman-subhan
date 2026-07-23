"use client";

import { Controller, useForm } from "react-hook-form";
import { useState } from "react";
import TiptapEditor from "@/components/editor/TipTapEditor";
import { updateArticle } from "@/actions/updateArticle";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function EditArticleForm({ article }) {
    const router = useRouter();
  const [message, setMessage] = useState("");

  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      title: article.title,
      shortNote: article.shortNote,
      content: article.content,
    },
  });

  async function onSubmit(data) {
    const formData = new FormData();

    formData.append("id", article._id);
    formData.append("title", data.title);
    formData.append("shortNote", data.shortNote);
    formData.append("content", data.content);

    if (data.cover?.length) {
      formData.append("coverImage", data.cover[0]);
    }

    const result = await updateArticle(formData);

    setMessage(result.message);

    if (result.success) {
      setTimeout(() => {
        router.back();
        router.refresh();
      }, 1000);
    }
  }

  return (
    <section className="max-w-5xl mx-auto bg-white rounded-xl shadow p-8">
      <h1 className="text-3xl font-bold mb-8">Edit Article</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div>
          <label>Title</label>

          <input
            className="input input-bordered w-full mt-2"
            {...register("title", {
              required: true,
            })}
          />

          {errors.title && <p className="text-red-500">Title is required</p>}
        </div>

        <div>
          <label className="font-medium">Current Cover</label>

          <Image
            src={article.coverImage}
            alt={article.title}
            width={200}
            height={150}
            className="rounded-lg mt-3 h-auto w-auto"
          />
        </div>

        <div>
          <label>Replace Cover (optional)</label>

          <input
            type="file"
            className="file-input file-input-bordered w-full"
            accept="image/*"
            {...register("cover")}
          />
        </div>

        <div>
          <label>Short Note</label>

          <textarea
            rows={4}
            className="textarea textarea-bordered w-full mt-2"
            {...register("shortNote", {
              required: true,
            })}
          />

          {errors.shortNote && <p className="text-red-500">Required</p>}
        </div>

        <div>
          <label>Content</label>

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

          {errors.content && <p className="text-red-500 mt-2">Required</p>}
        </div>

        <button className="btn btn-primary" disabled={isSubmitting}>
          {isSubmitting ? "Saving..." : "Update Article"}
        </button>

        {message && <p className="text-green-600">{message}</p>}
      </form>
    </section>
  );
}
