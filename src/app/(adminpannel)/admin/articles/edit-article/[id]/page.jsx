import EditArticleForm from "@/components/admin/EditArticleForm";
import { getArticles } from "../../../../../../../services/getArticle";

export default async function EditArticlePage({ params }) {
  const { id } = await params;

  const article = await getArticles({
    id
  });

  return (
    <EditArticleForm article={article} />
  );
}