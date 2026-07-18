"use client";

import { deleteComment } from "@/actions/deleteComment";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";

export default function DeleteButton({ id }) {
  const router = useRouter();

  const handleDelete = async () => {
    const result = await Swal.fire({
      title: "Delete Comment?",
      text: "This action cannot be undone.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Delete",
      cancelButtonText: "Cancel",
      confirmButtonColor: "#d33",
    });

    if (!result.isConfirmed) return;

    const response = await deleteComment(id);

    if (response.success) {
      await Swal.fire({
        icon: "success",
        title: "Deleted",
        text: response.message,
        timer: 1500,
        showConfirmButton: false,
      });

      router.refresh();
    } else {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: response.message,
      });
    }
  };

  return (
    <button
      onClick={handleDelete}
      className="btn btn-sm btn-error"
    >
      Delete
    </button>
  );
}