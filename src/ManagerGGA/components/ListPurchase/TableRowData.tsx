import { TableRow, TableCell } from "@mui/material";
import { IRow } from "../../view/expenses/ListPurchase";
import { ActionButtons } from "./AcctionButtons";

type TableRowDataProps = {
  row: IRow;
  headers: string[];
};
const columnToDataKeyMap: { [key: string]: string } = {
  Acciones: "acciones",
  // Add more mappings as needed
};
export const TableRowData: React.FC<TableRowDataProps> = ({ row, headers }) => (
  <TableRow key={row.ID}>
    {headers.map((header, index) => {
      const dataKey = columnToDataKeyMap[header] || header;
      return dataKey !== "Acciones" ? (
        <TableCell key={`${row.ID}-${index}`}>{row[dataKey]}</TableCell>
      ) : (
        <TableCell key={`${row.ID}-actions`}>
          <ActionButtons />
        </TableCell>
      );
    })}
  </TableRow>
);
