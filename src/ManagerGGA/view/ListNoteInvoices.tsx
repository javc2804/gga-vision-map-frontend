import { useState } from "react";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  Box,
  Tooltip,
  IconButton,
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import PrintIcon from "@mui/icons-material/Print";
import WarningIcon from "@mui/icons-material/Warning";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { keyframes } from "@emotion/react";
import styled from "@emotion/styled";

const ListNoteInvoices = () => {
  const blink = keyframes`
  0% { opacity: 1; }
  50% { opacity: 0; }
  100% { opacity: 1; }
`;

  const BlinkingWarningIcon = styled(WarningIcon)`
    animation: ${blink} 1s step-end infinite;
    color: orange;
  `;
  const columns = [
    { id: "id", label: "ID", minWidth: 100 },
    { id: "facNDE", label: "facNDE", minWidth: 100 },
    { id: "state", label: "Estado", minWidth: 100 },
    { id: "createdAt", label: "Fecha", minWidth: 100 },
    { id: "acciones", label: "Acciones", minWidth: 100 },
  ];

  const rows = [
    {
      id: 1,
      facNDE: "NDE123",
      state: false,
      createdAt: "2023-04-01",
    },
    {
      id: 2,
      facNDE: "NDE124",
      state: true,
      createdAt: "2023-04-02",
    },
    {
      id: 3,
      facNDE: "NDE125",
      state: false,
      createdAt: "2023-04-03",
    },
  ];

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (event: any, newPage: any) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: any) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Paper sx={{ width: "100%", overflow: "hidden" }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  sx={{ minWidth: column.minWidth, fontWeight: "bold" }} // Aplicando fontWeight más fuerte
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => (
                <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                  {columns.map((column) => {
                    const value = row[column.id];
                    if (column.id === "state") {
                      return (
                        <TableCell key={column.id}>
                          {row.state ? (
                            <Box display="flex" alignItems="center">
                              Completado
                              <CheckCircleIcon sx={{ color: "green" }} />
                            </Box>
                          ) : (
                            <Box display="flex" alignItems="center">
                              Pendiente
                              <BlinkingWarningIcon />
                            </Box>
                          )}
                        </TableCell>
                      );
                    } else if (column.id === "acciones") {
                      // Aquí se maneja la columna de Acciones
                      return (
                        <TableCell key={column.id}>
                          <Box display="flex" gap={1}>
                            <Tooltip title="Ver">
                              <IconButton color="primary" aria-label="view">
                                <VisibilityIcon />
                              </IconButton>
                            </Tooltip>
                            <Tooltip title="Imprimir">
                              <IconButton color="primary" aria-label="print">
                                <PrintIcon />
                              </IconButton>
                            </Tooltip>
                          </Box>
                        </TableCell>
                      );
                    } else {
                      return <TableCell key={column.id}>{value}</TableCell>;
                    }
                  })}
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        labelRowsPerPage="Filas por página"
      />
    </Paper>
  );
};

export default ListNoteInvoices;
