import { prisma } from "@/lib/prisma";

export default async function DashboardPage() {
  const totalEmployees = await prisma.employee.count();

  const totalDepartments = await prisma.department.count();

  const salary = await prisma.employee.aggregate({
    _sum: {
      salary: true,
    },
  });

  const recentEmployees = await prisma.employee.findMany({
    take: 5,
    orderBy: {
      createdAt: "desc",
    },
    include: {
      department: true,
    },
  });

  return (
    <div>
      <h1 className="mb-8 text-4xl font-bold">
        Dashboard
      </h1>

      <div className="grid gap-6 md:grid-cols-3">
        <div className="rounded-xl bg-blue-600 p-6 text-white">
          <h2>Total Employees</h2>

          <p className="mt-3 text-4xl font-bold">
            {totalEmployees}
          </p>
        </div>

        <div className="rounded-xl bg-green-600 p-6 text-white">
          <h2>Total Departments</h2>

          <p className="mt-3 text-4xl font-bold">
            {totalDepartments}
          </p>
        </div>

        <div className="rounded-xl bg-purple-600 p-6 text-white">
          <h2>Total Salary</h2>

          <p className="mt-3 text-4xl font-bold">
            ৳ {salary._sum.salary?.toLocaleString() ?? 0}
          </p>
        </div>
      </div>

      <h2 className="mt-10 mb-4 text-2xl font-bold">
        Recent Employees
      </h2>

      <table className="w-full border bg-white">
        <thead>
          <tr className="bg-gray-100">
            <th className="border p-3">Name</th>
            <th className="border p-3">Department</th>
            <th className="border p-3">Designation</th>
          </tr>
        </thead>

        <tbody>
          {recentEmployees.map((employee) => (
            <tr key={employee.id}>
              <td className="border p-3">
                {employee.name}
              </td>

              <td className="border p-3">
                {employee.department.name}
              </td>

              <td className="border p-3">
                {employee.designation}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}