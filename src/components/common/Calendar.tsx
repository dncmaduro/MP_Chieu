import type { InputHTMLAttributes } from "react";

interface CalendarProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  required?: boolean;
}

export default function Calendar({
  label,
  error,
  required,
  className = "",
  id,
  ...props
}: CalendarProps) {
  return (
    <div className="flex flex-col gap-1.5 w-full">
      {label && (
        <label htmlFor={id} className="text-sm font-medium text-gray-700">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}
      <input
        id={id}
        type="date"
        className={`w-full rounded-lg border px-4 py-2 text-sm transition-all focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 ${
          error ? "border-red-500 focus:border-red-500 focus:ring-red-500" : "border-gray-300"
        } ${className}`}
        {...props}
      />
      {error && <span className="text-xs text-red-500">{error}</span>}
    </div>
  );
}
