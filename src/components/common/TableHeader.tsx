import { useState, useEffect, type ReactNode } from "react";
import ic_filter from "../../assets/icons/ic_filter.png";
import SearchIcon from "../../assets/svg/ic_search";
interface TableToolbarProps {
  onSearch?: (value: string) => void;
  onToggleFilter?: () => void;
  onAdd?: () => void;
  children?: ReactNode;
  searchValue?: string;
}

export default function TableToolbar({
  onSearch,
  onToggleFilter,
  onAdd,
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
            <SearchIcon className="h-6 w-6" />
          </button>
        </div>
        {children}
      </div>
      <div className="flex gap-2 items-center">
        {/* Filter button */}
        {onToggleFilter && (
          <button
            onClick={onToggleFilter}
            className="w-8 h-8 border rounded-md flex items-center justify-center hover:bg-gray-100"
            title="Lọc"
          >
            <img src={ic_filter} alt="filter" className="w-4 h-4" />
          </button>
        )}
        {/* Add button */}
        {onAdd && (
          <button
            onClick={onAdd}
            className="h-8 bg-blue-600 hover:bg-blue-700 text-white rounded-md px-3 flex items-center justify-center text-sm font-medium gap-1 transition"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Thêm mới
          </button>
        )}
      </div>
    </div>
  );
}

