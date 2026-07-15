"use server";

import { prisma } from "@/lib/prisma";

export async function getEmployeesForExport() {
  const employees = await prisma.employee.findMany({
    include: {
      department: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return employees.map((employee) => ({
    Name: employee.name,
    Email: employee.email,
    Phone: employee.phone ?? "",
    Department: employee.department.name,
    Designation: employee.designation,
    Salary: employee.salary,
    JoiningDate: employee.joiningDate.toISOString().split("T")[0],
  }));
}