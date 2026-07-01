"use client";

import { deleteBook } from "@/actions/deleteBook";
import { useRouter } from "next/navigation";
import { MdDelete } from "react-icons/md";
import Swal from "sweetalert2";

export default function DeleteBook({ id, imageId }) {
  const router = useRouter();

  const handleDelete = async () => {
    const result = await Swal.fire({
      title: "Delete Book?",
      text: "This action cannot be undone.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Delete",
      cancelButtonText: "Cancel",
      confirmButtonColor: "#d33",
    });

    if (!result.isConfirmed) return;

    const response = await deleteBook(id, imageId);

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
      <MdDelete size={18} />
    </button>
  );
}