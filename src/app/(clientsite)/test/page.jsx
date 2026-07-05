"use client";

import { createAdmin } from "@/actions/createAdmin";


export default function Page() {
  return (
    <button
      onClick={async () => {
        console.log(await createAdmin());
      }}
    >
      Create Admin
    </button>
  );
}