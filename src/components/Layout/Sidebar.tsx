import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import UserIcon from "../../assets/svg/ic_user";
import TaskIcon from "../../assets/svg/uc_task";
import { useIsMobile } from "../../hooks/useIsMobile";

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
  const navigate = useNavigate();

  const isMobile = useIsMobile();

  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  useEffect(() => {
    if (!isMobile) {
      setIsMobileOpen(false);
    }
  }, [isMobile]);

  const handleNavigate = (tabId: string) => {
    setActiveTab(tabId);
    navigate(`/${tabId}`);

    if (isMobile) {
      setIsMobileOpen(false);
    }
  };

  return (
    <>
      {/* Mobile: nút mở Sidebar */}
      {isMobile && !isMobileOpen && (
        <button
          type="button"
          onClick={() => setIsMobileOpen(true)}
          aria-label="Mở menu"
          className="
            fixed
            left-3
            top-3
            z-50
            flex
            h-10
            w-10
            items-center
            justify-center
            rounded-lg
            bg-white
            shadow
            ring-1
            ring-gray-200
            transition
            hover:bg-gray-100
            focus:outline-none
            focus:ring-2
            focus:ring-blue-500
          "
        >
          <TaskIcon className="h-5 w-5 shrink-0" />
        </button>
      )}

      {/* Mobile: lớp nền bên ngoài Sidebar */}
      {isMobile && isMobileOpen && (
        <div
          aria-hidden="true"
          onClick={() => setIsMobileOpen(false)}
          className="
            fixed
            inset-0
            z-40
            bg-black/20
          "
        />
      )}

      <aside
        className={`
          ${
            isMobile
              ? `
                fixed
                left-0
                top-0
                z-50
                h-screen
                w-64
                transform
                transition-transform
                duration-200
                ${
                  isMobileOpen
                    ? "translate-x-0"
                    : "-translate-x-full"
                }
              `
              : `
                relative
                h-screen
                transition-all
                duration-200
                ${isCollapsed ? "w-20" : "w-64"}
              `
          }
          flex
          flex-col
          border-r
          border-gray-200
          bg-white
        `}
      >
        {/* Menu */}
        <div
          className={`
            flex-1
            space-y-2
            p-4
            ${isCollapsed && !isMobile ? "px-2" : ""}
          `}
        >
          {SIDEBAR_ITEMS.map((item) => {
            const isActive = activeTab === item.id;

            return (
              <button
                key={item.id}
                type="button"
                onClick={() => handleNavigate(item.id)}
                title={
                  isCollapsed && !isMobile
                    ? item.label
                    : undefined
                }
                className={`
                  flex
                  w-full
                  items-center
                  rounded-lg
                  py-3
                  text-left
                  transition
                  focus:outline-none
                  focus:ring-2
                  focus:ring-blue-500
                  ${
                    isCollapsed && !isMobile
                      ? "justify-center px-2"
                      : "gap-3 px-4"
                  }
                  ${
                    isActive
                      ? "bg-blue-500 text-white shadow"
                      : "text-gray-700 hover:bg-gray-100"
                  }
                `}
              >
                {item.id === "user" ? (
                  <UserIcon className="h-5 w-5 shrink-0" />
                ) : (
                  <TaskIcon className="h-5 w-5 shrink-0" />
                )}

                {/* Ẩn label khi Sidebar collapsed */}
                {(!isCollapsed || isMobile) && (
                  <span className="whitespace-nowrap">
                    {item.label}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Footer */}
        <div
          className={`
            border-t
            border-gray-200
            p-4
            ${isCollapsed && !isMobile ? "px-2" : ""}
          `}
        >
          {!isMobile && (
            <button
              type="button"
              onClick={() =>
                setIsCollapsed((previous) => !previous)
              }
              aria-label={
                isCollapsed
                  ? "Mở rộng sidebar"
                  : "Thu gọn sidebar"
              }
              title={
                isCollapsed
                  ? "Mở rộng sidebar"
                  : "Thu gọn sidebar"
              }
              className={`
                flex
                h-10
                w-10
                items-center
                justify-center
                rounded-lg
                transition
                hover:bg-gray-100
                focus:outline-none
                focus:ring-2
                focus:ring-blue-500
                ${isCollapsed ? "mx-auto" : ""}
              `}
            >
              <img
                src={ICON_PLACEHOLDER}
                alt=""
                className={`
                  h-5
                  w-5
                  transition-transform
                  duration-200
                  ${isCollapsed ? "rotate-180" : ""}
                `}
              />
            </button>
          )}
        </div>
      </aside>
    </>
  );
}

