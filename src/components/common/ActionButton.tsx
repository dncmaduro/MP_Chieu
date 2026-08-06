interface ActionButtonProps {
  icon: string;
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
  if (iconOnly) {
    return (
      <button
        onClick={onClick}
        className="flex h-10 w-10 items-center justify-center rounded-lg border border-gray-300 bg-white transition hover:bg-gray-100"
      >
        <img
          src={icon}
          alt={alt}
          className="h-5 w-5"
        />
      </button>
    );
  }
  return (
    <button
      onClick={onClick}
      className="flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-100"
    >
      <img
        src={icon}
        alt={alt}
        className="h-5 w-5"
      />
      <span>{text}</span>
      {showArrow && (
        <img
          src={icon}
          alt="dropdown"
          className="h-4 w-4"
        />
      )}
    </button>
  );
}