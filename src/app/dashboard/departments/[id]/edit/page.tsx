import EditDepartmentForm from "./EditDepartmentForm";
import { prisma } from "@/lib/prisma";

export default async function EditDepartmentPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const department = await prisma.department.findUnique({
    where: { id },
  });

  if (!department) {
    return <h1>Department not found.</h1>;
  }

  return <EditDepartmentForm department={department} />;
}