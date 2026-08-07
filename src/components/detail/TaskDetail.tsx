import type { TaskWithUser } from "../../types/task";

interface TaskDetailProps {
  task: TaskWithUser;
  onEdit?: () => void;
}

export default function TaskDetail({ task, onEdit }: TaskDetailProps) {
  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case "todo":
        return "bg-gray-100 text-gray-800 border-gray-200";
      case "in_progress":
        return "bg-blue-50 text-blue-700 border-blue-100";
      case "done":
        return "bg-emerald-50 text-emerald-700 border-emerald-100";
      default:
        return "bg-gray-50 text-gray-600 border-gray-100";
    }
  };

  const getPriorityBadgeClass = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-rose-50 text-rose-700 border-rose-100";
      case "medium":
        return "bg-amber-50 text-amber-700 border-amber-100";
      case "low":
        return "bg-slate-100 text-slate-700 border-slate-200";
      default:
        return "bg-gray-50 text-gray-600 border-gray-100";
    }
  };

  return (
    <div className="space-y-5">
      <div className="rounded-xl border border-gray-200 bg-gray-50 p-5 shadow-xs">
        <div className="text-xs font-bold text-gray-400 uppercase tracking-wider">Tiêu đề</div>
        <div className="mt-1.5 text-lg font-bold text-gray-900 leading-snug">{task.title}</div>
      </div>

      <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-xs">
        <div className="text-xs font-bold text-gray-400 uppercase tracking-wider">Mô tả</div>
        <div className="mt-2 text-sm text-gray-700 whitespace-pre-wrap leading-relaxed">{task.description ?? "—"}</div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-xs">
          <div className="text-xs font-bold text-gray-400 uppercase tracking-wider">Trạng thái</div>
          <div className="mt-2">
            <span className={`inline-flex px-3 py-1 text-xs font-semibold rounded-full border ${getStatusBadgeClass(task.status)}`}>
              {task.status.toUpperCase().replace("_", " ")}
            </span>
          </div>
        </div>
        <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-xs">
          <div className="text-xs font-bold text-gray-400 uppercase tracking-wider">Độ ưu tiên</div>
          <div className="mt-2">
            <span className={`inline-flex px-3 py-1 text-xs font-semibold rounded-full border ${getPriorityBadgeClass(task.priority)}`}>
              {task.priority.toUpperCase()}
            </span>
          </div>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-xs">
          <div className="text-xs font-bold text-gray-400 uppercase tracking-wider">Người phụ trách</div>
          <div className="mt-2 text-sm font-semibold text-gray-800">{task.user?.name ?? "Chưa phân công"}</div>
        </div>
        <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-xs">
          <div className="text-xs font-bold text-gray-400 uppercase tracking-wider">Hạn chót</div>
          <div className="mt-2 text-sm font-semibold text-gray-800">{task.dueDate ?? "—"}</div>
        </div>
      </div>

      {onEdit && (
        <div className="pt-4 border-t border-gray-100 flex justify-end">
          <button
            onClick={onEdit}
            className="flex items-center gap-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 text-sm font-semibold shadow-sm hover:shadow-md transition-all duration-200"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
            </svg>
            Chỉnh sửa công việc
          </button>
        </div>
      )}
    </div>
  );
}
