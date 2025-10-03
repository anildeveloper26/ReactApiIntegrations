import { useRouterState } from "@tanstack/react-router";
import {
    ColumnDef,
    ColumnFiltersState,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
} from "@tanstack/react-table";
import { useEffect, useRef, useState } from "react";
import { Loader, Loader2Icon } from "lucide-react";
import { Pagination } from "./Pagination";
type DataTableProps<TData, TValue> = {
  data: TData[];
  columns: ColumnDef<TData, TValue>[];
  paginationDetails?: {
    total_records: number;
    total_pages: number;
    current_page: number;
    page_size: number;
    next_page: number | null;
    prev_page: number | null;
  };
  setPage?: (page: number) => void;
  setPageSize?: (size: number) => void;
  removeSortingForColumnIds?: string[];
  showFilters?: boolean;
  isFetching?: boolean;
  isloading?: boolean;
  sort?: { column: string; direction: "asc" | "desc" } | null;
  setSort?: (
    sort: { column: string; direction: "asc" | "desc" } | null
  ) => void;
  meta?: {
    setDeleteModal?: (deleteModal: {
      open: boolean;
      trigger: TData | null;
    }) => void;
  };
  isFetchingNextPage?: boolean;
  fetchRef?: (node: any) => void;
};
export function DataTable<TData, TValue>({
  data,
  columns,
  paginationDetails,
  setPage,
  setPageSize,
  showFilters = false,
  removeSortingForColumnIds = [],
  isFetching = false,
  sort,
  meta,
  setSort,
  isFetchingNextPage = false,
  fetchRef,
  isloading
}: DataTableProps<TData, TValue>) {
  const router = useRouterState();
  const currentPath = router.location.pathname;
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const tableContainerRef = useRef<HTMLDivElement>(null);
  console.log(paginationDetails)
  const table = useReactTable({
    data: data || [],
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    ...(paginationDetails
      ? { getPaginationRowModel: getPaginationRowModel() }
      : {}),
    filterFns: {},
    state: {
      columnFilters,
      pagination: {
        pageIndex: paginationDetails ? paginationDetails.current_page - 1 : 0,
        pageSize: paginationDetails?.page_size || 25,
      },
      sorting: sort
        ? [{ id: sort.column, desc: sort.direction === "desc" }]
        : [],
    },
    onColumnFiltersChange: setColumnFilters,
    manualPagination: true,
    pageCount: paginationDetails?.total_pages || 1,
    autoResetPageIndex: false,
    meta,
  });
  useEffect(() => {
    if (sort) {
      table.setSorting([{ id: sort.column, desc: sort.direction === "desc" }]);
    } else {
      table.setSorting([]);
    }
  }, [sort, table]);
  
  return (
    <div className="w-full h-full">
      <div className="w-full h-full p-0 pt-0">
        <div ref={tableContainerRef} className="h-full overflow-y-auto ">
          {isFetching || isloading ? (
            <div className="flex items-center justify-center h-full">
              <Loader />
            </div>
          ) : data.length > 0 ? (
            <div className="h-full">
              <table className="w-full relative border-collapse [border-spacing:0]">
                <thead className="sticky top-0 z-10 -mt-px border-b  border-gray-300 bg-gray-100">
                  {table.getHeaderGroups().map((headerGroup) => (
                    <tr key={headerGroup.id}>
                      {headerGroup.headers.map((header) => {
                        const isSortingRemoved =
                          removeSortingForColumnIds.includes(header.column.id);
                        return (
                          <th
                            key={header.id}
                            colSpan={header.colSpan}
                            className={`font-(--an-card-table-columns-weight) sticky top-0 px-5 !py-2.75 text-lg-table 2xl:text-2xl-table 3xl:!text-3xl-table ${
                               currentPath.includes("/dashboard") ||
                              currentPath.startsWith("/contacts/addbulk/table1")
                                ? "bg-[#2D9596] text-white"
                                : "bg-gray-100 text-(--an-card-table-columns-color)"
                            }`}
                            //  currentPath.includes("/dashboard") ||
                            //   currentPath.includes("/contacts/addbulk")
                            //     ? "bg-[#2D9596] text-white"
                            //     : "bg-gray-100 text-[var(--an-card-table-columns-color)]"
                            // }`}
                          >
                            <div
                              className={
                                !isSortingRemoved && header.column.getCanSort()
                                  ? "cursor-pointer select-none flex items-center gap-2"
                                  : "flex items-center gap-2"
                              }
                              onClick={
                                !isSortingRemoved && !setSort
                                  ? header.column.getToggleSortingHandler()
                                  : undefined
                              }
                            >
                              {flexRender(
                                header.column.columnDef.header,
                                header.getContext()
                              )}
                              {!isSortingRemoved && (
                                <SortNorm
                                  className={`w-2.5 !h-2 ${
                                    currentPath.includes("/dashboard")
                                      ? "text-white"
                                      : ""
                                  }`}
                                  direction={
                                    sort?.column === header.column.id
                                      ? sort.direction
                                      : false
                                  }
                                  onSortChange={(newDirection) => {
                                    if (!setSort) return;
                                    setSort(
                                      newDirection
                                        ? {
                                            column: header.column.id,
                                            direction: newDirection,
                                          }
                                        : null
                                    );
                                  }}
                                />
                              )}
                            </div>
                            {header.column.getCanFilter() ? (
                              <div
                                className={`${
                                  showFilters ? "h-7" : "h-0"
                                } overflow-hidden transition-all duration-300 flex items-center`}
                              ></div>
                            ) : (
                              <div
                                className={`${
                                  showFilters ? "h-7" : "h-0"
                                } transition-all duration-300 flex items-center`}
                              />
                            )}
                          </th>
                        );
                      })}
                    </tr>
                  ))}
                </thead>
                <tbody className="border-separate border-spacing-y-0.5">
                  {table.getRowModel().rows.map((row, index) => (
                    <tr
                      key={row.id}
                      className={`group border-b border-gray-200 last:border-b-0 ${
                        index === 0 &&
                        index === table.getRowModel().rows.length - 1
                          ? "rounded-lg"
                          : index === 0
                            ? "rounded-t-lg"
                            : index === table.getRowModel().rows.length - 1
                              ? "rounded-b-lg"
                              : ""
                      } text-[var(--an-card-table-row2-color)] text-lg-t 2xl:text-xs 3xl:!text-sm ${
                        currentPath.includes("/contacts")
                          ? "hover:bg-gray-100 transition-colors"
                          : ""
                      }`}
                    >
                      {row.getVisibleCells().map((cell, cellIndex) => (
                        <td
                          key={cell.id}
                          className={`px-5 py-1 last:border-r-0 ${
                            index === 0 && cellIndex === 0
                              ? "rounded-tl-lg"
                              : ""
                          } ${
                            index === 0 &&
                            cellIndex === row.getVisibleCells().length - 1
                              ? "rounded-tr-lg"
                              : ""
                          } ${
                            index === table.getRowModel().rows.length - 1 &&
                            cellIndex === 0
                              ? "rounded-bl-lg"
                              : ""
                          } ${
                            index === table.getRowModel().rows.length - 1 &&
                            cellIndex === row.getVisibleCells().length - 1
                              ? "rounded-br-lg"
                              : ""
                          }`}
                        >
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
              {fetchRef && (
                <div ref={fetchRef} className="h-10 w-full">
                  {isFetchingNextPage && (
                    <div className="text-center py-4">
                      <Loader2Icon />
                    </div>
                  )}
                </div>
              )}
            </div>
          ) : (
            <div className="flex flex-col items-center  justify-center min-h-[32rem] text-gray-600">
              No data found
              {["/dashboard", "/campaigns"].includes(currentPath) ? (
                <p>No Campaigns Found</p>
              ) : ["/festivals", "/events", "/template", "/triggers"].includes(
                  currentPath
                ) ? (
                <p>
                  No{" "}
                  {currentPath.slice(1).charAt(0).toUpperCase() +
                    currentPath.slice(2)}{" "}
                  Found
                </p>
              ) : (
                <p>No Campaigns Recipients</p>
              )}
            </div>
          )}
        </div>
        
      </div>
    
      
    
      {paginationDetails && data.length > 0 && (
  <div className="bg-(--an-table-background) h-8 px-2 py-1 w-full rounded-b-lg ">
    <Pagination
      paginationDetails={paginationDetails}
      pageSize={paginationDetails.page_size}
      setPage={setPage}
      setPageSize={setPageSize}
    />
  </div>
)}
      
    </div>
  );
}
function SortNorm({
  direction,
  className = "",
  onSortChange,
}: {
  direction: "asc" | "desc" | false;
  className?: string;
  onSortChange: (direction: "asc" | "desc" | false) => void;
}) {
  const handleClick = (e: React.MouseEvent, newDirection: "asc" | "desc") => {
    e.stopPropagation();
    onSortChange(direction === newDirection ? false : newDirection);
  };
  return (
    <div
      className={`flex flex-col items-center gap-1 justify-center ${className}`}
    >
      <span onClick={(e) => handleClick(e, "asc")} className="cursor-pointer">
        &uarr;
      </span>
      <span
        onClick={(e) => handleClick(e, "desc")}
        className="cursor-pointer -mt-0.5"
      >
        &darr;
      </span>
    </div>
  );
}
