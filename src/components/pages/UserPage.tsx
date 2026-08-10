import { useEffect, useState } from "react";
import { useOutletContext, useSearchParams, useNavigate } from "react-router-dom";
import type { User } from "../../types/user";
import { useUsers } from "../../hooks/useUsers";
import TableToolbar from "../common/TableHeader";
import DataTable, { type Column } from "../common/TableBody";
import TablePagination from "../common/TableFooter";
import Avatar from "../common/Avatar";
import FilterSidebar from "../common/filter/FilterSidebar";
import ActionDetail from "../common/ActionDetail";
import UserDetail from "../detail/UserDetail";
import { useUser } from "../../hooks/useUserDetail";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiClient } from "../../services/apiClient";
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
  const navigate = useNavigate();
  const {
    data: users = [],
    isLoading,
    isError,
  } = useUsers();

  const [searchParams, setSearchParams] = useSearchParams();

  const search = searchParams.get("keyword") || "";
  const currentPage = Number(searchParams.get("page")) || 1;
  const pageSize = Number(searchParams.get("pageSize")) || 10;
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const [selectedRows, setSelectedRows] = useState<(number | string)[]>([]);
  const { setSelectedCount, setOnClearSelection, setOnDelete } = useOutletContext<{
    setSelectedCount: (count: number) => void;
    setOnClearSelection: (fn: (() => void) | null) => void;
    setOnDelete: (fn: (() => void) | null) => void;
  }>();

  const [selectedUserId, setSelectedUserId] = useState<number | string | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const { data: userDetail, isFetching } = useUser(selectedUserId);

  useEffect(() => {
    if (selectedUserId && !isFetching && userDetail) {
      const timer = setTimeout(() => {
        setIsDrawerOpen(true);
      }, 0);
      return () => clearTimeout(timer);
    }
  }, [selectedUserId, isFetching, userDetail]);

  const handleCellClick = (id: number | string) => {
    setSelectedUserId(id);
  };

  const handleCloseDrawer = () => {
    setIsDrawerOpen(false);
    setSelectedUserId(null);
  };

  const queryClient = useQueryClient();
  const deleteMutation = useMutation({
    mutationFn: async (ids: (number | string)[]) => {
      await Promise.all(ids.map((id) => apiClient.delete(`/users/${id}`)));
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      setSelectedRows([]);
    },
  });

  const handleDeleteSelected = () => {
    if (selectedRows.length === 0) return;
    if (window.confirm(`Bạn có chắc chắn muốn xóa ${selectedRows.length} người dùng đã chọn?`)) {
      deleteMutation.mutate(selectedRows);
    }
  };

  useEffect(() => {
    setSelectedCount(selectedRows.length);
    setOnClearSelection(() => () => setSelectedRows([]));
    setOnDelete(() => handleDeleteSelected);
    return () => {
      setSelectedCount(0);
      setOnClearSelection(null);
      setOnDelete(null);
    };
  }, [selectedRows, setSelectedCount, setOnClearSelection, setOnDelete]);

  const [draftFilterValues, setDraftFilterValues] = useState<Record<string, string>>({
    name: "",
    role: "",
    id: "",
  });

  // Sync draft filters with URL when searchParams changes (reload / direct URL)
  useEffect(() => {
    setDraftFilterValues({
      name: searchParams.get("name") || "",
      role: searchParams.get("role") || "",
      id: searchParams.get("id") || "",
    });
  }, [searchParams]);

  const appliedFilterValues = {
    name: searchParams.get("name") || "",
    role: searchParams.get("role") || "",
    id: searchParams.get("id") || "",
  };

  const handleFilterChange = (key: string, value: string) => {
    setDraftFilterValues((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleApplyFilter = () => {
    setSearchParams((prev) => {
      const next = new URLSearchParams(prev);
      Object.entries(draftFilterValues).forEach(([key, val]) => {
        if (val) {
          next.set(key, val);
        } else {
          next.delete(key);
        }
      });
      next.set("page", "1");
      return next;
    });
  };

  const handleResetFilter = () => {
    const emptyValues = { name: "", role: "", id: "" };
    setDraftFilterValues(emptyValues);
    setSearchParams((prev) => {
      const next = new URLSearchParams(prev);
      Object.keys(emptyValues).forEach((key) => next.delete(key));
      next.set("page", "1");
      return next;
    });
  };

  const filteredUsers = users.filter((user) => {
    const kw = search.toLowerCase();
    const matchesSearch =
      user.name.toLowerCase().includes(kw) ||
      user.role.toLowerCase().includes(kw) ||
      user.id.toString().includes(kw);

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
  const pageUsers = filteredUsers.slice(start, start + pageSize);

  const columns: Column<User>[] = [
    {
      key: "name",
      title: "Họ và tên",
      width: 250,
      sortValue: (user) => user.name,
      render: (user) => (
        <div className="flex items-center gap-3">
          <Avatar name={user.name} avatarUrl={user.avatarUrl} />
          <span className="font-medium">{user.name}</span>
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
        searchValue={search}
        onSearch={(value) => {
          setSearchParams((prev) => {
            const next = new URLSearchParams(prev);
            if (value) {
              next.set("keyword", value);
            } else {
              next.delete("keyword");
            }
            next.set("page", "1");
            return next;
          });
        }}
        onToggleFilter={() => {
          setIsFilterOpen((prev) => !prev);
        }}
        onAdd={() => navigate("/user/new")}
      />
      <div className="flex min-w-0">
        <div className="flex-1 min-w-0">
          <div className="mt-4">
            <DataTable
              data={pageUsers}
              columns={columns}
              isLoading={isLoading}
              isError={isError}
              selectedRows={selectedRows}
              onSelectionChange={setSelectedRows}
              onCellClick={handleCellClick}
            />
          </div>
          <TablePagination
            total={filteredUsers.length}
            pageSize={pageSize}
            current={currentPage}
            onChange={(newPage) => {
              setSearchParams((prev) => {
                const next = new URLSearchParams(prev);
                next.set("page", String(newPage));
                return next;
              });
            }}
          />
        </div>
        {isFilterOpen && (
          <FilterSidebar
            filters={USER_FILTERS}
            values={draftFilterValues}
            onChange={handleFilterChange}
            onReset={handleResetFilter}
            onApply={handleApplyFilter}
            onClose={() => setIsFilterOpen(false)}
          />
        )}
      </div>

      

      <ActionDetail open={isDrawerOpen} onClose={handleCloseDrawer} title="Chi tiết người dùng">
        {userDetail && (
          <UserDetail
            user={userDetail}
            onEdit={() => {
              handleCloseDrawer();
              navigate(`/user/edit/${userDetail.id}`);
            }}
          />
        )}
      </ActionDetail>
    </div>
  );
}