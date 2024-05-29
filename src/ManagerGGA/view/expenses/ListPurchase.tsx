import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TableSortLabel,
  IconButton,
  Tooltip,
  TablePagination,
} from "@mui/material";
import { useState, useMemo } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

interface IRow {
  ID: number;
  Fecha: string;
  UT: string;
  Eje: string;
  "Sub-eje": string;
  "NDE(a)": string;
  FacProv: string;
  Proveedor: string;
  Compromiso: string;
  Repuesto: string;
  Cantidad: number;
  "Total Bs": number;
  "Total $": number;
  "Deuda $": number;
  [key: string]: string | number;
}

type TableRowDataProps = {
  row: IRow;
  headers: string[];
};

const ActionButtons = () => (
  <>
    <Tooltip title="Editar">
      <IconButton>
        <EditIcon />
      </IconButton>
    </Tooltip>
    <Tooltip title="Eliminar">
      <IconButton>
        <DeleteIcon />
      </IconButton>
    </Tooltip>
  </>
);

type SortableTableHeaderProps = {
  header: string;
  orderBy: string;
  order: "asc" | "desc";
  onSortRequest: (header: string) => void;
};

const SortableTableHeader: React.FC<SortableTableHeaderProps> = ({
  header,
  orderBy,
  order,
  onSortRequest,
}) => (
  <TableCell key={header}>
    <TableSortLabel
      active={orderBy === header}
      direction={orderBy === header ? order : "asc"}
      onClick={() => onSortRequest(header)}
      style={{ color: "black", fontWeight: "bold" }}
    >
      {header}
    </TableSortLabel>
  </TableCell>
);

const TableRowData: React.FC<TableRowDataProps> = ({ row, headers }) => (
  <TableRow key={row.ID}>
    {headers.map((header) =>
      header !== "Acciones" ? (
        <TableCell>{row[header]}</TableCell>
      ) : (
        <TableCell>
          <ActionButtons />
        </TableCell>
      )
    )}
  </TableRow>
);

export const ListPurchase = () => {
  const headers = [
    "ID",
    "Fecha",
    "UT",
    "Eje",
    "Sub-eje",
    "NDE(a)",
    "FacProv",
    "Proveedor",
    "Compromiso",
    "Repuesto",
    "Cantidad",
    "Total Bs",
    "Total $",
    "Deuda $",
    "Acciones",
  ];

  const [order, setOrder] = useState<"asc" | "desc">("asc");
  const [orderBy, setOrderBy] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [data, setData] = useState([
    {
      ID: 1,
      Fecha: "2022-01-01",
      UT: "UT1",
      Eje: "Eje1",
      "Sub-eje": "Sub-eje1",
      "NDE(a)": "NDE1",
      FacProv: "FacProv1",
      Proveedor: "Proveedor1",
      Compromiso: "Compromiso1",
      Repuesto: "Repuesto1",
      Cantidad: 10,
      "Total Bs": 100,
      "Total $": 50,
      "Deuda $": 25,
    },
    {
      ID: 2,
      Fecha: "2022-02-01",
      UT: "UT2",
      Eje: "Eje2",
      "Sub-eje": "Sub-eje2",
      "NDE(a)": "NDE2",
      FacProv: "FacProv2",
      Proveedor: "Proveedor2",
      Compromiso: "Compromiso2",
      Repuesto: "Repuesto2",
      Cantidad: 20,
      "Total Bs": 200,
      "Total $": 100,
      "Deuda $": 50,
    },
    {
      ID: 3,
      Fecha: "2022-03-01",
      UT: "UT3",
      Eje: "Eje3",
      "Sub-eje": "Sub-eje3",
      "NDE(a)": "NDE3",
      FacProv: "FacProv3",
      Proveedor: "Proveedor3",
      Compromiso: "Compromiso3",
      Repuesto: "Repuesto3",
      Cantidad: 30,
      "Total Bs": 300,
      "Total $": 150,
      "Deuda $": 75,
    },
  ]);

  const handleSortRequest = (property: string) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const sortedData = useMemo(() => {
    return [...data].sort((a: IRow, b: IRow) => {
      if (a[orderBy] < b[orderBy]) {
        return order === "asc" ? -1 : 1;
      }
      if (a[orderBy] > b[orderBy]) {
        return order === "asc" ? 1 : -1;
      }
      return 0;
    });
  }, [data, orderBy, order]);

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            {headers.map((header) => (
              <SortableTableHeader
                header={header}
                orderBy={orderBy}
                order={order}
                onSortRequest={handleSortRequest}
              />
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {sortedData
            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map((row) => (
              <TableRowData row={row} headers={headers} />
            ))}
        </TableBody>
      </Table>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={data.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </TableContainer>
  );
};

export default ListPurchase;
