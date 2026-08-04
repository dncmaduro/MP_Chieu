import type { FilterConfig } from "../../../types/filter";

import DateFilter from "./DateFilter";
import SelectFilter from "./SelectFilter";
import TextFilter from "./TextFilter";

interface FilterFieldProps {
  config: FilterConfig;
  value: string;
  onChange: (value: string) => void;
}

export default function FilterField({ config, value, onChange }: FilterFieldProps) {
  return (
    <div className="space-y-2">
      <label className="text-sm font-medium text-gray-700">{config.label}</label>

      {config.type === "text" && <TextFilter value={value} onChange={onChange} />}

      {config.type === "select" && (
        <SelectFilter value={value} options={config.options ?? []} onChange={onChange} />
      )}

      {config.type === "date" && <DateFilter value={value} onChange={onChange} />}
    </div>
  );
}