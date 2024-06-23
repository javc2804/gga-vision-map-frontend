import * as React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TablePagination,
  Button,
} from "@mui/material";
import { useEffect } from "react";

import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import BlockIcon from "@mui/icons-material/Block";
import { useDispatch, useSelector } from "react-redux";
import { startGetOutInternal } from "../../../store/out-internal/outInternalThunk";

export const TableOutInternal = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(startGetOutInternal());
  }, []);
  const rows = useSelector((state: any) => state.outInternal.list.row);

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <Paper sx={{ width: "100%", overflow: "hidden" }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: "bold", color: "black" }}>
                Fecha Creación
              </TableCell>
              <TableCell sx={{ fontWeight: "bold", color: "black" }}>
                Proveedor/Beneficiario
              </TableCell>
              <TableCell sx={{ fontWeight: "bold", color: "black" }}>
                Beneficiario Gasto de Personal
              </TableCell>
              <TableCell sx={{ fontWeight: "bold", color: "black" }}>
                Gasto de Personal
              </TableCell>
              <TableCell sx={{ fontWeight: "bold", color: "black" }}>
                Monto Pagado Bolivares Gasto de Personal
              </TableCell>
              <TableCell sx={{ fontWeight: "bold", color: "black" }}>
                Monto Pagado $$ Gasto de Personal
              </TableCell>
              <TableCell sx={{ fontWeight: "bold", color: "black" }}>
                Fecha Factura
              </TableCell>
              <TableCell sx={{ fontWeight: "bold", color: "black" }}>
                Nº de Referencia
              </TableCell>
              <TableCell sx={{ fontWeight: "bold", color: "black" }}>
                Cuenta Bancaria
              </TableCell>
              <TableCell sx={{ fontWeight: "bold", color: "black" }}>
                Tasa Bcv
              </TableCell>
              <TableCell sx={{ fontWeight: "bold", color: "black" }}>
                Cuenta Bancaria
              </TableCell>
              <TableCell sx={{ fontWeight: "bold", color: "black" }}>
                Nº de Orden de Pago
              </TableCell>
              <TableCell sx={{ fontWeight: "bold", color: "black" }}>
                Acciones
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {Array.isArray(rows) &&
              rows
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => (
                  <TableRow key={index}>
                    <TableCell>
                      {new Date(row.createdAt).toLocaleDateString("es-ES")}
                    </TableCell>
                    <TableCell>{row.proveedor_beneficiario}</TableCell>
                    <TableCell>
                      {row.beneficiario_gasto_personal || "N/A"}
                    </TableCell>
                    <TableCell>{row.gasto_personal || "N/A"}</TableCell>
                    <TableCell>
                      {row.monto_pagado_bs_personal || "N/A"}
                    </TableCell>
                    <TableCell>
                      {row.monto_pagado_dolares_personal || "N/A"}
                    </TableCell>
                    <TableCell>
                      {new Date(row.fecha_factura).toLocaleDateString(
                        "es-ES"
                      ) || "N/A"}
                    </TableCell>
                    <TableCell>{row.num_referencia || "N/A"}</TableCell>
                    <TableCell>{row.cuenta_bancaria || "N/A"}</TableCell>
                    <TableCell>{row.cuenta_bancaria || "N/A"}</TableCell>
                    <TableCell>{row.tasa_bcv || "N/A"}</TableCell>
                    <TableCell>{row.num_orden_pago || "N/A"}</TableCell>
                    <TableCell>
                      <DeleteIcon sx={{ color: "red" }} />
                      <EditIcon sx={{ marginLeft: 1, color: "orange" }} />
                    </TableCell>
                  </TableRow>
                ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25, 100]}
        component="div"
        count={rows.length || 0}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
};
export default TableOutInternal;
