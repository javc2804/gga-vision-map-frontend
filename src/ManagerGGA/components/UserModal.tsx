import React, { useEffect, useState } from "react";
import {
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";

interface User {
  name: string;
  lastName: string;
  email: string;
  role: string;
  password: string;
}

interface UserModalProps {
  open: boolean;
  handleClose: () => void;
  user?: User; // Agrega esta línea
}
const UserModal: React.FC<UserModalProps> = ({ open, handleClose, user }) => {
  const [name, setName] = useState(user ? user.name : "");
  const [lastName, setLastName] = useState(user ? user.lastName : "");
  const [email, setEmail] = useState(user ? user.email : "");
  const [role, setRole] = useState(user ? user.role : "");
  const [password, setPassword] = useState(user ? user.password : "");

  useEffect(() => {
    setName(user ? user.name : "");
    setLastName(user ? user.lastName : "");
    setEmail(user ? user.email : "");
    setRole(user ? user.role : "");
    setPassword(user ? user.password : "");
  }, [user]);
  const handleSubmit = () => {
    if (user) {
      // Si user está definido, estamos editando un usuario existente
      console.log("Editando usuario", {
        name,
        lastName,
        email,
        role,
        password,
      });
      // Aquí puedes manejar la lógica de edición, como llamar a una API o despachar una acción de Redux
    } else {
      // Si user no está definido, estamos creando un nuevo usuario
      console.log("Creando usuario", { name, lastName, email, role, password });
      // Aquí puedes manejar la lógica de creación, como llamar a una API o despachar una acción de Redux
    }
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
