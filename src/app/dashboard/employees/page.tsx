import { prisma } from "@/lib/prisma";
import DeleteEmployeeButton from "@/components/DeleteEmployeeButton";

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
      <td className="border p-3">{employee.name}</td>
      <td className="border p-3">{employee.email}</td>
      <td className="border p-3">
        {employee.department.name}
      </td>
      <td className="border p-3">
        {employee.designation}
      </td>

      <td className="border p-3">
        <a
          href={`/dashboard/employees/${employee.id}/edit`}
          className="text-blue-600 hover:underline mr-3"
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