export default function TableLoading() {
  return (
    <div
      className="absolute inset-0 z-10 flex items-center justify-center rounded-lg bg-gray-100/60 backdrop-blur-[1px]"
      aria-label="Đang tải..."
      aria-live="polite"
    >
      <div className="flex flex-col items-center gap-2">
        {/* Spinner */}
        <svg
          className="h-9 w-9 animate-spin text-blue-500"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="3"
          />
          <path
            className="opacity-80"
            fill="currentColor"
            d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
          />
        </svg>
        <span className="text-sm text-gray-500 font-medium select-none">
          Đang tải...
        </span>
      </div>
    </div>
  );
}
