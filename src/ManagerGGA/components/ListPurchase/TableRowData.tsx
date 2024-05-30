import { TableRow, TableCell } from "@mui/material";
import { IRow } from "../../view/expenses/ListPurchase";
import { ActionButtons } from "./AcctionButtons";

type TableRowDataProps = {
  row: IRow;
  headers: string[];
};
export const TableRowData: React.FC<TableRowDataProps> = ({ row, headers }) => (
  <TableRow key={row.ID}>
    {headers.map((header, index) =>
      header !== "Acciones" ? (
        <TableCell key={`${row.ID}-${index}`}>{row[header]}</TableCell>
      ) : (
        <TableCell key={`${row.ID}-actions`}>
          <ActionButtons />
        </TableCell>
      )
    )}
  </TableRow>
);
