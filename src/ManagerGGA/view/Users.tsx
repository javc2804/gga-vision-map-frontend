import { useSelector } from "react-redux";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  Button,
  Tooltip,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import BlockIcon from "@mui/icons-material/Block";
import { useUser } from "../hooks/useUsers";

interface User {
  createdAt: string;
  name: string;
  lastName: string;
  email: string;
  role: string;
  status: boolean;
}

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Los meses en JavaScript empiezan en 0
  const year = date.getFullYear();

  return `${day}/${month}/${year}`;
};

export const Users = () => {
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
            {Array.isArray(users.list) &&
              users.list
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((user: User, index: number) => (
                  <TableRow key={index}>
                    <TableCell>{formatDate(user.createdAt)}</TableCell>
                    <TableCell>{`${user.name} ${user.lastName}`}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>{user.role}</TableCell>
                    <TableCell>
                      <Tooltip title="Eliminar">
                        <DeleteIcon
                          sx={{
                            marginLeft: 1,
                            color: "red",
                            cursor: "pointer",
                          }}
                        />
                      </Tooltip>
                      <Tooltip title="Editar">
                        <EditIcon
                          sx={{
                            marginLeft: 1,
                            color: "orange",
                            cursor: "pointer",
                          }}
                        />
                      </Tooltip>
                      {user.status ? (
                        <Tooltip title="Desactivar">
                          <CheckCircleIcon
                            sx={{
                              marginLeft: 1,
                              color: "green",
                              cursor: "pointer",
                            }}
                          />
                        </Tooltip>
                      ) : (
                        <Tooltip title="Activar">
                          <BlockIcon
                            sx={{
                              marginLeft: 1,
                              color: "grey",
                              cursor: "pointer",
                            }}
                          />
                        </Tooltip>
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
        count={users.list.length || 0}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
};

export default Users;
