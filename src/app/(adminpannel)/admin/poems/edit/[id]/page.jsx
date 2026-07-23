import EditPoemForm from "@/components/admin/EditPoemForm";
import { getPoems } from "../../../../../../../services/getPoems";

export default async function EditPoemPage({ params }) {
  const { id } = await params;

  const poem = await getPoems({
    id,
  });

  if (!poem) {
    return <h1>Poem Not Found</h1>;
  }

  return <EditPoemForm poem={poem} />;
}
