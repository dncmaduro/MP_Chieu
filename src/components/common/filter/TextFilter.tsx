interface TextFilterProps {
  value: string;
  onChange: (value:string)=>void;
  placeholder?: string;
}
export default function TextFilter({
  value,
  onChange,
  placeholder,
}: TextFilterProps){

  return (
    <input
      type="text"
      value={value}
      placeholder={placeholder}
      onChange={(e)=>onChange(e.target.value)}
      className="
        w-full
        rounded-md
        border
        border-gray-300
        px-3
        py-2
        text-sm
        outline-none
        focus:border-blue-500
      "
    />
  );
}