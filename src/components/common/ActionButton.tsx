import type { ReactNode } from "react";

interface ActionButtonProps {
  icon: ReactNode;
  text?: string;
  alt: string;
  showArrow?: boolean;
  iconOnly?: boolean;
  onClick?: () => void;
}

export default function ActionButton({
  icon,
  text,
  alt,
  showArrow = false,
  iconOnly = false,
  onClick,
}: ActionButtonProps) {
  const renderIcon = () => {
    if (typeof icon === "string") {
      return <img src={icon} alt={alt} className="h-5 w-5 shrink-0" />;
    }
    return <div className="h-5 w-5 shrink-0 flex items-center justify-center">{icon}</div>;
  };

  if (iconOnly) {
    return (
      <button
        onClick={onClick}
        type="button"
        className="flex h-10 w-10 items-center justify-center rounded-lg border border-gray-300 bg-white transition hover:bg-gray-100"
      >
        {renderIcon()}
      </button>
    );
  }
  return (
    <button
      onClick={onClick}
      type="button"
      className="flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-100"
    >
      {renderIcon()}
      <span>{text}</span>
      {showArrow && (
        <svg className="h-4 w-4 shrink-0 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      )}
    </button>
  );
}