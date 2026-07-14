import { prisma } from "@/lib/prisma";
import EmployeeEditForm from "./EmployeeEditForm";

export default async function EditEmployeePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const employee = await prisma.employee.findUnique({
    where: { id },
    include: {
      department: true,
    },
  });

  const departments = await prisma.department.findMany({
    orderBy: {
      name: "asc",
    },
  });

  if (!employee) {
    return <h1>Employee not found.</h1>;
  }

  return (
    <EmployeeEditForm
      employee={employee}
      departments={departments}
    />
  );
}