import type { FilterOption } from "../../../types/filter";
interface SelectFilterProps {
  value:string;
  options:FilterOption[];
  onChange:(value:string)=>void;
}
export default function SelectFilter({
  value,
  options,
  onChange,
}:SelectFilterProps){
  return (
    <select
      value={value}
      onChange={(e)=>onChange(e.target.value)}
      className="
        w-full
        rounded-md
        border
        border-gray-300
        px-3
        py-2
        text-sm
      "
    >
      <option value="">
        Tất cả
      </option>
      {
        options.map(option=>(
          <option
            key={option.value}
            value={option.value}
          >
            {option.label}
          </option>
        ))
      }
    </select>
  );
}