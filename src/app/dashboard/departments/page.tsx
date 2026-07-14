import { prisma } from "@/lib/prisma";
import DeleteDepartmentButton from "@/components/DeleteDepartmentButton";

export default async function DepartmentsPage() {
  const departments = await prisma.department.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <div>
      <h1 className="mb-6 text-3xl font-bold">Departments</h1>

      {departments.length === 0 ? (
        <p className="text-gray-500">No departments found.</p>
      ) : (
        <table className="w-full border border-gray-300 bg-white">
          <thead>
            <tr className="bg-gray-100">
              <th className="border p-3">Actions</th>
              <th className="border p-3 text-left">Name</th>
              <th className="border p-3 text-left">Description</th>
            </tr>
          </thead>

          <tbody>
            {departments.map((department) => (
              <tr key={department.id}>
                <td className="border p-3">
                  <a
                    href={`/dashboard/departments/${department.id}/edit`}
                    className="text-blue-600 hover:underline"
                  >
                    Edit
                  </a>
         <DeleteDepartmentButton id={department.id} />
                </td>

                <td className="border p-3">
                  {department.name}
                </td>

                <td className="border p-3">
                  {department.description || "-"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}