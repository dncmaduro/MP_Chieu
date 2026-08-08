import { useEffect, useMemo, useState } from "react";

import sortUpIcon from "../../assets/icons/sort_up.png";
import sortDownIcon from "../../assets/icons/sort_down.png";
import TableLoading from "./TableLoading";
import TableEmpty from "./TableEmpty";
import TableError from "./TableError";
import { normalize } from "../../utils";

export interface Column<T> {
  title: string;
  key: string;
  render: (row: T) => React.ReactNode;
  width?: number;
  sortable?: boolean;
  sortValue?: (row: T) => string | number | Date | null | undefined;
}

type SortDirection = "asc" | "desc";

interface DataTableProps<T extends { id: number | string }> {
  data: T[];
  columns: Column<T>[];

  isLoading?: boolean;
  isError?: boolean;

  sortKey?: string;
  sortDirection?: SortDirection;

  onSort?: (key: string) => void;

  selectedRows?: (number | string)[];
  onSelectionChange?: (selectedRows: (number | string)[]) => void;
  onCellClick?: (id: number | string) => void;
}

export default function DataTable<
  T extends { id: number | string }
>({
  data,
  columns,
  isLoading = false,
  isError = false,
  sortKey,
  sortDirection,
  onSort,
  selectedRows,
  onSelectionChange,
  onCellClick,
}: DataTableProps<T>) {
  const [selectedRowsInternal, setSelectedRowsInternal] = useState<(number | string)[]>([]);
  const isControlled = selectedRows !== undefined;
  const currentSelectedRows = isControlled ? selectedRows : selectedRowsInternal;

  const [columnWidths, setColumnWidths] = useState<Record<string, number>>({});
  const [activeSort, setActiveSort] = useState<{
    key: string;
    direction: SortDirection;
  } | null>(null);
  const [dragInfo, setDragInfo] = useState<{
    columnKey: string;
    startX: number;
    startWidth: number;
  } | null>(null);

  const defaultColumnWidth = 180;

  useEffect(() => {
    setColumnWidths((prev) => {
      const next = { ...prev };
      columns.forEach((column) => {
        if (!next[column.key]) {
          next[column.key] = column.width ?? defaultColumnWidth;
        }
      });
      return next;
    });
  }, [columns]);

  useEffect(() => {
    if (!dragInfo) return;

    const handleMouseMove = (event: MouseEvent) => {
      const nextWidth = Math.max(100, dragInfo.startWidth + event.clientX - dragInfo.startX);
      setColumnWidths((prev) => ({
        ...prev,
        [dragInfo.columnKey]: nextWidth,
      }));
    };

    const handleMouseUp = () => {
      setDragInfo(null);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [dragInfo]);

  const toggleRow = (id: number | string) => {
    const next = currentSelectedRows.includes(id)
      ? currentSelectedRows.filter((item) => item !== id)
      : [...currentSelectedRows, id];

    if (!isControlled) {
      setSelectedRowsInternal(next);
    }
    onSelectionChange?.(next);
  };

  const currentSort = sortKey
    ? { key: sortKey, direction: sortDirection ?? "asc" }
    : activeSort;

  const handleSort = (column: Column<T>) => {
    if (column.sortable === false) return;

    const nextDirection: SortDirection =
      currentSort?.key === column.key && currentSort.direction === "asc"
        ? "desc"
        : "asc";

    if (sortKey) {
      onSort?.(column.key);
      return;
    }

    setActiveSort({ key: column.key, direction: nextDirection });
  };

  const sortedData = useMemo(() => {
    if (!currentSort) {
      return data;
    }

    const column = columns.find((item) => item.key === currentSort.key);
    if (!column) {
      return data;
    }

    const sortedRows = [...data].sort((a, b) => {
      const leftValue = column.sortValue ? column.sortValue(a) : (a as Record<string, unknown>)[column.key];
      const rightValue = column.sortValue ? column.sortValue(b) : (b as Record<string, unknown>)[column.key];
      const left = normalize(leftValue);
      const right = normalize(rightValue);

      if (left === right) return 0;
      if (left === "") return 1;
      if (right === "") return -1;

      if (typeof left === "number" && typeof right === "number") {
        return left - right;
      }

      return String(left).localeCompare(String(right), undefined, { numeric: true });
    });

    return currentSort.direction === "desc" ? sortedRows.reverse() : sortedRows;
  }, [data, columns, currentSort]);

  const totalWidth = 48 + columns.reduce((sum, column) => sum + (columnWidths[column.key] ?? column.width ?? defaultColumnWidth), 0);

  // +1 checkbox column
  const totalColSpan = columns.length + 1;

  return (
    <div className="relative w-full max-w-full overflow-hidden rounded-lg border border-gray-200 bg-white">
      {/* Loading overlay  */}
      {isLoading && <TableLoading />}
      <div className="table-scroll max-w-full overflow-x-auto">
        <table className="table-fixed border-collapse text-sm" style={{ minWidth: `${totalWidth}px`, width: "100%" }}>
          <thead className="bg-gray-50 text-left text-gray-700">
            <tr className="h-11 border-b">
              <th className="w-12 border-r border-gray-300 bg-gray-50 text-center px-2">
                <input
                  type="checkbox"
                  checked={data.length > 0 && data.every((row) => currentSelectedRows.includes(row.id))}
                  ref={(el) => {
                    if (el) {
                      const allSelected = data.length > 0 && data.every((row) => currentSelectedRows.includes(row.id));
                      const someSelected = data.length > 0 && data.some((row) => currentSelectedRows.includes(row.id));
                      el.indeterminate = someSelected && !allSelected;
                    }
                  }}
                  onChange={(e) => {
                    if (e.target.checked) {
                      const allIds = data.map((row) => row.id);
                      const next = Array.from(new Set([...currentSelectedRows, ...allIds]));
                      if (!isControlled) {
                        setSelectedRowsInternal(next);
                      }
                      onSelectionChange?.(next);
                    } else {
                      const currentIds = data.map((row) => row.id);
                      const next = currentSelectedRows.filter((id) => !currentIds.includes(id));
                      if (!isControlled) {
                        setSelectedRowsInternal(next);
                      }
                      onSelectionChange?.(next);
                    }
                  }}
                />
              </th>

            {columns.map((column) => {
              const width = columnWidths[column.key] ?? column.width ?? defaultColumnWidth;
              const isSorting = currentSort?.key === column.key;
              const isSortable = column.sortable !== false;

              return (
                <th
                  key={column.key}
                  onClick={() => handleSort(column)}
                  className={`relative select-none border-r border-gray-300 px-4 py-3 group ${isSortable ? "cursor-pointer" : "cursor-default"}`}
                  style={{ width, minWidth: width }}
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="truncate">{column.title}</span>

                    {isSortable && (
                      <img
                        src={isSorting ? (currentSort?.direction === "asc" ? sortUpIcon : sortDownIcon) : sortUpIcon}
                        alt="sort"
                        className={`h-4 w-4 shrink-0 transition-opacity ${
                          isSorting ? "opacity-100" : "opacity-0 group-hover:opacity-60"
                        }`}
                      />
                    )}
                  </div>

                  <div className="absolute right-0 top-2 bottom-2 w-px bg-gray-300" />

                  {isSortable && (
                    <div
                      className="absolute right-0 top-0 h-full w-2 cursor-col-resize"
                      onMouseDown={(event) => {
                        event.stopPropagation();
                        setDragInfo({
                          columnKey: column.key,
                          startX: event.clientX,
                          startWidth: width,
                        });
                      }}
                    />
                  )}
                </th>
              );
            })}
          </tr>
        </thead>

        <tbody>
          {/* Error */}
          {isError && !isLoading && (
            <TableError colSpan={totalColSpan} />
          )}

          {/* Empty*/}
          {!isError && !isLoading && sortedData.length === 0 && (
            <TableEmpty colSpan={totalColSpan} />
          )}

          {!isError &&
            sortedData.map((row) => {
              const selected = currentSelectedRows.includes(row.id);
              return (
                <tr
                  key={row.id}
                  className={`h-12 border-b border-gray-200 transition-colors ${
                    selected ? "bg-blue-50" : "hover:bg-gray-100"
                  } ${onCellClick ? "cursor-pointer" : ""}`}
                  onClick={() => onCellClick?.(row.id)}
                >
                  <td 
                    className="border-r border-gray-200 px-2 text-center"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <input
                      type="checkbox"
                      checked={selected}
                      onChange={() => toggleRow(row.id)}
                    />
                  </td>

                  {columns.map((column) => {
                    const width = columnWidths[column.key] ?? column.width ?? defaultColumnWidth;

                    return (
                      <td
                        key={column.key}
                        className="px-4 py-3 align-middle"
                        style={{ width, maxWidth: width }}
                      >
                        <div className="overflow-hidden text-ellipsis whitespace-nowrap">
                          {column.render(row)}
                        </div>
                      </td>
                    );
                  })}
                </tr>
              );
            })}
        </tbody>
        </table>
      </div>
    </div>
  );
}