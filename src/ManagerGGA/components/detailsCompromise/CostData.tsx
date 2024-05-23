import { Grid, TextField } from "@mui/material";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { useEffect } from "react";

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
    newValues[field] = event.target.value;
    onValuesChange(newValues);
  };

  useEffect(() => {
    if (compromise && invoice) {
      const newValues = { ...invoiceData };
      newValues["precioUnitarioBs"] = compromise.precioUnitarioBs;
      newValues["montoTotalBs"] = parseFloat(
        (compromise.precioUnitarioBs * invoice.quantity).toFixed(2)
      );
      newValues["precioUnitarioUsd"] = compromise.precioUnitarioUsd;
      newValues["montoTotalUsd"] = parseFloat(
        (compromise.precioUnitarioUsd * invoice.quantity).toFixed(2)
      );
      onValuesChange(newValues); // Esto llamará a handleCostDataChange en el componente padre
    }
  }, [compromise, invoice, onValuesChange]); // Asegúrate de incluir onValuesChange en la lista de dependencias

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
