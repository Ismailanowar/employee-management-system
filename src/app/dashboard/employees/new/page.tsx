import { prisma } from "@/lib/prisma";

export default async function EmployeesPage() {
  const employees = await prisma.employee.findMany({
    include: {
      department: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <div>
      <h1 className="mb-6 text-3xl font-bold">
        Employees
      </h1>

      {employees.length === 0 ? (
        <p>No employees found.</p>
      ) : (
        <table className="w-full border bg-white">
          <thead>
            <tr className="bg-gray-100">
              <th className="border p-3">Name</th>
              <th className="border p-3">Email</th>
              <th className="border p-3">Phone</th>
              <th className="border p-3">Department</th>
              <th className="border p-3">Designation</th>
              <th className="border p-3">Salary</th>
              <th className="border p-3">Joining Date</th>
              <th className="border p-3">Actions</th>
            </tr>
          </thead>

          <tbody>
            {employees.map((employee) => (
              <tr key={employee.id}>
                <td className="border p-3">{employee.name}</td>
                <td className="border p-3">{employee.email}</td>
                <td className="border p-3">
                  {employee.phone || "-"}
                </td>
                <td className="border p-3">
                  {employee.department.name}
                </td>
                <td className="border p-3">
                  {employee.designation}
                </td>
                <td className="border p-3">
                  ৳ {employee.salary.toLocaleString()}
                </td>
                <td className="border p-3">
                  {employee.joiningDate.toLocaleDateString()}
                </td>
                <td className="border p-3">
                  <a
                    href={`/dashboard/employees/${employee.id}/edit`}
                    className="text-blue-600 hover:underline"
                  >
                    Edit
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}