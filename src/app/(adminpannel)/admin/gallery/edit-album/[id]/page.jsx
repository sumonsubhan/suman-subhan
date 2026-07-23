import EditAlbumForm from "@/components/admin/EditAlbumForm";
import { getAlbums } from "../../../../../../../services/getAlbum";

export default async function EditAlbumPage({ params }) {
  const { id } = await params;

  const album = await getAlbums({ id });

  if (!album) {
    return <h1>Album not found</h1>;
  }

  return <EditAlbumForm album={album} />;
}