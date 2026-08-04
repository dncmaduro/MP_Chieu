import { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import type { User } from "../../types/user";
import { useUsers } from "../../hooks/useUsers";
import TableToolbar from "../common/TableHeader";
import DataTable, { type Column } from "../common/TableBody";
import TablePagination from "../common/TableFooter";
import Avatar from "../common/Avatar";
import FilterSidebar from "../common/filter/FilterSidebar";

const USER_FILTERS = [
  {
    key: "name",
    label: "Họ và tên",
    type: "text" as const,
  },
  {
    key: "role",
    label: "Vai trò",
    type: "select" as const,
    options: [
      { label: "Frontend Developer", value: "Frontend Developer" },
      { label: "Backend Developer", value: "Backend Developer" },
      { label: "UI/UX Designer", value: "UI/UX Designer" },
      { label: "QA Engineer", value: "QA Engineer" },
      { label: "Project Manager", value: "Project Manager" },
    ],
  },
  {
    key: "id",
    label: "ID",
    type: "text" as const,
  },
];

export default function UserPage() {
  const {
    data: users = [],
    isLoading,
    isError,
  } = useUsers();

  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const [selectedRows, setSelectedRows] = useState<(number | string)[]>([]);
  const { setSelectedCount, setOnClearSelection } = useOutletContext<{
    setSelectedCount: (count: number) => void;
    setOnClearSelection: (fn: (() => void) | null) => void;
  }>();

  useEffect(() => {
    setSelectedCount(selectedRows.length);
    setOnClearSelection(() => () => setSelectedRows([]));
    return () => {
      setSelectedCount(0);
      setOnClearSelection(null);
    };
  }, [selectedRows, setSelectedCount, setOnClearSelection]);

  const [draftFilterValues, setDraftFilterValues] = useState<Record<string, string>>({
    name: "",
    role: "",
    id: "",
  });

  const [appliedFilterValues, setAppliedFilterValues] = useState<Record<string, string>>({
    name: "",
    role: "",
    id: "",
  });

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

  const handleFilterChange = (key: string, value: string) => {
    setDraftFilterValues((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleApplyFilter = () => {
    setAppliedFilterValues(draftFilterValues);
    setCurrentPage(1);
  };

  const handleResetFilter = () => {
    const emptyValues = {
      name: "",
      role: "",
      id: "",
    };
    setDraftFilterValues(emptyValues);
    setAppliedFilterValues(emptyValues);
    setCurrentPage(1);
  };

  const filteredUsers = users.filter((user) => {
    const keyword = search.toLowerCase();
    const matchesSearch =
      user.name.toLowerCase().includes(keyword) ||
      user.role.toLowerCase().includes(keyword) ||
      user.id.toString().includes(keyword);

    const matchesName = appliedFilterValues.name
      ? user.name.toLowerCase().includes(appliedFilterValues.name.toLowerCase())
      : true;

    const matchesRole = appliedFilterValues.role
      ? user.role === appliedFilterValues.role
      : true;

    const matchesId = appliedFilterValues.id
      ? user.id.toString().includes(appliedFilterValues.id)
      : true;

    return matchesSearch && matchesName && matchesRole && matchesId;
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
      width: 250,
      sortValue: (user) => user.name,
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
      width: 180,
      sortValue: (user) => user.role,
      render: (user) => user.role,
    },
    {
      key: "id",
      title: "ID",
      width: 120,
      sortValue: (user) => user.id,
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
        onToggleFilter={() => {
          setIsFilterOpen((prev) => !prev);
        }}
      />
      <div className="flex min-w-0">
        <div className="flex-1 min-w-0">
          <div className="mt-4">
            <DataTable
              data={pageUsers}
              columns={columns}
              selectedRows={selectedRows}
              onSelectionChange={setSelectedRows}
            />
          </div>
          <TablePagination
            total={filteredUsers.length}
            pageSize={pageSize}
            current={currentPage}
            onChange={setCurrentPage}
          />
        </div>
        {isFilterOpen && (
          <FilterSidebar
            filters={USER_FILTERS}
            values={draftFilterValues}
            onChange={handleFilterChange}
            onReset={handleResetFilter}
            onApply={handleApplyFilter}
          />
        )}
      </div>
    </div>
  );
}