import { useState } from "react";
import Form from "../common/Form";
import TextBox from "../common/TextBox";
import ComboBox from "../common/ComboBox";
import DatePicker from "../common/DatePicker";
import { taskService } from "../../services/taskService";
import { useUsers } from "../../hooks/useUsers";
import type { TaskStatus, TaskPriority } from "../../types/task";

interface FormTaskProps {
  onSuccess: () => void;
  onCancel: () => void;
}

const STATUS_OPTIONS = [
  { label: "Todo", value: "todo" },
  { label: "In Progress", value: "in_progress" },
  { label: "Done", value: "done" },
];

const PRIORITY_OPTIONS = [
  { label: "Thấp", value: "low" },
  { label: "Trung bình", value: "medium" },
  { label: "Cao", value: "high" },
];

export default function FormTask({ onSuccess, onCancel }: FormTaskProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState<TaskStatus>("todo");
  const [priority, setPriority] = useState<TaskPriority>("medium");
  const [userId, setUserId] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSaving, setIsSaving] = useState(false);

  // Lấy danh sách user để chọn người phụ trách
  const { data: users = [] } = useUsers();
  const userOptions = users.map((u) => ({ label: u.name, value: String(u.id) }));

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!title.trim()) errs.title = "Vui lòng nhập tiêu đề";
    if (!userId) errs.userId = "Vui lòng chọn người phụ trách";
    return errs;
  };

  const handleSave = async () => {
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }

    setIsSaving(true);
    try {
      await taskService.createTask({
        title: title.trim(),
        description: description.trim() || undefined,
        status,
        priority,
        userId,
        dueDate: dueDate || null,
      });
      onSuccess();
    } catch (err) {
      console.error("Lỗi khi tạo công việc:", err);
    } finally {
      setIsSaving(false);
    }
  };

  const clearErr = (key: string) => setErrors((e) => ({ ...e, [key]: "" }));

  return (
    <Form title="Thêm công việc" onSave={handleSave} onCancel={onCancel} isSaving={isSaving}>
      <TextBox
        label="Tiêu đề"
        value={title}
        onChange={(v) => { setTitle(v); clearErr("title"); }}
        placeholder="Nhập tiêu đề công việc..."
        required
        error={errors.title}
      />

      <TextBox
        label="Mô tả"
        value={description}
        onChange={setDescription}
        placeholder="Nhập mô tả (tuỳ chọn)..."
      />

      <ComboBox
        label="Người phụ trách"
        value={userId}
        onChange={(v) => { setUserId(v); clearErr("userId"); }}
        options={userOptions}
        placeholder="Chọn người phụ trách..."
        required
        error={errors.userId}
      />

      <ComboBox
        label="Trạng thái"
        value={status}
        onChange={(v) => setStatus(v as TaskStatus)}
        options={STATUS_OPTIONS}
      />

      <ComboBox
        label="Độ ưu tiên"
        value={priority}
        onChange={(v) => setPriority(v as TaskPriority)}
        options={PRIORITY_OPTIONS}
      />

      <DatePicker
        label="Hạn chót"
        value={dueDate}
        onChange={setDueDate}
      />
    </Form>
  );
}
