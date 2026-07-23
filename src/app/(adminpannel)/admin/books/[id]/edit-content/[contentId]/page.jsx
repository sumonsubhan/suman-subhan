import EditContentForm from "@/components/admin/EditContentForm";
import { getContent } from "../../../../../../../../services/getContent";

export default async function EditContentPage({ params }) {
  const { contentId } = await params;

  const content = await getContent({ id: contentId });

  if (!content) {
    return <h1>Content Not Found</h1>;
  }

  return <EditContentForm content={content} />;
}
