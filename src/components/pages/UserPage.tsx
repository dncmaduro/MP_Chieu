import { useState } from "react";

import type { User } from "../../types/user";

import { useUsers } from "../../hooks/useUsers";

import TableToolbar from "../common/TableHeader";
import DataTable, { type Column } from "../common/TableBody";
import TablePagination from "../common/TableFooter";
import Avatar from "../common/Avatar";


export default function UserPage() {

  const {
    data: users = [],
    isLoading,
    isError,
  } = useUsers();


  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const pageSize = 10;

  // Loading
  if (isLoading) {
    return (
      <div className="flex h-64 items-center justify-center rounded-lg border bg-white text-gray-500">
        Đang tải danh sách người dùng...
      </div>
    );
  }

  // Error
  if (isError) {
    return (
      <div className="flex h-64 items-center justify-center rounded-lg border bg-white text-red-500">
        Không thể tải danh sách người dùng.
      </div>
    );
  }



  const filteredUsers = users.filter((user) => {

    const keyword = search.toLowerCase();


    return (
      user.name.toLowerCase().includes(keyword) ||
      user.role.toLowerCase().includes(keyword) ||
      user.id.toString().includes(keyword)
    );

  });

  const start = (currentPage - 1) * pageSize;

  const pageUsers = filteredUsers.slice(
    start,
    start + pageSize
  );


  const columns: Column<User>[] = [
    {
      key: "name",
      title: "Họ và tên",
      render: (user) => (
        <div className="flex items-center gap-3">
          <Avatar
            name={user.name}
            avatarUrl={user.avatarUrl}
          />
          <span className="font-medium">
            {user.name}
          </span>

        </div>
      ),
    },

    {
      key: "role",
      title: "Vai trò",
      render: (user) => user.role,
    },

    {
      key: "id",
      title: "ID",
      render: (user) => user.id,
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
          data={pageUsers}
          columns={columns}
        />
      </div>
      <TablePagination
        total={filteredUsers.length}
        pageSize={pageSize}
        current={currentPage}
        onChange={setCurrentPage}
      />
    </div>

  );
}