import { auth } from "@/auth";
import { redirect } from "next/navigation";
import LogoutButton from "@/components/logout-button";

export default async function DashboardPage() {
  const session = await auth();

  if (!session?.user) {
    redirect("/api/auth/signin");
  }

  return (
    <main className="min-h-screen p-10">
      <h1 className="text-3xl font-bold">
        Dashboard
      </h1>

      <div className="mt-6 space-y-2">
        <p>
          <strong>Name:</strong> {session.user.name}
        </p>

        <p>
          <strong>Email:</strong> {session.user.email}
        </p>
      </div>
<div className="mt-6">
  <LogoutButton />
 </div>
    </main>
  );
}