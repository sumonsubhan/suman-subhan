"use client";

import { deleteSubAlbum } from "@/actions/deleteSubAlbum";
import { useRouter } from "next/navigation";
import { MdDelete } from "react-icons/md";
import Swal from "sweetalert2";

export default function DeleteSubAlbum({ id, albumId }) {
  const router = useRouter();

  const handleDelete = async () => {
    const result = await Swal.fire({
      title: "Delete Event?",
      text: "The event must be empty before it can be deleted.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Delete",
      cancelButtonText: "Cancel",
      confirmButtonColor: "#d33",
    });

    if (!result.isConfirmed) return;

    const response = await deleteSubAlbum({
      id,
      albumId,
    });

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
        title: "Cannot Delete",
        text: response.message,
      });
    }
  };

  return (
    <button
      onClick={handleDelete}
      className="btn btn-sm btn-error"
      title="Delete Event"
    >
      <MdDelete size={18} />
    </button>
  );
}
