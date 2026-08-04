import { useState, type ReactNode } from "react"; 
import ic_filter from "../../assets/icons/ic_filter.png";


interface TableToolbarProps {
  onSearch?: (value: string) => void;
  onToggleFilter?: () => void;
  children?: ReactNode;
}

export default function TableToolbar({
  onSearch,
  onToggleFilter,
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
        <div
          className="
          flex 
          items-center 
          w-[300px] 
          h-8 
          border 
          rounded-md 
          px-2
          "
        >
          <input
            value={keyword}
            onChange={(e)=>
              setKeyword(e.target.value)
            }
            onKeyDown={(e)=>{
              if(e.key==="Enter"){
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
        {children}
      </div>
      {/* Filter button */}
      <button
        onClick={onToggleFilter}
        className="
          w-8 
          h-8
          border
          rounded-md
          flex
          items-center
          justify-center
          hover:bg-gray-100
        "
      >
        <img
          src={ic_filter}
          alt="filter"
          className="w-4 h-4"
        />
      </button>
    </div>
  );
}