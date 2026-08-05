import { useState, useEffect, type ReactNode } from "react";
import ic_filter from "../../assets/icons/ic_filter.png";

interface TableToolbarProps {
  onSearch?: (value: string) => void;
  onToggleFilter?: () => void;
  children?: ReactNode;
  searchValue?: string;
}

export default function TableToolbar({
  onSearch,
  onToggleFilter,
  children,
  searchValue = "",
}: TableToolbarProps) {
  const [keyword, setKeyword] = useState(searchValue);

  useEffect(() => {
    setKeyword(searchValue);
  }, [searchValue]);

  const handleSearch = () => {
    onSearch?.(keyword.trim());
  };

  return (
    <div className="flex items-center justify-between px-4 py-3 bg-white border-b">
      <div className="flex gap-2 items-center">
        {/* Search */}
        <div className="flex items-center w-[300px] h-8 border rounded-md px-2 gap-1">
          <input
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSearch();
              }
            }}
            placeholder="Tìm kiếm theo tên, id,..."
            className="outline-none text-sm flex-1"
          />
          {/* Search icon button */}
          <button
            onClick={handleSearch}
            className="flex items-center justify-center text-gray-400 hover:text-gray-600 shrink-0"
            aria-label="Tìm kiếm"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z"
              />
            </svg>
          </button>
        </div>
        {children}
      </div>
      {/* Filter button */}
      <button
        onClick={onToggleFilter}
        className="w-8 h-8 border rounded-md flex items-center justify-center hover:bg-gray-100"
      >
        <img src={ic_filter} alt="filter" className="w-4 h-4" />
      </button>
    </div>
  );
}