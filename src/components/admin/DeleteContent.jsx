"use client";

import { deleteContent } from "@/actions/deleteContent";
import { useRouter } from "next/navigation";
import { MdDelete } from "react-icons/md";
import Swal from "sweetalert2";

export default function DeleteContent({ id }) {
  const router = useRouter();

  const handleDelete = async () => {
    const result = await Swal.fire({
      title: "Delete Content?",
      text: "This action cannot be undone.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Delete",
      cancelButtonText: "Cancel",
      confirmButtonColor: "#d33",
    });

    if (!result.isConfirmed) return;

    const response = await deleteContent(id);

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