"use client";

import Image from "next/image";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { updateBlog } from "@/actions/updateBlog";


export default function EditBlogForm({ blog }) {
  const router = useRouter();

  const [message, setMessage] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      title: blog.title,
      videoURL: blog.videoURL,
      description: blog.description,
    },
  });

  async function onSubmit(data) {

    const formData = new FormData();
    formData.append("id", blog._id);
    formData.append("title", data.title);
    formData.append("videoURL", data.videoURL);
    formData.append("description", data.description);

    // optional image

    if (data.cover?.length > 0) {
      formData.append("cover", data.cover[0]);
    }

    const result = await updateBlog(formData);

    setMessage(result.message);

    if (result.success) {
      setTimeout(() => {
        router.push("/admin/blogs");
        router.refresh();
      }, 1000);
    }
  }

  return (
    <div className="max-w-3xl mx-auto bg-white rounded-xl shadow p-8">
      <h1 className="text-3xl font-bold mb-8">Edit Blog</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Title */}

        <div>
          <label className="font-medium">Blog Title</label>

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
            src={blog.coverImage}
            alt={blog.title}
            width={200}
            height={200}
            className="rounded-lg object-cover h-auto w-auto"
          />
        </div>

        {/* New Image */}

        <div>
          <label className="font-medium">Replace Cover (Optional)</label>

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
        </div>

        {/* Video URL */}
        <div>
          <label className="font-medium">YouTube URL</label>

          <input
            className="input input-bordered w-full mt-2"
            {...register("videoURL", {
              required: "Video URL required",
            })}
          />
        </div>

        {/* Description */}
        <div>
          <label className="font-medium">Description</label>

          <textarea
            rows={5}
            className="textarea textarea-bordered w-full mt-2"
            {...register("description", {
              required: "Description required",
            })}
          />
        </div>

        <button disabled={isSubmitting} className="btn btn-primary">
          {isSubmitting ? "Updating..." : "Update Blog"}
        </button>

        {message && <p className="text-green-600 font-medium">{message}</p>}
      </form>
    </div>
  );
}
