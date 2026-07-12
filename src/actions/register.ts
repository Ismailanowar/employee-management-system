"use server";

import { prisma } from "@/lib/prisma";
import bcrypt from "bcrypt";

export async function registerUser(
  name: string,
  email: string,
  password: string
) {
  // Email already exists?
  const existingUser = await prisma.user.findUnique({
    where: { email },
  });

  if (existingUser) {
    return {
      success: false,
      message: "Email already exists.",
    };
  }

  // Hash password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Save user
  await prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
    },
  });

  return {
    success: true,
    message: "Registration successful.",
  };
}