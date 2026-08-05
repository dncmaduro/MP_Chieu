interface TableEmptyProps {
  colSpan: number;
  message?: string;
}

export default function TableEmpty({
  colSpan,
  message = "Không tìm thấy kết quả nào.",
}: TableEmptyProps) {
  return (
    <tr>
      <td colSpan={colSpan} className="py-16 px-4 text-center">
        <div className="flex flex-col items-center gap-3 text-gray-400">
          {/* Empty box icon */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-12 w-12 text-gray-300"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1.2}
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-1.414 1.414a1 1 0 01-.707.293h-4.172a1 1 0 01-.707-.293l-1.414-1.414A1 1 0 008.586 13H6"
            />
          </svg>
          <span className="text-sm font-medium text-gray-500">{message}</span>
        </div>
      </td>
    </tr>
  );
}
