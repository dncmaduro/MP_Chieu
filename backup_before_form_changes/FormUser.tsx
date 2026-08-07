import { useState } from "react";
import Form from "../common/Form";
import TextBox from "../common/TextBox";
import ComboBox from "../common/ComboBox";
import ImageUpload from "../common/ImageUpload";
import { userService } from "../../services/userService";

interface FormUserProps {
  onSuccess: () => void;
  onCancel: () => void;
}

// Các tùy chọn vai trò user
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
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSaving, setIsSaving] = useState(false);

  // Validate và trả về object lỗi
  const validate = () => {
    const errs: Record<string, string> = {};
    if (!name.trim()) errs.name = "Vui lòng nhập họ và tên";
    if (!role) errs.role = "Vui lòng chọn vai trò";
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
      await userService.createUser({ name: name.trim(), role, avatarUrl });
      onSuccess();
    } catch (err) {
      console.error("Lỗi khi tạo người dùng:", err);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <Form title="Thêm người dùng" onSave={handleSave} onCancel={onCancel} isSaving={isSaving}>
      <ImageUpload
        label="Ảnh đại diện"
        value={avatarUrl}
        onChange={setAvatarUrl}
      />

      <TextBox
        label="Họ và tên"
        value={name}
        onChange={(v) => { setName(v); setErrors((e) => ({ ...e, name: "" })); }}
        placeholder="Nhập họ và tên..."
        required
        error={errors.name}
      />

      <ComboBox
        label="Vai trò"
        value={role}
        onChange={(v) => { setRole(v); setErrors((e) => ({ ...e, role: "" })); }}
        options={ROLE_OPTIONS}
        placeholder="Chọn vai trò..."
        required
        error={errors.role}
      />
    </Form>
  );
}
