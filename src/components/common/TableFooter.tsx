interface PaginationProps {
  total: number;
  pageSize: number;
  current: number;
  onChange?: (page: number) => void;
}
export default function TablePagination({
  total,
  pageSize,
  current,
  onChange,
}: PaginationProps) {
  const totalPages = Math.ceil(total / pageSize);
  return (
    <div
      className="
        h-12
        bg-white
        border-t
        flex
        items-center
        justify-between
        px-4
        text-sm
      "
    >
      {/* Total */}
      <div>
        Tổng số:
        <span className="font-medium ml-1">
          {total}
        </span>
      </div>
      <div className="flex items-center gap-4">
        <div>
          Số dòng/trang: 
          <span className="font-medium ml-1">
            {pageSize}
          </span>
        </div>
        {/* Range */}
        <div>
          {(current - 1) * pageSize + 1}
          -
          {Math.min(
            current * pageSize,
            total
          )}
        </div>
        {/* Page number */}
        <div>
          Trang {current}/{totalPages}
        </div>
        <div className="flex gap-2">
          {/* Previous */}
          <button
            disabled={current === 1}
            onClick={() =>
              onChange?.(current - 1)
            }
            className="
              border
              rounded
              px-2
              disabled:opacity-40
            "
          >
            Prev
          </button>
          <button
            disabled={current === totalPages}
            onClick={() =>
              onChange?.(current + 1)
            }
            className="
              border
              rounded
              px-2
              disabled:opacity-40
            "
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}