"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";

import { addEvent } from "@/actions/addEvent";

export default function AddEvents() {
  const [message, setMessage] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = async (data) => {
    console.log(data);
    const formData = new FormData();

    formData.append("title", data.title);
    formData.append("coverImage", data.cover[0]);

    console.log(formData);
    const result = await addEvent(formData);

    setMessage(result.message);

    if (result.success) {
      reset();
    }
  };

  return (
    <section className="max-w-5xl mx-auto bg-white rounded-xl shadow p-8">
      <h1 className="text-3xl font-bold mb-8">Add Event</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Event Title */}

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
            {...register("cover", { required: true })}
            className="file-input file-input-bordered w-full mt-2"
          />
          {errors.cover && (
            <p className="text-red-500 text-sm mt-1">
              Cover image is required.
            </p>
          )}
        </div>

        <button disabled={isSubmitting} className="btn btn-primary">
          {isSubmitting ? "Uploading..." : "Add Event"}
        </button>

        {message && <p className="text-green-600 font-medium">{message}</p>}
      </form>
    </section>
  );
}
