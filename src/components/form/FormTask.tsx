import { useState } from "react";
import Form from "../common/Form";
import TextBox from "../common/TextBox";
import ComboBox from "../common/ComboBox";
import Calendar from "../common/Calendar";
import { useUsers } from "../../hooks/useUsers";
import { useCreateTask } from "../../hooks/useTasks";
import type { TaskStatus, TaskPriority } from "../../types/task";

interface FormTaskProps {
  onSuccess?: () => void;
  onCancel?: () => void;
}

const STATUS_OPTIONS = [
  { label: "Todo", value: "todo" },
  { label: "In Progress", value: "in_progress" },
  { label: "Done", value: "done" },
];

const PRIORITY_OPTIONS = [
  { label: "Low", value: "low" },
  { label: "Medium", value: "medium" },
  { label: "High", value: "high" },
];

export default function FormTask({ onSuccess, onCancel }: FormTaskProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState<TaskStatus>("todo");
  const [priority, setPriority] = useState<TaskPriority>("medium");
  const [userId, setUserId] = useState("");
  const [dueDate, setDueDate] = useState("");

  const { data: users = [], isLoading: isLoadingUsers } = useUsers();
  const createTaskMutation = useCreateTask();

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [generalError, setGeneralError] = useState<string | null>(null);

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!title.trim()) {
      newErrors.title = "Vui lòng nhập tiêu đề công việc.";
    }
    if (!status) {
      newErrors.status = "Vui lòng chọn trạng thái.";
    }
    if (!priority) {
      newErrors.priority = "Vui lòng chọn độ ưu tiên.";
    }
    if (!userId) {
      newErrors.userId = "Vui lòng chọn người phụ trách.";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = async () => {
    if (!validate()) {
      setGeneralError("Vui lòng điền đầy đủ các thông tin bắt buộc.");
      return;
    }
    setGeneralError(null);

    // Chuyển đổi userId sang number nếu có thể
    const parsedUserId = isNaN(Number(userId)) ? userId : Number(userId);

    createTaskMutation.mutate(
      {
        title: title.trim(),
        description: description.trim() || undefined,
        status,
        priority,
        userId: parsedUserId,
        dueDate: dueDate || null,
      },
      {
        onSuccess: () => {
          onSuccess?.();
        },
        onError: () => {
          setGeneralError("Có lỗi xảy ra khi lưu công việc, vui lòng thử lại.");
        },
      }
    );
  };

  const userOptions = users.map((user) => ({
    label: user.name,
    value: String(user.id),
  }));

  return (
    <Form
      title="Thêm công việc mới"
      onSave={handleSave}
      onCancel={() => onCancel?.()}
      isSaving={createTaskMutation.isPending}
    >
      {generalError && (
        <div className="rounded-md bg-red-50 border border-red-200 px-4 py-2 text-sm text-red-700">
          {generalError}
        </div>
      )}

      <TextBox
        label="Tiêu đề công việc"
        required
        id="task-title"
        value={title}
        onChange={(e) => {
          setTitle(e.target.value);
          if (e.target.value.trim() && errors.title) {
            setErrors((prev) => ({ ...prev, title: "" }));
          }
        }}
        placeholder="Nhập tiêu đề công việc"
        error={errors.title}
      />

      <TextBox
        label="Mô tả công việc"
        id="task-description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Nhập mô tả chi tiết công việc"
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <ComboBox
          label="Trạng thái"
          required
          id="task-status"
          value={status}
          onChange={(e) => setStatus(e.target.value as TaskStatus)}
          options={STATUS_OPTIONS}
          error={errors.status}
        />

        <ComboBox
          label="Độ ưu tiên"
          required
          id="task-priority"
          value={priority}
          onChange={(e) => setPriority(e.target.value as TaskPriority)}
          options={PRIORITY_OPTIONS}
          error={errors.priority}
        />
      </div>

      <ComboBox
        label="Người phụ trách"
        required
        id="task-user"
        value={userId}
        onChange={(e) => {
          setUserId(e.target.value);
          if (e.target.value && errors.userId) {
            setErrors((prev) => ({ ...prev, userId: "" }));
          }
        }}
        placeholder={isLoadingUsers ? "Đang tải danh sách người dùng..." : "Chọn người phụ trách"}
        options={userOptions}
        disabled={isLoadingUsers}
        error={errors.userId}
      />

      <Calendar
        label="Hạn chót"
        id="task-due-date"
        value={dueDate}
        onChange={(e) => setDueDate(e.target.value)}
      />
    </Form>
  );
}
