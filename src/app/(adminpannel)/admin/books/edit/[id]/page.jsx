import { notFound } from "next/navigation";
import { getBooks } from "../../../../../../../services/getBooks";
import EditBookForm from "@/components/admin/EditBookForm";

export default async function EditBook({ params }) {
  const { id } = await params;

  const book = await getBooks({id});

  if (!book) {
    return <>
      <h1>Book Not found</h1>
    </>
  }
  return <EditBookForm book={book} />;
}