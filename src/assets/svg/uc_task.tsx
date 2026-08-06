interface TaskIconProps {
  className?: string;
}

export default function TaskIcon({
  className = "",
}: TaskIconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={`w-5 h-5 ${className}`}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
      aria-hidden="true"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M9 6.75H19.5M9 12H19.5M9 17.25H19.5M4.5 6.75h.008v.008H4.5V6.75zm0 5.25h.008v.008H4.5V12zm0 5.25h.008v.008H4.5v-.008z"
      />
    </svg>
  );
}