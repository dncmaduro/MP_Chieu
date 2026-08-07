import type { SelectHTMLAttributes } from "react";

interface Option {
  value: string | number;
  label: string;
}

interface ComboBoxProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  required?: boolean;
  options: Option[];
  placeholder?: string;
}

export default function ComboBox({
  label,
  error,
  required,
  options,
  placeholder,
  className = "",
  id,
  ...props
}: ComboBoxProps) {
  return (
    <div className="flex flex-col gap-1.5 w-full">
      {label && (
        <label htmlFor={id} className="text-sm font-medium text-gray-700">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}
      <select
        id={id}
        className={`w-full rounded-lg border bg-white px-4 py-2 text-sm transition-all focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 ${
          error ? "border-red-500 focus:border-red-500 focus:ring-red-500" : "border-gray-300"
        } ${className}`}
        {...props}
      >
        {placeholder && <option value="">{placeholder}</option>}
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error && <span className="text-xs text-red-500">{error}</span>}
    </div>
  );
}
