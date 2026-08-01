import { useState } from "react";

export interface Column<T> {
  title: string;
  key: string;
  render: (row: T) => React.ReactNode;
}

interface DataTableProps<T extends { id: number | string }> {
  data: T[];
  columns: Column<T>[];
}

export default function DataTable<T extends { id: number | string }>({
  data,
  columns,
}: DataTableProps<T>) {
  const [selectedRows, setSelectedRows] = useState<(number | string)[]>([]);

  const toggleRow = (id: number | string) => {
    setSelectedRows((prev) =>
      prev.includes(id)
        ? prev.filter((item) => item !== id)
        : [...prev, id]
    );
  };

  return (
    <div className="overflow-hidden rounded-lg border border-gray-200 bg-white">
      <table className="w-full border-collapse text-sm">
        <thead className="bg-gray-50 text-left text-gray-700">
          <tr className="h-11 border-b">
            <th className="w-12"></th>

            {columns.map((column) => (
              <th key={column.key} className="px-4">
                {column.title}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {data.map((row) => {
            const selected = selectedRows.includes(row.id);

            return (
              <tr
                key={row.id}
                className={`h-12 border-b transition-colors ${
                  selected
                    ? "bg-blue-50"
                    : "hover:bg-gray-100"
                }`}
              >
                <td className="text-center">
                  <input
                    type="checkbox"
                    checked={selected}
                    onChange={() => toggleRow(row.id)}
                  />
                </td>

                {columns.map((column) => (
                  <td key={column.key} className="px-4">
                    {column.render(row)}
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}