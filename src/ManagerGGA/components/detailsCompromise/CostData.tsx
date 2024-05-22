import React from "react";
import { Box, Grid, Paper, TextField } from "@mui/material";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";

export const CostData = ({ invoiceData, onValuesChange, style }) => {
  const handleInputChange = (field) => (event) => {
    const newValues = { ...invoiceData };
    if (field === "observacion" || field === "estatus") {
      newValues[field] = event.target.value;
    } else if (!isNaN(event.target.value)) {
      newValues[field] = event.target.value;
    }
    onValuesChange(newValues);
  };

  const handleDateChange = (field) => (newValue) => {
    const newValues = { ...invoiceData };
    if (!isNaN(newValue)) {
      newValues[field] = newValue;
      onValuesChange(newValues);
    }
  };
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Grid container spacing={1}>
        <Grid item xs={3}>
          <TextField
            label="Precio Unitario Bs"
            value={invoiceData.precioUnitarioDivisas || ""}
            onChange={handleInputChange("precioUnitarioDivisas")}
            fullWidth
            style={{ marginBottom: "20px" }}
          />
        </Grid>
        <Grid item xs={3}>
          <TextField
            label="Monto Total Bs"
            value={invoiceData.montoTotalPagoBolivares || ""}
            onChange={handleInputChange("montoTotalPagoBolivares")}
            fullWidth
            style={{ marginBottom: "20px" }}
          />
        </Grid>
        <Grid item xs={3}>
          <TextField
            label="Precio Unitario $"
            value={invoiceData.precioUnitarioDivisasS || ""}
            onChange={handleInputChange("precioUnitarioDivisasS")}
            fullWidth
            style={{ marginBottom: "20px" }}
          />
        </Grid>
        <Grid item xs={3}>
          <TextField
            label="Monto Total $"
            value={invoiceData.montoTotalDivisasDeuda || ""}
            onChange={handleInputChange("montoTotalDivisasDeuda")}
            fullWidth
            style={{ marginBottom: "20px" }}
          />
        </Grid>
      </Grid>
    </LocalizationProvider>
  );
};

export default CostData;
