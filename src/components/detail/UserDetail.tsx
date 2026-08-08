import type { User } from "../../types/user";

interface UserDetailProps {
  user: User;
  onEdit?: () => void;
}

export default function UserDetail({ user, onEdit }: UserDetailProps) {
  
  return (
    <div className="space-y-6">
      {/* Profile Header */}
      <div className="flex flex-col items-center text-center p-6 bg-gray-50 rounded-xl border border-gray-150 shadow-xs">
        <div className="w-24 h-24 mb-4 rounded-full ring-4 ring-blue-100 overflow-hidden flex items-center justify-center bg-gray-250 shadow-inner">
          {user.avatarUrl ? (
            <img src={user.avatarUrl} alt={user.name} className="w-full h-full object-cover" />
          ) : (
            <span className="text-3xl font-bold text-blue-600">
              {user.name.charAt(0).toUpperCase()}
            </span>
          )}
        </div>
        <h3 className="text-xl font-bold text-gray-800">{user.name}</h3>
        <span className="mt-2 px-3 py-1 bg-blue-50 text-blue-700 text-xs font-semibold rounded-full border border-blue-100">
          {user.role}
        </span>
      </div>

      {/* Thông tin chi tiết */}
      <div className="space-y-3">
        <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider">Thông tin cá nhân</h4>
        
        <div className="bg-white p-4 rounded-xl border border-gray-100 space-y-4 text-sm shadow-xs">
          <div className="flex justify-between items-center py-2 border-b border-gray-50">
            <span className="text-gray-500 font-medium">Mã nhân viên</span>
            <span className="font-semibold text-gray-800">#{user.id}</span>
          </div>

          <div className="flex justify-between items-center py-2 border-b border-gray-50">
            <span className="text-gray-500 font-medium">Trạng thái</span>
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="font-semibold text-emerald-700">Đang hoạt động</span>
            </div>
          </div>

          <div className="flex justify-between items-center py-2">
            <span className="text-gray-500 font-medium">Phòng ban</span>
            <span className="font-semibold text-gray-800">Phòng Công Nghệ</span>
          </div>
        </div>
      </div>

      {/* Action buttons */}
      {onEdit && (
        <div className="pt-4 border-t border-gray-100 flex justify-end">
          <button
            onClick={onEdit}
            className="flex items-center gap-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 text-sm font-semibold shadow-sm hover:shadow-md transition-all duration-200"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
            </svg>
            Chỉnh sửa thông tin
          </button>
        </div>
      )}
    </div>
  );
}
