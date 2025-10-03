import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import React from "react";

export interface DynamicPaginationProps {
  paginationDetails: {
    total_records: number;
    total_pages: number;
    current_page: number;
    page_size: number;
    next_page: number | null;
    prev_page: number | null;
  };
  pageSize?: number;
  setPage?: (page: number) => void;
  setPageSize?: (size: number) => void;
  total_records?: number;
}
export const Pagination = ({
  paginationDetails,
  pageSize,
  setPage,
  setPageSize,
  total_records,
}: DynamicPaginationProps) => {
  const getPageNumbers = () => {
    const currentPage = paginationDetails.current_page ?? 1;
    const totalPages = paginationDetails.total_pages ?? 1;
    const maxPagesToShow = 5;
    const pages: (number | string)[] = [];
    if (totalPages <= maxPagesToShow) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      const halfWindow = Math.floor(maxPagesToShow / 2);
      let startPage = Math.max(1, currentPage - halfWindow);
      let endPage = Math.min(totalPages, startPage + maxPagesToShow - 1);
      if (endPage - startPage < maxPagesToShow - 1) {
        startPage = Math.max(1, endPage - maxPagesToShow + 1);
      }
      if (startPage > 1) {
        pages.push(1);
        if (startPage > 2) pages.push("...");
      }
      for (let i = startPage; i <= endPage; i++) {
        pages.push(i);
      }
      if (endPage < totalPages) {
        if (endPage < totalPages - 1) pages.push("...");
        pages.push(totalPages);
      }
    }
    return pages;
  };
  const displayPageSize = pageSize ?? paginationDetails?.page_size ?? 20;
  const displayTotalRecords = total_records ?? paginationDetails.total_records; 
  return (
    <div className="flex items-center justify-between w-full">
      <div className="flex  items-center gap-3">
        <Select
          value={displayPageSize.toString()}
          onValueChange={(value) => {
            const newPageSize = Number(value);
            setPageSize?.(newPageSize);
            setPage?.(1);
          }}
        >
          <SelectTrigger className="ml-2.5  !pr-2 !h-7.75 text-lg-t 2xl:text-xs 3xl:!text-sm border border-gray-300 rounded cursor-pointer">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {[20, 50, 100, 150, 200].map((size) => (
              <SelectItem
                key={size}
                value={size.toString()}
                className="text-sm"
              >
                {size}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <span className=" text-xs 2xl:text-xs 3xl:!text-sm text-(--an-card-pagnization-number-color) font-(--an-card-pagnization-weight) ">
    Total:{displayTotalRecords}
        </span>
      </div>
      <div className="flex items-center gap-4">
        <button
          className="flex items-center justify-center hover:text-gray-700 disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
          onClick={() => {
            if (paginationDetails.current_page > 1) {
              setPage?.(paginationDetails.current_page - 1);
            }
          }}
          disabled={paginationDetails.current_page <= 1}
          aria-label="Previous page"
        >
          <div>
            &lt;
          </div>
        </button>
        {getPageNumbers().map((page, index) => (
          <React.Fragment key={index}>
            {typeof page === "number" ? (
              <button
                className={`flex items-center justify-center size-7 text-lg-t 2xl:text-xs 3xl:text-sm font-(--an-card-pagnization-weight) rounded cursor-pointer ${
                  paginationDetails.current_page === page
                    ? "bg-(--an-card-pagnization-color) text-(--an-card-pagnization-bg-color) font-bold"
                    : "hover:text-(--an-card-pagnization-number-color) text-(--an-card-pagnization-bg-color) font-(--an-card-pagnization-number-weight) hover:bg-gray-50"
                }`}
                onClick={() => {
                  setPage?.(page);
                }}
                aria-label={`Go to page ${page}`}
              >
                {page}
              </button>
            ) : (
              <span className="flex items-center justify-center w-8 h-8 text-sm text-gray-500">
                {page}
              </span>
            )}
          </React.Fragment>
        ))}
        <button
          className="flex items-center justify-center  hover:text-gray-700 disabled:opacity-20 disabled:cursor-not-allowed"
          onClick={() => {
            if (
              paginationDetails.current_page < paginationDetails.total_pages
            ) {
              setPage?.(paginationDetails.current_page + 1);
            }
          }}
          disabled={
            paginationDetails.current_page >= paginationDetails.total_pages
          }
          aria-label="Next page"
        >
          <div className=" mr-6">
            &gt;
          </div>
        </button>
      </div>
    </div>
  );
};