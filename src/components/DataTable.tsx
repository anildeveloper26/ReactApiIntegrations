import { ColumnDef, flexRender } from "@tanstack/react-table";
import { table } from "console";
import { columns } from "./Table/columns";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "./ui/table";
import { useQuery } from "@tanstack/react-query";
import GetApi from "@/lib/fetch";

export default function DataTable() {
  const { data, isSuccess } = useQuery({
    queryKey: ["TableData"],
    queryFn: GetApi,
    retry: false,
  });

  return (
    <div className="overflow-hidden rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            {columns.map((column) => (
              <TableHead key={column.id}>{column.header}</TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {data?.data?.length > 0 ? (
            data.data.map((item, index) => {
              return (
                <TableRow key={item.id}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>
                    {item?.document_users?.length > 0 ? (
                      <div>
                        {item.document_users.every(
                          (Dusers) => Dusers.document_completed === true
                        )
                          ? "Completed"
                          : "Not Completed"}
                      </div>
                    ) : (
                      <div>No Document</div>
                    )}
                  </TableCell>
                </TableRow>
              );
            })
          ) : (
            <TableRow>
              <TableCell colSpan={2}>No data available</TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
