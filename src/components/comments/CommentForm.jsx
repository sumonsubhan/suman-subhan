"use client";

import { addComment } from "@/actions/addComment";
import { useState } from "react";
import { useForm } from "react-hook-form";

export default function CommentForm({
  contentId,
  contentType,
  contentTitle,
  path,
}) {
  const [message, setMessage] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();

  async function onSubmit(data) {
    setMessage("");

    const formData = new FormData();

    formData.append("contentId", contentId);
    formData.append("contentType", contentType);
    formData.append("contentTitle", contentTitle);
    formData.append("path", path);

    formData.append("name", data.name);
    formData.append("email", data.email);
    formData.append("comment", data.comment);

    // Honeypot
    formData.append("website", data.website || "");

    const result = await addComment(formData);

    setMessage(result.message);

    if (result.success) {
      reset();
    }
  }

  return (
    <div className="rounded-2xl border bg-white p-8 shadow-sm">
      <h3 className="mb-6 text-2xl font-bold">
        আপনার মন্তব্য লিখুন
      </h3>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-5"
      >
        {/* Honeypot */}
        <input
          type="text"
          className="hidden"
          tabIndex={-1}
          autoComplete="off"
          {...register("website")}
        />

        <div>
          <input
            placeholder="আপনার নাম"
            className="input input-bordered w-full"
            {...register("name", {
              required: "নাম লিখুন",
            })}
          />

          {errors.name && (
            <p className="mt-1 text-sm text-red-500">
              {errors.name.message}
            </p>
          )}
        </div>

        <div>
          <input
            type="email"
            placeholder="ইমেইল"
            className="input input-bordered w-full"
            {...register("email", {
              required: "ইমেইল লিখুন",
            })}
          />

          {errors.email && (
            <p className="mt-1 text-sm text-red-500">
              {errors.email.message}
            </p>
          )}
        </div>

        <div>
          <textarea
            rows={6}
            placeholder="আপনার মন্তব্য..."
            className="textarea textarea-bordered w-full"
            {...register("comment", {
              required: "মন্তব্য লিখুন",
              minLength: {
                value: 3,
                message: "মন্তব্য কমপক্ষে ৩ অক্ষরের হতে হবে।",
              },
              maxLength: {
                value:500,
                message: "মন্তব্য সর্বোচ্চ ৫০০ অক্ষরের হতে পারবে।"
              }
            })}
          />

          {errors.comment && (
            <p className="mt-1 text-sm text-red-500">
              {errors.comment.message}
            </p>
          )}
        </div>

        <button
          disabled={isSubmitting}
          className="btn btn-primary"
        >
          {isSubmitting
            ? "পাঠানো হচ্ছে..."
            : "মন্তব্য পাঠান"}
        </button>

        {message && (
          <p
            className={`font-medium ${
              message.includes("submitted")
                ? "text-green-600"
                : "text-red-500"
            }`}
          >
            {message}
          </p>
        )}

        <p className="text-sm text-gray-500">
          আপনার মন্তব্য অনুমোদনের পর প্রকাশিত হবে।
        </p>
      </form>
    </div>
  );
}