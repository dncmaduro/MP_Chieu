import { useState, useEffect } from "react";
import Form from "../common/Form";
import TextBox from "../common/TextBox";
import ComboBox from "../common/ComboBox";
import { useUser } from "../../hooks/useUserDetail";
import { useUpdateUser } from "../../hooks/useUsers";
import { apiClient } from "../../services/apiClient";
import { useCreateUser } from "../../hooks/useUsers";
interface FormUserProps {
  userId?: number | string;
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

export default function FormUser({ userId, onSuccess, onCancel }: FormUserProps) {
  const isEdit = !!userId;
  
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [avatarUrl, setAvatarUrl] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [generalError, setGeneralError] = useState<string | null>(null);

  const { data: userDetail, isLoading: isLoadingUser } = useUser(userId);
  const updateUserMutation = useUpdateUser();
  const createUserMutation = useCreateUser();
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    if (isEdit && userDetail && !isInitialized) {
      setName(userDetail.name || "");
      setRole(userDetail.role || "");
      setAvatarUrl(userDetail.avatarUrl || "");
      setIsInitialized(true);
    }
  }, [isEdit, userDetail, isInitialized]);

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
      if (isEdit) {
        updateUserMutation.mutate(
          {
            id: userId,
            data: {
              name: name.trim(),
              role: role.trim(),
              avatarUrl: avatarUrl.trim(),
            },
          },
          {
            onSuccess: () => {
              setIsSaving(false);
              onSuccess?.();
            },
            onError: () => {
              setIsSaving(false);
              setGeneralError("Có lỗi xảy ra khi cập nhật, vui lòng thử lại.");
            },
          }
        );
      } else {
        createUserMutation.mutate(
          {
            name: name.trim(),
            role: role.trim(),
            avatarUrl: avatarUrl.trim() || null,
          },
          {
            onSuccess: () => {
              setIsSaving(false);
              onSuccess?.();
            },
            onError: () => {
              setIsSaving(false);
              setGeneralError("Có lỗi xảy ra khi thêm người dùng, vui lòng thử lại.");
            },
          }
        );
        // await apiClient.post("/users", {
        //   name: name.trim(),
        //   role: role.trim(),
        //   avatarUrl: avatarUrl.trim() || null,
        // });
        // setIsSaving(false);
        // onSuccess?.();
      }
    } catch {
      setIsSaving(false);
      setGeneralError("Có lỗi xảy ra khi lưu, vui lòng thử lại.");
    }
  };

  if (isEdit && isLoadingUser) {
    return (
      <div className="flex flex-col items-center justify-center p-12 bg-white rounded-2xl border border-gray-200 min-h-[300px]">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-blue-500 border-t-transparent" />
        <span className="mt-3 text-sm text-gray-500 font-medium">Đang tải thông tin người dùng...</span>
      </div>
    );
  }
  return (
    <Form
      title={isEdit ? "Chỉnh sửa thông tin người dùng" : "Thêm người dùng mới"}
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
