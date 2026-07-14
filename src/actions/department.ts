"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function createDepartment(
  name: string,
  description: string
) {
  if (!name.trim()) {
    return {
      success: false,
      message: "Department name is required.",
    };
  }

  await prisma.department.create({
    data: {
      name,
      description,
    },
  });

  revalidatePath("/dashboard/departments");

  return {
    success: true,
    message: "Department created successfully.",
  };
}

export async function updateDepartment(
  id: string,
  name: string,
  description: string
) {
  if (!name.trim()) {
    return {
      success: false,
      message: "Department name is required.",
    };
  }

  await prisma.department.update({
    where: { id },
    data: {
      name,
      description,
    },
  });

  revalidatePath("/dashboard/departments");

  return {
    success: true,
    message: "Department updated successfully.",
  };
}

export async function deleteDepartment(id: string) {
  await prisma.department.delete({
    where: {
      id,
    },
  });

  revalidatePath("/dashboard/departments");

  return {
    success: true,
  };
}