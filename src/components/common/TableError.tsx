import WarningIcon from "../../assets/svg/ic_Error";
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
          <WarningIcon />
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
