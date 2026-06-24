"use client";

import { addBook } from "@/actions/addBooks";

export default function Page() {
  const handleAddBook = async () => {
    const bookData = {
      name: "My Book",
    };

    const result = await addBook(bookData);
    console.log(result);
  };

  return (
    <button onClick={handleAddBook}>
      Add Book
    </button>
  );
}