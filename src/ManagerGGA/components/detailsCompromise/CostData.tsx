import { Grid, TextField } from "@mui/material";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers";

export const CostData = ({
  compromise,
  invoiceData,
  invoice,
  onValuesChange,
  style,
}) => {
  const montoTotalBs =
    compromise && invoice
      ? (compromise.precioUnitarioBs * invoice.quantity).toFixed(2)
      : 0;
  const montoTotalUsd =
    compromise && invoice
      ? (compromise.precioUnitarioUsd * invoice.quantity).toFixed(2)
      : 0;

  const handleInputChange = (field) => (event) => {
    const newValues = { ...invoiceData };
    if (field === "observacion" || field === "estatus") {
      newValues[field] = event.target.value;
    } else if (!isNaN(event.target.value)) {
      newValues[field] = event.target.value;
    }
    onValuesChange(newValues);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Grid container spacing={1}>
        <Grid item xs={3}>
          <TextField
            label="Precio Unitario Bs"
            value={compromise ? compromise.precioUnitarioBs : ""}
            onChange={handleInputChange("precioUnitarioBs")}
            fullWidth
            style={{ marginBottom: "20px" }}
            disabled
          />
        </Grid>
        <Grid item xs={3}>
          <TextField
            label="Monto Total Bs"
            value={montoTotalBs || ""}
            onChange={handleInputChange("montoTotalBs")}
            fullWidth
            style={{ marginBottom: "20px" }}
            disabled
          />
        </Grid>
        <Grid item xs={3}>
          <TextField
            label="Precio Unitario $"
            value={compromise ? compromise.precioUnitarioUsd : ""}
            onChange={handleInputChange("precioUnitarioUsd")}
            fullWidth
            style={{ marginBottom: "20px" }}
            disabled
          />
        </Grid>
        <Grid item xs={3}>
          <TextField
            label="Monto Total $"
            value={montoTotalUsd || ""}
            onChange={handleInputChange("montoTotalUsd")}
            fullWidth
            style={{ marginBottom: "20px" }}
            disabled
          />
        </Grid>
      </Grid>
    </LocalizationProvider>
  );
};

export default CostData;
