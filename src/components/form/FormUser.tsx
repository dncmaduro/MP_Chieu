import { useState } from "react";
import { apiClient } from "../../services/apiClient";
import Form from "../common/Form";
import TextBox from "../common/TextBox";
import ComboBox from "../common/ComboBox";

interface FormUserProps {
  onSuccess?: () => void;
  onCancel?: () => void;
}

const ROLE_OPTIONS = [
  { label: "Frontend Developer", value: "Frontend Developer" },
  { label: "Backend Developer", value: "Backend Developer" },
  { label: "UI/UX Designer", value: "UI/UX Designer" },
  { label: "QA Engineer", value: "QA Engineer" },
  { label: "Project Manager", value: "Project Manager" },
];

export default function FormUser({ onSuccess, onCancel }: FormUserProps) {
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [avatarUrl, setAvatarUrl] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [generalError, setGeneralError] = useState<string | null>(null);

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!name.trim()) {
      newErrors.name = "Vui lòng nhập họ và tên.";
    }
    if (!role) {
      newErrors.role = "Vui lòng chọn vai trò.";
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
    setIsSaving(true);
    try {
      await apiClient.post("/users", {
        name: name.trim(),
        role: role.trim(),
        avatarUrl: avatarUrl.trim() || null,
      });
      onSuccess?.();
    } catch {
      setGeneralError("Có lỗi xảy ra khi lưu, vui lòng thử lại.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <Form
      title="Thêm người dùng mới"
      onSave={handleSave}
      onCancel={() => onCancel?.()}
      isSaving={isSaving}
    >
      {generalError && (
        <div className="rounded-md bg-red-50 border border-red-200 px-4 py-2 text-sm text-red-700">
          {generalError}
        </div>
      )}

      <TextBox
        label="Họ và tên"
        required
        id="user-name"
        value={name}
        onChange={(e) => {
          setName(e.target.value);
          if (e.target.value.trim() && errors.name) {
            setErrors((prev) => ({ ...prev, name: "" }));
          }
        }}
        placeholder="Nhập họ và tên"
        error={errors.name}
      />

      <ComboBox
        label="Vai trò"
        required
        id="user-role"
        value={role}
        onChange={(e) => {
          setRole(e.target.value);
          if (e.target.value && errors.role) {
            setErrors((prev) => ({ ...prev, role: "" }));
          }
        }}
        placeholder="Chọn vai trò"
        options={ROLE_OPTIONS}
        error={errors.role}
      />

      <TextBox
        label="URL ảnh đại diện"
        id="user-avatar"
        value={avatarUrl}
        onChange={(e) => setAvatarUrl(e.target.value)}
        placeholder="https://..."
      />
    </Form>
  );
}
