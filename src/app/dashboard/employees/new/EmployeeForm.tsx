"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createEmployee } from "@/actions/employee";

type Department = {
  id: string;
  name: string;
};

export default function EmployeeForm({
  departments,
}: {
  departments: Department[];
}) {
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [designation, setDesignation] = useState("");
  const [salary, setSalary] = useState("");
  const [joiningDate, setJoiningDate] = useState("");
  const [departmentId, setDepartmentId] = useState("");
  const [message, setMessage] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const result = await createEmployee({
      name,
      email,
      phone,
      designation,
      salary: Number(salary),
      joiningDate,
      departmentId,
    });

    if (result.success) {
      router.push("/dashboard/employees");
      router.refresh();
    } else {
      setMessage(result.message);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-xl">
      <input
        className="w-full border rounded p-3"
        placeholder="Full Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />

      <input
        className="w-full border rounded p-3"
        placeholder="Email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />

      <input
        className="w-full border rounded p-3"
        placeholder="Phone"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
      />

      <input
        className="w-full border rounded p-3"
        placeholder="Designation"
        value={designation}
        onChange={(e) => setDesignation(e.target.value)}
        required
      />

      <input
        className="w-full border rounded p-3"
        placeholder="Salary"
        type="number"
        value={salary}
        onChange={(e) => setSalary(e.target.value)}
        required
      />

      <input
        className="w-full border rounded p-3"
        type="date"
        value={joiningDate}
        onChange={(e) => setJoiningDate(e.target.value)}
        required
      />

      <select
        className="w-full border rounded p-3"
        value={departmentId}
        onChange={(e) => setDepartmentId(e.target.value)}
        required
      >
        <option value="">Select Department</option>

        {departments.map((department) => (
          <option key={department.id} value={department.id}>
            {department.name}
          </option>
        ))}
      </select>

      <button
        type="submit"
        className="bg-blue-600 text-white px-5 py-3 rounded"
      >
        Save Employee
      </button>

      {message && (
        <p className="text-red-600">{message}</p>
      )}
    </form>
  );
}