import Link from "next/link";
import { getDashboardStats } from "../../../../services/getDashboardStats";

export default async function AdminDashboard() {

  const stats = await getDashboardStats();
  return (
    <div>
      <h1 className="text-2xl md:text-3xl font-bold">
        Dashboard
      </h1>

      <p className="mt-2 text-gray-600">
        Welcome to the admin panel.
      </p>

      <div className="grid gap-4 mt-8 sm:grid-cols-2 xl:grid-cols-4">
        <Link href="/admin/books" className="bg-white rounded-xl shadow p-5">
          <h3 className="text-gray-500">Books</h3>
          <p className="text-3xl font-bold mt-2">{stats.totalBooks}</p>
        </Link>

        <Link href="/admin/poems" className="bg-white rounded-xl shadow p-5">
          <h3 className="text-gray-500">Poems</h3>
          <p className="text-3xl font-bold mt-2">{stats.totalPoems}</p>
        </Link>

        <Link href="/admin/songs" className="bg-white rounded-xl shadow p-5">
          <h3 className="text-gray-500">Songs</h3>
          <p className="text-3xl font-bold mt-2">{stats.totalSongs}</p>
        </Link>

        <Link href="/admin/gallery" className="bg-white rounded-xl shadow p-5">
          <h3 className="text-gray-500">Photos</h3>
          <p className="text-3xl font-bold mt-2">{stats.totalPhotos}</p>
        </Link>

        <Link href="/admin/articles" className="bg-white rounded-xl shadow p-5">
          <h3 className="text-gray-500">Articles</h3>
          <p className="text-3xl font-bold mt-2">{stats.totalArticles}</p>
        </Link>

        <Link href="/admin/blogs" className="bg-white rounded-xl shadow p-5">
          <h3 className="text-gray-500">Total Blogs</h3>
          <p className="text-3xl font-bold mt-2">{stats.totalBlogs}</p>
        </Link>

        <Link href="/admin/events" className="bg-white rounded-xl shadow p-5">
          <h3 className="text-gray-500">Events</h3>
          <p className="text-3xl font-bold mt-2">{stats.totalEvents}</p>
        </Link>
      </div>
    </div>
  );
}