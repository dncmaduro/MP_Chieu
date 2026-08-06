import EmptyBoxIcon from "../../assets/svg/ic_empty";
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
          <EmptyBoxIcon />
          <span className="text-sm font-medium text-gray-500">{message}</span>
        </div>
      </td>
    </tr>
  );
}
