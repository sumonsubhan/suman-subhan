"use client";

import { addArticle } from "@/actions/addArticle";
import TiptapEditor from "@/components/editor/TipTapEditor";
import { useParams } from "next/navigation";
import { useState } from "react";
import { useForm, Controller } from "react-hook-form";

export default function AddArticle() {
  const params = useParams();
  const id = params.id;

  const [message, setMessage] = useState("");

  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      content: "",
    },
  });

  const onSubmit = async (data) => {
    console.log(data);
    const formData = new FormData();

    formData.append("categoryId", id);
    formData.append("title", data.title);
    formData.append("coverImage", data.cover[0]);
    formData.append("shortNote", data.shortNote);
    formData.append("content", data.content);

    const result = await addArticle(formData);

    setMessage(result.message);

    if (result.success) {
      reset();
    }
  };

  return (
    <section className="max-w-5xl mx-auto bg-white rounded-xl shadow p-8">
      <h1 className="text-3xl font-bold mb-8">Add New Article</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Articel Name */}

        <div>
          <label className="font-medium">Title</label>

          <input
            {...register("title", {
              required: true,
            })}
            className="input input-bordered w-full mt-2"
          />

          {errors.title && (
            <p className="text-red-500 text-sm mt-1">Title is required.</p>
          )}
        </div>

        {/* Cover */}
        <div>
          <label className="font-medium">Cover Image</label>

          <input
            type="file"
            accept="image/*"
            {...register("cover", {required: true})}
            className="file-input file-input-bordered w-full mt-2"
          />
          {errors.cover && (
            <p className="text-red-500 text-sm mt-1">
              Cover image is required.
            </p>
          )}
        </div>

        {/* Short Note */}

        <div>
          <label className="font-medium">Short Note</label>

          <textarea
            rows={4}
            {...register("shortNote", {required: true})}
            className="textarea textarea-bordered w-full mt-2"
            placeholder="Write a short introduction..."
          />
          {errors.shortNote && (
            <p className="text-red-500 text-sm mt-1">
              Short note is required.
            </p>
          )}
        </div>

        {/* Article Content */}

        <div>
          <label className="font-medium mb-2 block">Article Content</label>

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

          {errors.content && (
            <p className="text-red-500 mt-2">Content is required.</p>
          )}
        </div>

        <button disabled={isSubmitting} className="btn btn-primary">
          {isSubmitting ? "Uploading..." : "Add Article"}
        </button>

        {message && <p className="text-green-600 font-medium">{message}</p>}
      </form>
    </section>
  );
}
