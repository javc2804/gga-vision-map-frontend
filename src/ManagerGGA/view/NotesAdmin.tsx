// NotesAdmin.tsx

import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import WarningIcon from "@mui/icons-material/Warning";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Box,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { fetchNoteInvoices } from "../../store/notes/noteInvoicesThunks"; // Import the fetchNoteInvoices action
import { RootState } from "../../store/store"; // Import the RootState type
import { keyframes } from "@emotion/react";
import VisibilityIcon from "@mui/icons-material/Visibility";
import styled from "@emotion/styled";
export const NotesAdmin = () => {
  const blink = keyframes`
  0% { opacity: 1; }
  50% { opacity: 0; }
  100% { opacity: 1; }
`;

  const BlinkingWarningIcon = styled(WarningIcon)`
    animation: ${blink} 1s step-end infinite;
    color: orange;
  `;
  const dispatch = useDispatch();
  const noteInvoices = useSelector(
    (state: RootState) => state.noteInvoices.noteInvoices
  ); // Get the noteInvoices from the state
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchNoteInvoices()); // Fetch the noteInvoices when the component mounts
  }, [dispatch]);

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell sx={{ color: "black", fontWeight: "bold" }}>
              Fac/NDE
            </TableCell>
            <TableCell sx={{ color: "black", fontWeight: "bold" }}>
              Fecha
            </TableCell>
            <TableCell sx={{ color: "black", fontWeight: "bold" }}>
              Estado
            </TableCell>
            <TableCell sx={{ color: "black", fontWeight: "bold" }}>
              Acción
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {noteInvoices.map((invoice, index) => (
            <TableRow key={index}>
              <TableCell>{invoice.note_number}</TableCell>
              <TableCell>
                {new Date(invoice.createdAt).toLocaleDateString()}
              </TableCell>
              <TableCell>
                {invoice.status ? (
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
              <TableCell>
                <IconButton
                  color="primary"
                  aria-label="view"
                  onClick={() =>
                    navigate("/notes-store", { state: { invoice } })
                  }
                >
                  <VisibilityIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default NotesAdmin;
