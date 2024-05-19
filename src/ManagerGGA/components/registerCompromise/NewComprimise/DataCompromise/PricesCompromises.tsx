import { TextField } from "@mui/material";

export const PricesCompromises = () => {
  return (
    <div>
      <TextField
        label="Descripción"
        variant="outlined"
        margin="normal"
        style={{ marginRight: "20px" }}
      />
      <TextField
        label="Cantidad"
        variant="outlined"
        margin="normal"
        type="number"
        style={{ marginRight: "20px" }}
      />
      <TextField
        label="Precio unitario en $ deuda"
        variant="outlined"
        margin="normal"
        type="number"
        style={{ marginRight: "20px" }}
      />
      <TextField
        label="Montotal en $ deuda"
        variant="outlined"
        margin="normal"
        type="number"
        style={{ marginRight: "20px" }}
      />
      <TextField
        label="OC/OS"
        variant="outlined"
        margin="normal"
        style={{ marginRight: "20px" }}
      />
      <TextField
        label="Fecha OC/OS"
        variant="outlined"
        margin="normal"
        type="date"
        InputLabelProps={{ shrink: true }}
        style={{ marginRight: "20px" }}
      />
      <TextField
        label="Nº de Orden de Pago"
        variant="outlined"
        margin="normal"
        style={{ marginRight: "20px" }}
      />
      <TextField
        label="Observación"
        variant="outlined"
        margin="normal"
        style={{ marginRight: "20px" }}
      />
    </div>
  );
};

export default PricesCompromises;
