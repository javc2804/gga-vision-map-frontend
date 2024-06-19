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

import { useUser } from "../hooks/useUsers";
import { useSelector } from "react-redux";

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
];

export const Users = () => {
  const formatDate = (dateString: any) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Los meses en JavaScript empiezan en 0
    const year = date.getFullYear();

    return `${day}/${month}/${year}`;
  };

  const users = useSelector((state: any) => state.users);

  const { page, rowsPerPage, handleChangePage, handleChangeRowsPerPage } =
    useUser();

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
                Nombre y apellido
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
            {users.list
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((user, index) => (
                <TableRow key={index}>
                  <TableCell>{formatDate(user.createdAt)}</TableCell>
                  <TableCell>{`${user.name} ${user.lastName}`}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.role}</TableCell>
                  <TableCell>
                    <DeleteIcon sx={{ marginLeft: 1, color: "red" }} />
                    <EditIcon sx={{ marginLeft: 1, color: "orange" }} />
                    {user.status ? (
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
        count={users.list.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
};

export default Users;
