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
  Box,
  IconButton,
} from "@mui/material";
import { useEffect } from "react";

import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import BlockIcon from "@mui/icons-material/Block";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import {
  startExportProviders,
  startGetProviders,
} from "../../store/providersOut/providersThunk";

export const Providers = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(startGetProviders());
  }, []);
  const providers = useSelector((state: any) => state.providers.list);

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

  const exportData = () => {
    dispatch(startExportProviders());
  };

  return (
    <Paper sx={{ width: "100%", overflow: "hidden" }}>
      <h1>Gestión de Proveedores</h1>
      <Box display="block" mb={2}>
        <Button
          variant="contained"
          color="primary"
          onClick={() => ({})}
          sx={{ mr: 1 }}
        >
          Crear Proveedor
        </Button>
        <Button variant="contained" color="secondary" onClick={exportData}>
          Exportar Proveedores
        </Button>
      </Box>
      <TableContainer sx={{ maxHeight: 440 }}>
        {" "}
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
                Creado por
              </TableCell>
              <TableCell sx={{ fontWeight: "bold", color: "black" }}>
                Estado
              </TableCell>
              <TableCell sx={{ fontWeight: "bold", color: "black" }}>
                Acciones
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {(Array.isArray(providers)
              ? providers.slice(
                  page * rowsPerPage,
                  page * rowsPerPage + rowsPerPage
                )
              : []
            ).map((provider, index) => (
              <TableRow key={provider.id}>
                <TableCell>
                  {new Date(provider.createdAt).toLocaleDateString("es-ES", {
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric",
                  })}
                </TableCell>
                <TableCell>{provider.name}</TableCell>
                <TableCell>{provider.user_rel}</TableCell>
                <TableCell>{provider.status ? "Activo" : "Inactivo"}</TableCell>
                <TableCell align="center">
                  <Box display="flex" justifyContent="start" alignItems="start">
                    <IconButton
                      onClick={() => {
                        /* función para editar */
                      }}
                      style={{ color: "#0079cc" }}
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      onClick={() => {
                        /* función para eliminar */
                      }}
                      style={{ color: "red" }}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Box>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={providers.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
};
export default Providers;
