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

import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import BlockIcon from "@mui/icons-material/Block";

// Asegúrate de agregar un campo 'status' a tus datos
const rows = [
  {
    fechaCreacion: "2022-01-01",
    nombre: "Juan",
    correo: "juan@example.com",
    rol: "Admin",
    status: true,
  },
  {
    fechaCreacion: "2022-01-01",
    nombre: "Juan",
    correo: "juan@example.com",
    rol: "store",
    status: false,
  },
  // Más filas aquí...
];

export default function BasicTable() {
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
      <h1>Gestión de usuarios</h1>
      <Button variant="contained" color="primary" onClick={() => ({})}>
        Crear usuario
      </Button>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: "bold", color: "black" }}>
                Fecha Creación
              </TableCell>
              <TableCell sx={{ fontWeight: "bold", color: "black" }}>
                Nombre
              </TableCell>
              <TableCell sx={{ fontWeight: "bold", color: "black" }}>
                Correo
              </TableCell>
              <TableCell sx={{ fontWeight: "bold", color: "black" }}>
                Rol
              </TableCell>
              <TableCell sx={{ fontWeight: "bold", color: "black" }}>
                Acciones
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row, index) => (
                <TableRow key={index}>
                  <TableCell>{row.fechaCreacion}</TableCell>
                  <TableCell>{row.nombre}</TableCell>
                  <TableCell>{row.correo}</TableCell>
                  <TableCell>{row.rol}</TableCell>
                  <TableCell>
                    <DeleteIcon sx={{ marginLeft: 1, color: "red" }} />
                    <EditIcon sx={{ marginLeft: 1, color: "orange" }} />
                    {row.status ? (
                      <CheckCircleIcon sx={{ marginLeft: 1, color: "green" }} />
                    ) : (
                      <BlockIcon sx={{ marginLeft: 1, color: "grey" }} />
                    )}
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}
