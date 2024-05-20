import { Button, TextField } from "@mui/material";

const TotalPayCompromise = () => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-end",
      }}
    >
      <div
        style={{ display: "flex", justifyContent: "flex-end", width: "100%" }}
      >
        <TextField
          label="Total factura Bs"
          variant="outlined"
          margin="normal"
          type="number"
        />
        <TextField
          label="Total factura $"
          variant="outlined"
          margin="normal"
          type="number"
          style={{ marginLeft: "10px" }} // Agrega un margen a la izquierda
        />
      </div>
      <TextField
        label="Deuda total $"
        variant="outlined"
        margin="normal"
        type="number"
      />

      <Button variant="contained" color="primary" style={{ marginTop: "10px" }}>
        Guardar
      </Button>
    </div>
  );
};

export default TotalPayCompromise;
