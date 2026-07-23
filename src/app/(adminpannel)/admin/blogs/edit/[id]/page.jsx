import EditBlogForm from "@/components/admin/EditBlogForm";
import { getBlogs } from "../../../../../../../services/getBlogs";

export default async function EditBlogPage({ params }) {
  const { id } = await params;

  const blog = await getBlogs({
    id,
  });

  if (!blog) {
    return <h1>Blog not found</h1>;
  }

  return <EditBlogForm blog={blog} />;
}
