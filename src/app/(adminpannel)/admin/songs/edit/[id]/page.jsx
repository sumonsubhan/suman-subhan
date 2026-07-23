import EditSongForm from "@/components/admin/EditSongForm";
import { getSongs } from "../../../../../../../services/getSongs";

export default async function EditSongPage({ params }) {
  const { id } = await params;

  const song = await getSongs({
    id,
  });

  if (!song) {
    return <h1>Song Not Found</h1>;
  }

  return <EditSongForm song={song} />;
}
