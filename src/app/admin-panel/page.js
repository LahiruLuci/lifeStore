import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import AdminDashboard from "./AdminDashboard";

export default function AdminPanelPage() {
  const cookieStore = cookies();
  const authCookie = cookieStore.get("admin_auth");

  if (!authCookie || authCookie.value !== "1") {
    redirect("/admin-panel/login");
  }

  return <AdminDashboard />;
}
