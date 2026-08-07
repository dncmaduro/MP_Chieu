import { useEffect, useState } from "react";
import { useOutletContext, useNavigate, useSearchParams } from "react-router-dom";

import { useTasks } from "../../hooks/useTasks";
import Avatar from "../common/Avatar";
import DataTable, { type Column } from "../common/TableBody";
import TableFooter from "../common/TableFooter";
import TableHeader from "../common/TableHeader";
import type { TaskWithUser } from "../../types/task";
import FilterSidebar from "../common/filter/FilterSidebar";
import ActionDetail from "../common/ActionDetail";
import TaskDetail from "../detail/TaskDetail";
import { useTaskDetail } from "../../hooks/useTaskDetail";

// 1. Định nghĩa danh sách cấu hình cho Filter
const TASK_FILTERS = [
  {
    key: "title",
    label: "Tiêu đề",
    type: "text" as const,
  },
  {
    key: "user",
    label: "Người phụ trách",
    type: "text" as const,
  },
  {
    key: "status",
    label: "Trạng thái",
    type: "select" as const,
    options: [
      { label: "Todo", value: "todo" },
      { label: "In Progress", value: "in_progress" },
      { label: "Done", value: "done" },
    ],
  },
  {
    key: "priority",
    label: "Độ ưu tiên",
    type: "select" as const,
    options: [
      { label: "Low", value: "low" },
      { label: "Medium", value: "medium" },
      { label: "High", value: "high" },
    ],
  },
  {
    key: "dueFrom",
    label: "Hạn chót từ ngày",
    type: "date" as const,
  },
  {
    key: "dueTo",
    label: "Hạn chót đến ngày",
    type: "date" as const,
  },
  {
    key: "createdFrom",
    label: "Ngày tạo từ ngày",
    type: "date" as const,
  },
  {
    key: "createdTo",
    label: "Ngày tạo đến ngày",
    type: "date" as const,
  },
  {
    key: "updatedFrom",
    label: "Ngày cập nhật từ ngày",
    type: "date" as const,
  },
  {
    key: "updatedTo",
    label: "Ngày cập nhật đến ngày",
    type: "date" as const,
  },
];

