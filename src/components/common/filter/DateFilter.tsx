interface DateFilterProps {
  value: string;
  onChange: (value: string) => void;
}

export default function DateFilter({ value, onChange }: DateFilterProps) {
  return (
    <input
      type="date"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm outline-none focus:border-blue-500"
    />
  );
}

