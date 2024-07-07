import React, { useState } from "react";
import {
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { useProveedor } from "../hooks/useProveedor";

// import { Select, MenuItem, InputLabel, FormControl } from "@mui/material";
// import { useCreateUser } from "../../auth/pages/hooks/useCreateUser";

interface Proveedor {
  name: string;
  user_rel: string;
  status: string;
}

interface ProviderModalProps {
  open: boolean;
  handleClose: () => void;
  proveedor?: Proveedor;
  onProveedorCreationFeedback?: (data: {}) => void;
}
const ProviderModal: React.FC<ProviderModalProps> = ({
  open,
  handleClose,
  proveedor,
  onProveedorCreationFeedback,
}) => {
  const { createProveedor } = useProveedor();
  const [name, setName] = useState(proveedor ? proveedor.name : "");
  const [role, setStatus] = useState(proveedor ? proveedor.status : "");

  // useEffect(() => {
  //   setName(user ? user.name : "");
  //   setLastName(user ? user.lastName : "");
  //   setEmail(user ? user.email : "");
  //   setRole(user ? user.role : "");
  //   setPassword("");
  // }, [user]);

  const handleSubmit = async () => {
    const proveedorData = {
      name,
      user_rel: localStorage.getItem("email"),
    };

    const response = await createProveedor(proveedorData);

    if (response && response.wasSuccessful) {
      const message = proveedor
        ? "Proveedor editado con éxito"
        : "Proveedor creado con éxito";
      onProveedorCreationFeedback &&
        onProveedorCreationFeedback({
          msg: message,
          type: "success",
        });
    } else {
      onProveedorCreationFeedback &&
        onProveedorCreationFeedback({
          msg: "Ocurrió un error, inténtelo de nuevo",
          type: "error",
        });
    }

    handleClose();
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Añadir Proveedor</DialogTitle>
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
      </DialogContent>
      <DialogActions>
        <Button
          style={{
            backgroundColor: "#d32f2f",
            color: "white",
            fontSize: "1.2em",
            width: "50%",
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
            width: "50%",
          }}
          onClick={handleSubmit}
        >
          {proveedor ? "Editar" : "Crear"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ProviderModal;
