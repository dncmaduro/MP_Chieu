import { useState, type ReactNode } from "react";

interface TableToolbarProps {
  onSearch?: (value: string) => void;
  children?: ReactNode;
}
export default function TableToolbar({
  onSearch,
  children,
}: TableToolbarProps) {
  const [keyword, setKeyword] = useState("");
  const handleSearch = () => {
    onSearch?.(keyword.trim());
  };
  return (
    <div className="flex items-center justify-between px-4 py-3 bg-white border-b">

      <div className="flex gap-2 items-center">
        {/* Search */}
        <div className="
          flex 
          items-center 
          w-[300px] 
          h-8 
          border 
          rounded-md 
          px-2
        ">
          <input
            value={keyword}

            onChange={(e) => {
              setKeyword(e.target.value);
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSearch();
              }
            }}
            placeholder="Tìm kiếm theo tên, id,..."

            className="
              outline-none
              text-sm
              flex-1
            "
          />

        </div>

        {/* Filter truyền từ ngoài vào */}
        {children}
      </div>
      {/* Setting */}
      <button
        className="
          w-8 
          h-8
          border
          rounded-md
          flex
          items-center
          justify-center
        "
      >
        {/* 
          Icon setting:
          /assets/icons/setting.png
        */}
      </button>
    </div>
  );
}