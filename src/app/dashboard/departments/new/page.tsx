"use client";

import { useState } from "react";
import { createDepartment } from "@/actions/department";

export default function NewDepartmentPage() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [message, setMessage] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const result = await createDepartment(name, description);

    setMessage(result.message);

    if (result.success) {
      setName("");
      setDescription("");
    }
  }

  return (
    <div className="max-w-xl">
      <h1 className="mb-6 text-3xl font-bold">Add Department</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          className="w-full rounded border p-3"
          placeholder="Department Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <textarea
          className="w-full rounded border p-3"
          placeholder="Description"
          rows={4}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <button
          className="rounded bg-blue-600 px-6 py-3 text-white"
          type="submit"
        >
          Save Department
        </button>

        {message && (
          <p className="text-green-600">
            {message}
          </p>
        )}
      </form>
    </div>
  );
}