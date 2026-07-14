"use client";

import { useState } from "react";
import { updateDepartment } from "@/actions/department";
import { useRouter } from "next/navigation";

export default function EditDepartmentForm({
  department,
}: {
  department: {
    id: string;
    name: string;
    description: string | null;
  };
}) {
  const router = useRouter();

  const [name, setName] = useState(department.name);
  const [description, setDescription] = useState(
    department.description ?? ""
  );

  async function handleSubmit(
    e: React.FormEvent<HTMLFormElement>
  ) {
    e.preventDefault();

    const result = await updateDepartment(
      department.id,
      name,
      description
    );

    if (result.success) {
      router.push("/dashboard/departments");
      router.refresh();
    } else {
      alert(result.message);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-xl space-y-4"
    >
      <h1 className="text-3xl font-bold">
        Edit Department
      </h1>

      <input
        className="w-full rounded border p-3"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <textarea
        className="w-full rounded border p-3"
        rows={4}
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      <button
        className="rounded bg-blue-600 px-5 py-3 text-white"
      >
        Update Department
      </button>
    </form>
  );
}