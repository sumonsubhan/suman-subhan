"use client";

import { deletePhoto } from "@/actions/deletePhoto";
import { useRouter } from "next/navigation";
import React from "react";
import { MdDelete } from "react-icons/md";
import Swal from "sweetalert2";

const DeleteButton = ({ photoId }) => {
  const router = useRouter();

  const handleDelete = async (photoId) => {
    const swalResult = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    });

    if (!swalResult.isConfirmed) return;

    const result = await deletePhoto(photoId);

    if (result.success) {
      await Swal.fire({
        title: "Deleted!",
        text: result.message,
        icon: "success",
      });

      router.refresh(); 
    } else {
      Swal.fire({
        title: "Error!",
        text: result.message,
        icon: "error",
      });
    }
  };

  return (
    <div>
      <button
        onClick={() => handleDelete(photoId)}
        className="btn btn-sm btn-error text-xl"
      >
        <MdDelete />
      </button>
    </div>
  );
};

export default DeleteButton;
