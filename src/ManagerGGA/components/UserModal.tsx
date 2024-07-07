import React, { useEffect, useState } from "react";
import {
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";

import { Select, MenuItem, InputLabel, FormControl } from "@mui/material";
import { useCreateUser } from "../../auth/pages/hooks/useCreateUser";

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
  user?: User;
  onUserCreationFeedback?: (data: {}) => void; // Añadir esta línea
}
const UserModal: React.FC<UserModalProps> = ({
  open,
  handleClose,
  user,
  onUserCreationFeedback,
}) => {
  const createUser = useCreateUser();
  console.log(user);
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

  const handleSubmit = async () => {
    if (user) {
      console.log("Editando usuario", {
        name,
        lastName,
        email,
        role,
        password,
      });
    } else {
      const response = await createUser({
        email,
        password,
        name,
        lastName,
        role,
      });

      if (response && response.wasSuccessful) {
        onUserCreationFeedback &&
          onUserCreationFeedback({
            msg: "Usuario creado con éxito",
            type: "success",
          });
      } else {
        onUserCreationFeedback &&
          onUserCreationFeedback({
            msg: "Ocurrió un error, inténtelo de nuevo",
            type: "error",
          });
      }
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
        <FormControl
          fullWidth
          margin="dense"
          variant="standard"
          style={{ width: "50%" }}
        >
          <InputLabel id="role-select-label">Rol</InputLabel>
          <Select
            labelId="role-select-label"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            label="Rol"
          >
            <MenuItem value="admin">Admin</MenuItem>
            <MenuItem value="almacenista">Almacenista</MenuItem>
          </Select>
        </FormControl>
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
          {user ? "Editar" : "Crear"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default UserModal;