export default function TaskPage() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const search = searchParams.get("keyword") || "";
  const currentPage = Number(searchParams.get("page")) || 1;
  const pageSize = Number(searchParams.get("pageSize")) || 10;
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const [selectedRows, setSelectedRows] = useState<(number | string)[]>([]);
  const { setSelectedCount, setOnClearSelection } = useOutletContext<{
    setSelectedCount: (count: number) => void;
    setOnClearSelection: (fn: (() => void) | null) => void;
  }>();

  // State và hook xem chi tiết công việc
  const [selectedTaskId, setSelectedTaskId] = useState<number | string | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const { data: taskDetail, isFetching } = useTaskDetail(selectedTaskId);

  // Mở drawer khi đã fetch dữ liệu thành công
  useEffect(() => {
    if (selectedTaskId && !isFetching && taskDetail) {
      const timer = setTimeout(() => {
        setIsDrawerOpen(true);
      }, 0);
      return () => clearTimeout(timer);
    }
  }, [selectedTaskId, isFetching, taskDetail]);

  const handleCellClick = (id: number | string) => {
    setSelectedTaskId(id);
  };

  const handleCloseDrawer = () => {
    setIsDrawerOpen(false);
    setSelectedTaskId(null);
  };

  useEffect(() => {
    setSelectedCount(selectedRows.length);
    setOnClearSelection(() => () => setSelectedRows([]));
    return () => {
      setSelectedCount(0);
      setOnClearSelection(null);
    };
  }, [selectedRows, setSelectedCount, setOnClearSelection]);

  const [draftFilterValues, setDraftFilterValues] = useState<Record<string, string>>({
    title: "",
    user: "",
    status: "",
    priority: "",
    dueFrom: "",
    dueTo: "",
    createdFrom: "",
    createdTo: "",
    updatedFrom: "",
    updatedTo: "",
  });

  // Sync draft filters with URL (applied filters) when searchParams changes
  useEffect(() => {
    setDraftFilterValues({
      title: searchParams.get("title") || "",
      user: searchParams.get("assignee") || "",
      status: searchParams.get("status") || "",
      priority: searchParams.get("priority") || "",
      dueFrom: searchParams.get("dueFrom") || "",
      dueTo: searchParams.get("dueTo") || "",
      createdFrom: searchParams.get("createdFrom") || "",
      createdTo: searchParams.get("createdTo") || "",
      updatedFrom: searchParams.get("updatedFrom") || "",
      updatedTo: searchParams.get("updatedTo") || "",
    });
  }, [searchParams]);

  const appliedFilterValues = {
    title: searchParams.get("title") || "",
    user: searchParams.get("assignee") || "",
    status: searchParams.get("status") || "",
    priority: searchParams.get("priority") || "",
    dueFrom: searchParams.get("dueFrom") || "",
    dueTo: searchParams.get("dueTo") || "",
    createdFrom: searchParams.get("createdFrom") || "",
    createdTo: searchParams.get("createdTo") || "",
    updatedFrom: searchParams.get("updatedFrom") || "",
    updatedTo: searchParams.get("updatedTo") || "",
  };

  const { data, isLoading, isError } = useTasks();
  const tasks = Array.isArray(data) ? data : data?.data ?? [];


  const handleFilterChange = (key: string, value: string) => {
    setDraftFilterValues((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleApplyFilter = () => {
    setSearchParams((prev) => {
      const next = new URLSearchParams(prev);
      Object.entries(draftFilterValues).forEach(([key, val]) => {
        const paramKey = key === "user" ? "assignee" : key;
        if (val) {
          next.set(paramKey, val);
        } else {
          next.delete(paramKey);
        }
      });
      next.set("page", "1");
      return next;
    });
  };

  const handleResetFilter = () => {
    const emptyValues = {
      title: "",
      user: "",
      status: "",
      priority: "",
      dueFrom: "",
      dueTo: "",
      createdFrom: "",
      createdTo: "",
      updatedFrom: "",
      updatedTo: "",
    };
    setDraftFilterValues(emptyValues);
    setSearchParams((prev) => {
      const next = new URLSearchParams(prev);
      Object.keys(emptyValues).forEach((key) => {
        const paramKey = key === "user" ? "assignee" : key;
        next.delete(paramKey);
      });
      next.set("page", "1");
      return next;
    });
  };

  const matchDateRange = (taskDateStr: string | null | undefined, fromStr: string, toStr: string) => {
    if (!fromStr && !toStr) return true;
    if (!taskDateStr) return false;

    const taskDate = new Date(taskDateStr);
    if (isNaN(taskDate.getTime())) return false;

    if (fromStr) {
      const fromDate = new Date(fromStr);
      fromDate.setHours(0, 0, 0, 0);
      if (taskDate < fromDate) return false;
    }

    if (toStr) {
      const toDate = new Date(toStr);
      toDate.setHours(23, 59, 59, 999);
      if (taskDate > toDate) return false;
    }

    return true;
  };

  const filteredTasks = tasks.filter((task) => {
    const keyword = search.toLowerCase();
    const matchesSearch =
      task.title.toLowerCase().includes(keyword) ||
      task.description?.toLowerCase().includes(keyword) ||
      task.user?.name.toLowerCase().includes(keyword) ||
      task.status.toLowerCase().includes(keyword) ||
      task.priority.toLowerCase().includes(keyword);

    const matchesTitle = appliedFilterValues.title
      ? task.title.toLowerCase().includes(appliedFilterValues.title.toLowerCase())
      : true;

    const matchesUser = appliedFilterValues.user
      ? task.user?.name.toLowerCase().includes(appliedFilterValues.user.toLowerCase())
      : true;

    const matchesStatus = appliedFilterValues.status
      ? task.status === appliedFilterValues.status
      : true;

    const matchesPriority = appliedFilterValues.priority
      ? task.priority === appliedFilterValues.priority
      : true;

    const matchesDueDate = matchDateRange(
      task.dueDate,
      appliedFilterValues.dueFrom,
      appliedFilterValues.dueTo
    );

    const matchesCreatedAt = matchDateRange(
      task.createdAt,
      appliedFilterValues.createdFrom,
      appliedFilterValues.createdTo
    );

    const matchesUpdatedAt = matchDateRange(
      task.updatedAt,
      appliedFilterValues.updatedFrom,
      appliedFilterValues.updatedTo
    );

    return (
      matchesSearch &&
      matchesTitle &&
      matchesUser &&
      matchesStatus &&
      matchesPriority &&
      matchesDueDate &&
      matchesCreatedAt &&
      matchesUpdatedAt
    );
  });

  const start = (currentPage - 1) * pageSize;
  const pageTasks = filteredTasks.slice(start, start + pageSize);

  const columns: Column<TaskWithUser>[] = [
    {
      key: "title",
      title: "Tiêu đề",
      width: 220,
      sortValue: (task) => task.title,
      render: (task) => <span className="font-medium">{task.title}</span>,
    },
    {
      key: "assignee",
      title: "Người phụ trách",
      width: 220,
      sortValue: (task) => task.user?.name ?? "",
      render: (task) => (
        <div className="flex items-center gap-3">
          <Avatar
            name={task.user?.name ?? "Chưa phân công"}
            avatarUrl={task.user?.avatarUrl ?? null}
          />
          <span>{task.user?.name ?? "Chưa phân công"}</span>
        </div>
      ),
    },
    {
      key: "status",
      title: "Trạng thái",
      width: 140,
      sortValue: (task) => task.status,
      render: (task) => task.status,
    },
    {
      key: "priority",
      title: "Độ ưu tiên",
      width: 140,
      sortValue: (task) => task.priority,
      render: (task) => task.priority,
    },
    {
      key: "dueDate",
      title: "Hạn chót",
      width: 140,
      sortValue: (task) => task.dueDate ?? "",
      render: (task) => task.dueDate ?? "—",
    },
    {
      key: "createdAt",
      title: "Ngày tạo",
      width: 180,
      sortValue: (task) => task.createdAt ?? "",
      render: (task) => task.createdAt ?? "—",
    },
    {
      key: "updatedAt",
      title: "Ngày cập nhật",
      width: 180,
      sortValue: (task) => task.updatedAt ?? "",
      render: (task) => task.updatedAt ?? "—",
    },
    {
      key: "description",
      title: "Mô tả",
      width: 320,
      sortValue: (task) => task.description ?? "",
      render: (task) => task.description ?? "—",
    },
  ];

  return (
    <div className="rounded-lg border border-gray-200 bg-white p-4">
      {/* Loading overlay khi fetch chi tiết */}
      {isFetching && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/20 backdrop-blur-xs">
          <div className="flex flex-col items-center gap-3 p-4 bg-white rounded-lg shadow-lg border border-gray-100">
            <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
            <span className="text-sm font-medium text-gray-700">Đang tải dữ liệu...</span>
          </div>
        </div>
      )}

      <TableHeader
        searchValue={search}
        onSearch={(value) => {
          setSearchParams((prev) => {
            const next = new URLSearchParams(prev);
            if (value) {
              next.set("keyword", value);
            } else {
              next.delete("keyword");
            }
            next.set("page", "1");
            return next;
          });
        }}
        onToggleFilter={() => {
          setIsFilterOpen((prev) => !prev);
        }}
        onAdd={() => {
          setIsFilterOpen(false);
          navigate("/task/new");
        }}
      />
      <div className="flex min-w-0">
        <div className="flex-1 min-w-0">
          <div className="mt-4">
            <DataTable
              data={pageTasks}
              columns={columns}
              isLoading={isLoading}
              isError={isError}
              selectedRows={selectedRows}
              onSelectionChange={setSelectedRows}
              onCellClick={handleCellClick}
            />
          </div>
          <TableFooter
            total={filteredTasks.length}
            pageSize={pageSize}
            current={currentPage}
            onChange={(newPage) => {
              setSearchParams((prev) => {
                const next = new URLSearchParams(prev);
                next.set("page", String(newPage));
                return next;
              });
            }}
          />
        </div>
        {/* 5. Truyền danh sách filters và state thực tế vào FilterSidebar */}
        {isFilterOpen && (
          <FilterSidebar
            filters={TASK_FILTERS}
            values={draftFilterValues}
            onChange={handleFilterChange}
            onReset={handleResetFilter}
            onApply={handleApplyFilter}
          />
        )}
      </div>
      {/* Drawer chi tiết công việc */}
      <ActionDetail
        open={isDrawerOpen}
        onClose={handleCloseDrawer}
        title="Chi tiết công việc"
      >
        {taskDetail && <TaskDetail task={taskDetail} />}
      </ActionDetail>
    </div>
  );
}