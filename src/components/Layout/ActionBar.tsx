import ActionButton from "../common/ActionButton";
import DeleteIcon from "../../assets/svg/ic_delete";

interface ActionBarProps {
  selectedCount: number;
  onClearSelection: () => void;
  onDelete?: () => void;
}

export default function ActionBar({
  selectedCount,
  onClearSelection,
  onDelete,
}: ActionBarProps) {
  return (
    <div className="flex items-center justify-between border-b border-gray-200 bg-white px-6 py-3">
      <div className="flex flex-wrap items-center gap-3">
        <span className="text-sm font-medium text-gray-700">
          Đã chọn {selectedCount}
        </span>

        <button
          onClick={onClearSelection}
          type="button"
          className="text-sm font-medium text-blue-600 transition hover:text-blue-700 hover:underline mr-2"
        >
          Bỏ chọn
        </button>

        <ActionButton
          icon={<DeleteIcon className="text-red-500" />}
          text="Xóa"
          alt="delete"
          onClick={onDelete}
        />
      </div>
    </div>
  );
}