export default function AdminDashboard() {
  return (
    <div>
      <h1 className="text-2xl md:text-3xl font-bold">
        Dashboard
      </h1>

      <p className="mt-2 text-gray-600">
        Welcome to the admin panel.
      </p>

      <div className="grid gap-4 mt-8 sm:grid-cols-2 xl:grid-cols-4">
        <div className="bg-white rounded-xl shadow p-5">
          <h3 className="text-gray-500">Books</h3>
          <p className="text-3xl font-bold mt-2">12</p>
        </div>

        <div className="bg-white rounded-xl shadow p-5">
          <h3 className="text-gray-500">Songs</h3>
          <p className="text-3xl font-bold mt-2">25</p>
        </div>

        <div className="bg-white rounded-xl shadow p-5">
          <h3 className="text-gray-500">Albums</h3>
          <p className="text-3xl font-bold mt-2">8</p>
        </div>

        <div className="bg-white rounded-xl shadow p-5">
          <h3 className="text-gray-500">Articles</h3>
          <p className="text-3xl font-bold mt-2">42</p>
        </div>
      </div>
    </div>
  );
}