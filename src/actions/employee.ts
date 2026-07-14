"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function createEmployee(data: {
  name: string;
  email: string;
  phone: string;
  designation: string;
  salary: number;
  joiningDate: string;
  departmentId: string;
}) {
  const existingEmployee = await prisma.employee.findUnique({
    where: {
      email: data.email,
    },
  });

  if (existingEmployee) {
    return {
      success: false,
      message: "Employee email already exists.",
    };
  }

  await prisma.employee.create({
    data: {
      name: data.name,
      email: data.email,
      phone: data.phone,
      designation: data.designation,
      salary: data.salary,
      joiningDate: new Date(data.joiningDate),
      departmentId: data.departmentId,
    },
  });

  revalidatePath("/dashboard/employees");

  return {
    success: true,
    message: "Employee added successfully.",
  };
}

export async function updateEmployee(
  id: string,
  data: {
    name: string;
    email: string;
    phone: string;
    designation: string;
    salary: number;
    joiningDate: string;
    departmentId: string;
  }
) {
  await prisma.employee.update({
    where: {
      id,
    },
    data: {
      name: data.name,
      email: data.email,
      phone: data.phone,
      designation: data.designation,
      salary: data.salary,
      joiningDate: new Date(data.joiningDate),
      departmentId: data.departmentId,
    },
  });

  revalidatePath("/dashboard/employees");

  return {
    success: true,
    message: "Employee updated successfully.",
  };
}

export async function deleteEmployee(id: string) {
  await prisma.employee.delete({
    where: {
      id,
    },
  });

  revalidatePath("/dashboard/employees");

  return {
    success: true,
  };
}