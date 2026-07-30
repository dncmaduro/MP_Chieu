const ICON_PLACEHOLDER = "https://via.placeholder.com/20";
const AVATAR_PLACEHOLDER = "https://via.placeholder.com/32";

export default function Header() {
  return (
    <header className="flex h-16 items-center justify-between border-b border-gray-200 bg-white px-6 shadow-sm">

      {/* Logo */}
      <div className="flex items-center gap-3">
        

        <span className="text-xl font-bold text-blue-600">
          Task Manager
        </span>
      </div>

      {/* Search */}
      <div className="mx-8 flex h-9 max-w-2xl flex-1 items-center rounded-full border border-gray-300 bg-gray-50 px-4">

        <img
          src="/assets/ic_Search.png"
          alt="Search"
          className="mr-3 h-4 w-4"
        />

        <input
          type="text"
          placeholder="Tìm kiếm người dùng, công việc"
          className="h-full w-full border-none bg-transparent text-sm outline-none placeholder:text-gray-400"
        />

      </div>

      {/* Right */}
      <div className="flex items-center gap-2">


        {/* Notification */}
        <button className="relative flex h-10 w-10 items-center justify-center rounded-lg transition hover:bg-gray-100">

          <img
            src={ICON_PLACEHOLDER}
            alt="bell"
            className="h-5 w-5"
          />

          <span
            className="
              absolute
              -right-1
              -top-1
              flex
              h-5
              min-w-5
              items-center
              justify-center
              rounded-full
              bg-red-500
              px-1
              text-[10px]
              font-semibold
              text-white
            "
          >
            75
          </span>

        </button>
      </div>
    </header>
  );
}