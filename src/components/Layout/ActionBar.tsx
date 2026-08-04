import ActionButton from "../common/ActionButton";

const ICON_PLACEHOLDER = "https://via.placeholder.com/20";

const ACTIONS = [
  {
    text: "xóa",
    alt: "delete",
    showArrow: true,
  },
];

interface ActionBarProps {
  selectedCount: number;
  onClearSelection: () => void;
}

export default function ActionBar({ selectedCount, onClearSelection }: ActionBarProps) {
  return (
    <div className="flex items-center justify-between border-b border-gray-200 bg-white px-6 py-3">

      <div className="flex flex-wrap items-center gap-3">

        <span className="text-sm font-medium text-gray-700">
          Đã chọn {selectedCount}
        </span>

        <button
          onClick={onClearSelection}
          className="text-sm font-medium text-blue-600 transition hover:text-blue-700 hover:underline"
        >
          Bỏ chọn
        </button>

        {ACTIONS.map((item) => (
          <ActionButton
            key={item.text}
            icon={ICON_PLACEHOLDER}
            text={item.text}
            alt={item.alt}
            showArrow={item.showArrow}
          />
        ))}

        <ActionButton
          icon={ICON_PLACEHOLDER}
          alt="more"
          iconOnly
        />

      </div>

    </div>
  );
}