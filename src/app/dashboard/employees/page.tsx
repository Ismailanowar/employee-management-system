import { prisma } from "@/lib/prisma";
import DeleteEmployeeButton from "@/components/DeleteEmployeeButton";
import ExportEmployeesButton from "@/components/ExportEmployeesButton";

export default async function EmployeesPage({
  searchParams,
}: {
  searchParams: Promise<{
    search?: string;
    page?: string;
  }>;
}) {
  const { search = "", page = "1" } = await searchParams;

  const currentPage = Number(page);
  const pageSize = 10;

  const where = {
    OR: [
      {
        name: {
          contains: search,
          mode: "insensitive" as const,
        },
      },
      {
        email: {
          contains: search,
          mode: "insensitive" as const,
        },
      },
      {
        designation: {
          contains: search,
          mode: "insensitive" as const,
        },
      },
      {
        department: {
          name: {
            contains: search,
            mode: "insensitive" as const,
          },
        },
      },
    ],
  };

  const totalEmployees = await prisma.employee.count({
    where,
  });

  const totalPages = Math.ceil(totalEmployees / pageSize);

  const employees = await prisma.employee.findMany({
    where,
    include: {
      department: true,
    },
    orderBy: {
      createdAt: "desc",
    },
    skip: (currentPage - 1) * pageSize,
    take: pageSize,
  });

  return (
    <div>
      <h1 className="mb-6 text-3xl font-bold">
        Employees
      </h1>
<div className="mb-6">
  <ExportEmployeesButton />
</div>
      <form className="mb-6">
        <input
          type="text"
          name="search"
          defaultValue={search}
          placeholder="Search by name, email, department..."
          className="w-full max-w-md rounded border p-3"
        />

        <button
          type="submit"
          className="ml-2 rounded bg-blue-600 px-4 py-3 text-white"
        >
          Search
        </button>

        <div className="mt-6 flex items-center gap-4">
          {currentPage > 1 && (
            <a
              href={`?search=${search}&page=${currentPage - 1}`}
              className="rounded border px-3 py-2"
            >
              Previous
            </a>
          )}

          <span>
            Page {currentPage} of {totalPages || 1}
          </span>

          {currentPage < totalPages && (
            <a
              href={`?search=${search}&page=${currentPage + 1}`}
              className="rounded border px-3 py-2"
            >
              Next
            </a>
          )}
        </div>
      </form>

      {employees.length === 0 ? (
        <p className="text-gray-500">
          No employees found.
        </p>
      ) : (
        <table className="w-full border bg-white">
          <thead>
            <tr className="bg-gray-100">
              <th className="border p-3">Name</th>
              <th className="border p-3">Email</th>
              <th className="border p-3">Department</th>
              <th className="border p-3">Designation</th>
              <th className="border p-3">Action</th>
            </tr>
          </thead>

          <tbody>
            {employees.map((employee) => (
              <tr key={employee.id}>
                <td className="border p-3">
                  {employee.name}
                </td>

                <td className="border p-3">
                  {employee.email}
                </td>

                <td className="border p-3">
                  {employee.department.name}
                </td>

                <td className="border p-3">
                  {employee.designation}
                </td>

                <td className="border p-3">
                  <a
                    href={`/dashboard/employees/${employee.id}/edit`}
                    className="mr-3 text-blue-600 hover:underline"
                  >
                    Edit
                  </a>

                  <DeleteEmployeeButton id={employee.id} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}