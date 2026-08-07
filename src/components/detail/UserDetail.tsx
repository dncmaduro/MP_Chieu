import type { User } from "../../types/user";

interface UserDetailProps {
  user: User;
}

export default function UserDetail({ user }: UserDetailProps) {
  
  return (
    <div className="space-y-6">
      {/* Profile Header */}
      <div className="flex flex-col items-center text-center p-6 bg-gray-50 rounded-xl border border-gray-150">
        <div className="w-24 h-24 mb-4 rounded-full ring-4 ring-blue-100 overflow-hidden flex items-center justify-center bg-gray-200">
          {user.avatarUrl ? (
            <img src={user.avatarUrl} alt={user.name} className="w-full h-full object-cover" />
          ) : (
            <span className="text-3xl font-semibold text-gray-500">
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
        
        <div className="bg-white p-4 rounded-xl border border-gray-100 space-y-4 text-sm">
          <div className="flex justify-between items-center py-1 border-b border-gray-50">
            <span className="text-gray-500">Mã nhân viên</span>
            <span className="font-semibold text-gray-800">#{user.id}</span>
          </div>

          <div className="flex justify-between items-center py-1 border-b border-gray-50">
            <span className="text-gray-500">Trạng thái</span>
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="font-medium text-emerald-700">Đang hoạt động</span>
            </div>
          </div>

          <div className="flex justify-between items-center py-1">
            <span className="text-gray-500">Phòng ban</span>
            <span className="font-medium text-gray-800">Phòng Công Nghệ</span>
          </div>
        </div>
      </div>
    </div>
  );
}
