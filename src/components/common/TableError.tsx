interface TableErrorProps {
  colSpan: number;
  message?: string;
}

export default function TableError({
  colSpan,
  message = "Đã xảy ra lỗi khi tải dữ liệu. Vui lòng thử lại.",
}: TableErrorProps) {
  return (
    <tr>
      <td colSpan={colSpan} className="py-16 px-4 text-center">
        <div className="flex flex-col items-center gap-3">
          {/* Warning / error icon */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-12 w-12 text-red-300"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1.2}
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 9v4m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"
            />
          </svg>
          <div className="flex flex-col gap-1">
            <span className="text-sm font-semibold text-red-500">
              Không thể tải dữ liệu
            </span>
            <span className="text-xs text-gray-400">{message}</span>
          </div>
        </div>
      </td>
    </tr>
  );
}
