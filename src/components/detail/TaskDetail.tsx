import type { TaskWithUser } from "../../types/task";

interface TaskDetailProps {
  task: TaskWithUser;
}

export default function TaskDetail({ task }: TaskDetailProps) {
  return (
    <div className="space-y-4">
      <div className="rounded-xl border border-gray-200 bg-gray-50 p-4">
        <div className="text-sm font-semibold text-gray-500">Tiêu đề</div>
        <div className="mt-1 text-lg font-semibold text-gray-900">{task.title}</div>
      </div>

      <div className="rounded-xl border border-gray-200 bg-white p-4">
        <div className="text-sm font-semibold text-gray-500">Mô tả</div>
        <div className="mt-1 text-sm text-gray-700">{task.description ?? "—"}</div>
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        <div className="rounded-xl border border-gray-200 bg-white p-4">
          <div className="text-sm font-semibold text-gray-500">Trạng thái</div>
          <div className="mt-1 text-sm font-medium text-gray-900">{task.status}</div>
        </div>
        <div className="rounded-xl border border-gray-200 bg-white p-4">
          <div className="text-sm font-semibold text-gray-500">Độ ưu tiên</div>
          <div className="mt-1 text-sm font-medium text-gray-900">{task.priority}</div>
        </div>
      </div>

      <div className="rounded-xl border border-gray-200 bg-white p-4">
        <div className="text-sm font-semibold text-gray-500">Người phụ trách</div>
        <div className="mt-2 text-sm text-gray-900">{task.user?.name ?? "Chưa phân công"}</div>
      </div>
    </div>
  );
}
