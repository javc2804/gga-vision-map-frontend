import { Button, TextField } from "@mui/material";

const CompromiseTotal = () => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-end",
      }}
    >
      <TextField
        label="Monto total deuda $"
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

export default CompromiseTotal;
