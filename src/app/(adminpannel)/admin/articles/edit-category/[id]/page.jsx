import EditCategoryForm from "@/components/admin/EditCategoryForm";
import { getArticleCategories } from "../../../../../../../services/getArticleCategories";

export default async function EditCategoryPage({ params }) {
  const { id } = await params;

  const category = await getArticleCategories({
    id,
  });

  if (!category) {
    return <h1>Category not found.</h1>;
  }

  return <EditCategoryForm category={category} />;
}
