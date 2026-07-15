"use client";

import { getEmployeesForExport } from "@/actions/exportEmployees";

export default function ExportEmployeesButton() {
  async function handleExport() {
    const employees = await getEmployeesForExport();

    const headers = Object.keys(employees[0] || {}).join(",");

    const rows = employees.map((employee) =>
      Object.values(employee).join(",")
    );

    const csv = [headers, ...rows].join("\n");

    const blob = new Blob([csv], {
      type: "text/csv;charset=utf-8;",
    });

    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");

    link.href = url;

    link.download = "employees.csv";

    link.click();

    URL.revokeObjectURL(url);
  }

  return (
    <button
      onClick={handleExport}
      className="rounded bg-green-600 px-4 py-2 text-white"
    >
      Export CSV
    </button>
  );
}