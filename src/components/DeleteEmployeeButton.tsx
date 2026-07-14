"use client";

import { useRouter } from "next/navigation";
import { deleteEmployee } from "@/actions/employee";

export default function DeleteEmployeeButton({
  id,
}: {
  id: string;
}) {
  const router = useRouter();

  async function handleDelete() {
    const confirmed = window.confirm(
      "Are you sure you want to delete this employee?"
    );

    if (!confirmed) return;

    await deleteEmployee(id);

    router.refresh();
  }

  return (
    <button
      onClick={handleDelete}
      className="ml-4 text-red-600 hover:underline"
    >
      Delete
    </button>
  );
}