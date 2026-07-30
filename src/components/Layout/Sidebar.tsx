const ICON_PLACEHOLDER = "https://via.placeholder.com/20";

const SIDEBAR_ITEMS = [
  { id: "user", label: "Người dùng" },
  { id: "task", label: "Công việc" },
];

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tabId: string) => void;
}

export default function Sidebar({
  activeTab,
  setActiveTab,
}: SidebarProps) {
  return (
    <aside className="flex w-64 flex-col border-r border-gray-200 bg-white">

      {/* Menu */}
      <nav className="flex-1 p-4">

        <div className="space-y-2">

          {SIDEBAR_ITEMS.map((item) => {

            const isActive = activeTab === item.id;

            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`
                  flex
                  w-full
                  items-center
                  gap-3
                  rounded-lg
                  px-4
                  py-3
                  text-left
                  transition
                  ${
                    isActive
                      ? "bg-blue-500 text-white shadow"
                      : "text-gray-700 hover:bg-gray-100"
                  }
                `}
              >

                <img
                  src={ICON_PLACEHOLDER}
                  alt={item.label}
                  className="h-5 w-5"
                />

                <span className="font-medium">
                  {item.label}
                </span>

              </button>
            );
          })}

        </div>

      </nav>

      {/* Footer */}
      <div className="border-t border-gray-200 p-4">

        <button
          className="
            flex
            h-10
            w-10
            items-center
            justify-center
            rounded-lg
            transition
            hover:bg-gray-100
          "
        >
          <img
            src={ICON_PLACEHOLDER}
            alt="collapse"
            className="h-5 w-5"
          />
        </button>

      </div>

    </aside>
  );
}