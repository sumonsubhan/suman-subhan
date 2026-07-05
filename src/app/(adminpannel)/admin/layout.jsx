import { auth } from "@/app/auth";
import AdminHeader from "@/components/admin/AdminHeader";
import AdminSidebar from "@/components/admin/AdminSidebar";
import { redirect } from "next/navigation";

export default async function AdminLayout({ children }) {

  const session = await auth();

  if(!session){
    redirect("/login");
  }
  return (
    <div className="min-h-screen bg-gray-100">
      <AdminSidebar />

      <div className="lg:ml-72">
        <AdminHeader user={session.user}/>

        <main className="p-4 md:p-6 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}