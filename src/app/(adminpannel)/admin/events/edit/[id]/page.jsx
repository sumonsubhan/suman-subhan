import EditEventForm from "@/components/admin/EditEventForm";
import { getEvents } from "../../../../../../../services/getEvents";

export default async function EditEventPage({ params }) {
  const { id } = await params;

  const event = await getEvents({
    id,
  });

  if (!event) {
    return <h1>Event not found</h1>;
  }

  return <EditEventForm event={event} />;
}
