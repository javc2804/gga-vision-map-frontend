import { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TablePagination,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { useDispatch, useSelector } from "react-redux";
import { startGetInventory } from "../../../store/inventory/inventoryThunk";

const TableInventory = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const dispatch = useDispatch();
  const result = useSelector((state: any) => state.inventory.list);
  const rows = result.response || [];
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  useEffect(() => {
    dispatch(startGetInventory());
  }, []);

  return (
    <Paper sx={{ width: "100%", overflow: "hidden" }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              <TableCell style={{ fontWeight: "bold" }}>Repuesto</TableCell>
              <TableCell style={{ fontWeight: "bold" }}>Entrada</TableCell>
              <TableCell style={{ fontWeight: "bold" }}>Salida</TableCell>
              <TableCell style={{ fontWeight: "bold" }}>Factura</TableCell>
              <TableCell style={{ fontWeight: "bold" }}>
                Stock Disponible
              </TableCell>
              {/* <TableCell style={{ fontWeight: "bold" }}>Descripcion</TableCell> */}
              {/* <TableCell style={{ fontWeight: "bold" }}>Acciones</TableCell> */}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row, index) => (
                <TableRow key={index}>
                  <TableCell>{row.descripcion}</TableCell>
                  <TableCell>{row.entrada}</TableCell>
                  <TableCell>{row.salida}</TableCell>
                  <TableCell>{row.factura}</TableCell>
                  <TableCell>{row.cantidad}</TableCell>
                  {/* <TableCell>{row.descripcion}</TableCell> */}
                  {/* <TableCell>
                    <DeleteIcon sx={{ color: "red" }} />
                    <EditIcon sx={{ marginLeft: 1, color: "orange" }} />
                  </TableCell>{" "} */}
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
};

export default TableInventory;
