import EditPhotoForm from "@/components/admin/EditPhotoForm";
import { getPhoto } from "../../../../../../../../services/getSinglePhoto";

export default async function EditPhotoPage({ params }) {
  const { photoId } = await params;

  const photo = await getPhoto(photoId);

  if (!photo) {
    return <h1>Photo not found</h1>;
  }

  return <EditPhotoForm photo={photo} />;
}
