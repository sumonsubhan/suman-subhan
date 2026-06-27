import React from "react";
import { getSongs } from "../../../../../services/getSongs";
import Link from "next/link";

const Songs = () => {
    const songs = getSongs();
  return (
    <div>
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-bold">সুরসুধা</h1>
        <Link href="/admin/songs/add-song" className="btn btn-primary">Add Song</Link>
      </div>
    </div>
  );
};

export default Songs;
