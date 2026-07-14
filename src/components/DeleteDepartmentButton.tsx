"use client";

import { useRouter } from "next/navigation";
import { deleteDepartment } from "@/actions/department";

export default function DeleteDepartmentButton({
  id,
}: {
  id: string;
}) {
  const router = useRouter();

  async function handleDelete() {
    const confirmed = confirm(
      "Are you sure you want to delete this department?"
    );

    if (!confirmed) return;

    await deleteDepartment(id);

    router.refresh();
  }

  return (
    <button
      onClick={handleDelete}
      className="text-red-600 hover:underline ml-4"
    >
      Delete
    </button>
  );
}