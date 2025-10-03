import { createColumnHelper, type ColumnDef } from "@tanstack/react-table";

// Define the data types
type DocumentUser = {
  document_completed: boolean;
};

export type TableItem = {
  id: string;
  document_users: DocumentUser[];
};

const columnHelper = createColumnHelper<TableItem>();

export const columns: ColumnDef<TableItem>[] = [
  // Column 1: Row number (Display Column)
  columnHelper.display({
    id: "row_number",
    header: "No.",
    cell: (props) => props.row.index + 1,
  }),

  // Column 2: Document Status (Display Column)
  columnHelper.display({
    id: "document_status",
    header: "Document Status",
    cell: (props) => {
      const item = props.row.original;
      const documentUsers = item?.document_users;

      if (documentUsers?.length > 0) {
        const isCompleted = documentUsers.every(
          (Dusers) => Dusers.document_completed === true
        );
        return <div>{isCompleted ? "Completed" : "Not Completed"}</div>;
      }

      return <div>No Document</div>;
    },
  }),
];
