interface SearchIconProps {
  className?: string;
}

export default function SearchIcon({
  className = "",
}: SearchIconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={`w-4 h-4 ${className}`}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
      aria-hidden="true"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z"
      />
    </svg>
  );
}