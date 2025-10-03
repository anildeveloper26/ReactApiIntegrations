import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { columns } from "./Table/columns";
import GetApi from "@/lib/fetch";
import { DataTable } from "./ReusableTable";

export default function DataTableContainer() {
  const [currentPage, setCurrentPage] = useState(1);

  const { data, isLoading } = useQuery({
    queryKey: ["TableData", currentPage],
    queryFn: () => GetApi(currentPage),
    retry: false,
  });
  if (isLoading) return <div>Loading...</div>;
  return (
    <DataTable
      data={data?.data || []}
      columns={columns}
    />
  );
}
