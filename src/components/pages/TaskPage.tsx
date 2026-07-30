import { useState } from "react";
import type { Task } from "../../types/task";
import { useTasks } from "../../hooks/useTasks";
import TableToolbar from "../common/TableHeader";
import DataTable, { type Column } from "../common/TableBody";
import TablePagination from "../common/TableFooter";

export default function TaskPage() {
  const {
    data,
    isLoading,
    isError,
  } = useTasks();

  const tasks: Task[] = Array.isArray(data)
    ? data
    : data?.data ?? [];

  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;
  // Loading
  if (isLoading) {
    return (
      <div className="flex h-64 items-center justify-center rounded-lg border bg-white text-gray-500">
        Đang tải danh sách task...
      </div>
    );
  }
  // Error
  if (isError) {
    return (
      <div className="flex h-64 items-center justify-center rounded-lg border bg-white text-red-500">
        Không thể tải danh sách task.
      </div>
    );
  }

  const filteredTasks = tasks.filter((task) => {
    const keyword = search.toLowerCase();
    const tags =
      task.tags?.join(" ").toLowerCase() ?? "";
    return (
      task.title.toLowerCase().includes(keyword) ||
      task.status.toLowerCase().includes(keyword) ||
      task.priority.toLowerCase().includes(keyword) ||
      tags.includes(keyword) ||
      task.id.toString().includes(keyword)
    );
  });

  const start = (currentPage - 1) * pageSize;
  const pageTasks = filteredTasks.slice(
    start,
    start + pageSize
  );
  const columns: Column<Task>[] = [
    {
      key: "id",
      title: "ID",
      render: (task) => task.id,
    },

    {
      key: "title",
      title: "Tên task",
      render: (task) => (
        <span className="font-medium text-gray-800">
          {task.title}
        </span>
      ),
    },

    {
      key: "status",
      title: "Trạng thái",
      render: (task) => (
        <span>
          {task.status}
        </span>
      ),
    },

    {
      key: "priority",
      title: "Độ ưu tiên",
      render: (task) => (
        <span>
          {task.priority}
        </span>
      ),
    },



    {
      key: "assigneeId",
      title: "Người phụ trách",

      render: (task) => (
        <span>
          User #{task.assigneeId}
        </span>
      ),
    },



    {
      key: "tags",
      title: "Tag",

      render: (task) => (
        <span>
          {
            task.tags?.join(", ") || "-"
          }
        </span>
      ),
    },



    {
      key: "dueDate",
      title: "Deadline",

      render: (task) => (
        <span>
          {
            task.dueDate
              ? new Date(task.dueDate)
                  .toLocaleDateString("vi-VN")
              : "-"
          }
        </span>
      ),
    },


  ];



  return (
    <div className="rounded-lg border border-gray-200 bg-white p-4">


      <TableToolbar
        onSearch={(value) => {
          setSearch(value);
          setCurrentPage(1);
        }}
      />



      <div className="mt-4">

        <DataTable
          data={pageTasks}
          columns={columns}
        />

      </div>



      <TablePagination
        total={filteredTasks.length}
        pageSize={pageSize}
        current={currentPage}
        onChange={setCurrentPage}
      />


    </div>
  );
}