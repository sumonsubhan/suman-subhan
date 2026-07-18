"use client";

import { approveComment } from "@/actions/approveComment";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";

export default function ApproveButton({ id }) {
  const router = useRouter();

  const handleApprove = async () => {
    const result = await Swal.fire({
      title: "Approve Comment?",
      text: "This comment will become visible to everyone.",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Approve",
      cancelButtonText: "Cancel",
      confirmButtonColor: "#16a34a",
    });

    if (!result.isConfirmed) return;

    const response = await approveComment(id);

    if (response.success) {
      await Swal.fire({
        icon: "success",
        title: "Approved",
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
      onClick={handleApprove}
      className="btn btn-sm btn-success"
    >
      approve
    </button>
  );
}