import React, { useState } from "react";
import {
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";

interface UserModalProps {
  open: boolean;
  handleClose: () => void;
}

const UserModal: React.FC<UserModalProps> = ({ open, handleClose }) => {
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = () => {
    // Aquí puedes manejar la lógica de envío, como llamar a una API o despachar una acción de Redux
    console.log({ name, lastName, email, role, password });
    handleClose();
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Añadir usuario</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          label="Nombre"
          type="text"
          fullWidth
          variant="standard"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <TextField
          margin="dense"
          label="Apellido"
          type="text"
          fullWidth
          variant="standard"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
        <TextField
          margin="dense"
          label="Correo"
          type="email"
          fullWidth
          variant="standard"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          margin="dense"
          label="Rol"
          type="text"
          fullWidth
          variant="standard"
          value={role}
          onChange={(e) => setRole(e.target.value)}
        />
        <TextField
          margin="dense"
          label="Clave"
          type="password"
          fullWidth
          variant="standard"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button
          style={{
            backgroundColor: "#d32f2f",
            color: "white",
            fontSize: "1.2em",
            width: "30%",
          }}
          onClick={handleClose}
        >
          Cancelar
        </Button>
        <Button
          style={{
            backgroundColor: "#1976d2",
            color: "white",
            fontSize: "1.2em",
            width: "30%",
          }}
          onClick={handleSubmit}
        >
          Crear
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default UserModal;
