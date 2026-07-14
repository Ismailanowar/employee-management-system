"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { updateEmployee } from "@/actions/employee";

type Department = {
  id: string;
  name: string;
};

type Employee = {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  designation: string;
  salary: number;
  joiningDate: Date;
  departmentId: string;
};

export default function EmployeeEditForm({
  employee,
  departments,
}: {
  employee: Employee;
  departments: Department[];
}) {
  const router = useRouter();

  const [name, setName] = useState(employee.name);
  const [email, setEmail] = useState(employee.email);
  const [phone, setPhone] = useState(employee.phone ?? "");
  const [designation, setDesignation] = useState(employee.designation);
  const [salary, setSalary] = useState(employee.salary.toString());
  const [joiningDate, setJoiningDate] = useState(
    new Date(employee.joiningDate).toISOString().split("T")[0]
  );
  const [departmentId, setDepartmentId] = useState(employee.departmentId);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const result = await updateEmployee(employee.id, {
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
      alert(result.message);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-xl space-y-4">
      <h1 className="text-3xl font-bold">Edit Employee</h1>

      <input
        className="w-full border rounded p-3"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <input
        className="w-full border rounded p-3"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        className="w-full border rounded p-3"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
      />

      <input
        className="w-full border rounded p-3"
        value={designation}
        onChange={(e) => setDesignation(e.target.value)}
      />

      <input
        className="w-full border rounded p-3"
        type="number"
        value={salary}
        onChange={(e) => setSalary(e.target.value)}
      />

      <input
        className="w-full border rounded p-3"
        type="date"
        value={joiningDate}
        onChange={(e) => setJoiningDate(e.target.value)}
      />

      <select
        className="w-full border rounded p-3"
        value={departmentId}
        onChange={(e) => setDepartmentId(e.target.value)}
      >
        {departments.map((department) => (
          <option key={department.id} value={department.id}>
            {department.name}
          </option>
        ))}
      </select>

      <button
        type="submit"
        className="rounded bg-blue-600 px-5 py-3 text-white"
      >
        Update Employee
      </button>
    </form>
  );
}