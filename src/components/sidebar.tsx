import Link from "next/link";

export default function Sidebar() {
  return (
    <aside className="w-64 min-h-screen bg-slate-900 text-white p-6">
      <h2 className="text-2xl font-bold mb-8">
        EMS Admin
      </h2>

      <nav className="space-y-3">
        <Link
          href="/dashboard"
          className="block rounded p-2 hover:bg-slate-700"
        >
          Dashboard
        </Link>

        <Link
          href="/dashboard/departments"
          className="block rounded p-2 hover:bg-slate-700"
        >
          Departments
        </Link>
<Link
  href="/dashboard/departments/new"
  className="block rounded p-2 hover:bg-slate-700"
>
  Add Department
</Link>
        <Link
          href="/dashboard/employees"
          className="block rounded p-2 hover:bg-slate-700"
        >
          Employees
        </Link>
      </nav>
    </aside>
  );
}