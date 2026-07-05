import Image from "next/image";
import Link from "next/link";
import Pagination from "@/components/pagination/Pagination";
import { getEvents } from "../../../../../services/getEvents";
import DeleteEvent from "@/components/admin/DeleteEvent";

export default async function Events({searchParams}) {
  const search = await searchParams;
  const page = Number(search.page) || 1;

  const {events, totalPages} = await getEvents({
    page,
    limit: 10
  });

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold">
          Total Events: {events.length}
        </h1>

        <Link
          href="/admin/events/add-event"
          className="btn btn-primary"
        >
          Add Event
        </Link>
      </div>

      {/* Empty State */}
      {events.length === 0 ? (
        <div className="bg-white rounded-xl shadow p-12 text-center">
          <h2 className="text-xl font-semibold">
            No event found
          </h2>

          <p className="text-gray-500 mt-2">
            Start by adding your first event.
          </p>
        </div>
      ) : (
        <div className="overflow-x-auto rounded-xl border bg-white">
          <table className="table">
            <thead className="bg-gray-100">
              <tr>
                <th>#</th>
                <th>Cover</th>
                <th>Title</th>
                <th>Created</th>
                <th className="text-center">Action</th>
              </tr>
            </thead>

            <tbody>
              {events.map((event, index) => (
                <tr key={event._id}>
                  <td>
                    {index+1}
                  </td>
                  {/* Cover */}
                  <td>
                    <Image
                      src={event.coverImage}
                      alt={event.title}
                      width={60}
                      height={80}
                      className="rounded object-cover border"
                    />
                  </td>

                  {/* Title */}
                  <td>
                    <div>
                      <h2 className="font-semibold">
                        {event.title}
                      </h2>
                    </div>
                  </td>

                  {/* Created */}
                  <td>
                    {new Date(event.createdAt).toLocaleDateString(
                      "en-GB",
                      {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      }
                    )}
                  </td>

                  {/* Action */}
                  <td>
                    <div className="flex justify-center gap-2">
                      <Link
                        href={`/admin/events/edit/${event._id}`}
                        className="btn btn-sm btn-info"
                      >
                        Edit
                      </Link>

                      <DeleteEvent
                        id={event._id}
                        imageId={event.coverImagePublicId}
                      />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      <Pagination
        page={page}
        totalPages={totalPages}
        baseUrl={`/admin/events`}
      />
    </div>
  );
}