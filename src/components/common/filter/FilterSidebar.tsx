import type { FilterConfig } from "../../../types/filter";
import FilterField from "./FilterField";

interface FilterSidebarProps {
  filters: FilterConfig[];
  values: Record<string, string>;
  onChange: (key: string, value: string) => void;
  onReset: () => void;
  onApply: () => void;
}

export default function FilterSidebar({
  filters,
  values,
  onChange,
  onReset,
  onApply,
}: FilterSidebarProps) {
  return (
    <div className="sticky top-4 flex h-[calc(70vh-2rem)] w-80 shrink-0 flex-col border border-gray-200 rounded-lg bg-white shadow-sm ml-4">
      {/* Vùng các ô lọc (có scrollbar khi quá dài) */}
      <div className="table-scroll flex-1 overflow-y-auto p-4 space-y-5">
        <div className="flex items-center justify-between border-b pb-2">
          <h2 className="font-semibold text-gray-800">Bộ lọc</h2>
          <button onClick={onReset} className="text-sm font-medium text-blue-600 hover:text-blue-700">
            Reset
          </button>
        </div>

        <div className="space-y-4">
          {filters.map((filter) => (
            <FilterField
              key={filter.key}
              config={filter}
              value={values[filter.key] ?? ""}
              onChange={(value) => onChange(filter.key, value)}
            />
          ))}
        </div>
      </div>

      {/* Vùng nút Lọc cố định ở bottom */}
      <div className="border-t border-gray-200 p-4 bg-gray-50 rounded-b-lg">
        <button
          onClick={onApply}
          className="w-full rounded-md bg-blue-600 px-4 py-2.5 text-sm font-medium text-white shadow hover:bg-blue-700 transition"
        >
          Lọc
        </button>
      </div>
    </div>
  );
}