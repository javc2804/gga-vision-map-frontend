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
      <Paper elevation={3} style={style}>
        <Box>Costos/Otros datos</Box>
        <Grid container spacing={5}>
          <Grid item xs={4}>
            <TextField
              label="Precio Unitario Divisas"
              value={invoiceData.precioUnitarioDivisas || ""}
              onChange={handleInputChange("precioUnitarioDivisas")}
              fullWidth
              style={{ marginBottom: "20px" }}
            />
            <TextField
              label="Monto Total Pago Bolivares"
              value={invoiceData.montoTotalPagoBolivares || ""}
              onChange={handleInputChange("montoTotalPagoBolivares")}
              fullWidth
              style={{ marginBottom: "20px" }}
            />
            <TextField
              label="Monto Total Divisas Deuda"
              value={invoiceData.montoTotalDivisasDeuda || ""}
              onChange={handleInputChange("montoTotalDivisasDeuda")}
              fullWidth
              style={{ marginBottom: "20px" }}
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              label="Precio Unitario Divisas S"
              value={invoiceData.precioUnitarioDivisasS || ""}
              onChange={handleInputChange("precioUnitarioDivisasS")}
              fullWidth
              style={{ marginBottom: "20px" }}
            />
            <TextField
              label="Monto Total Pago Divisas"
              value={invoiceData.montoTotalPagoDivisas || ""}
              onChange={handleInputChange("montoTotalPagoDivisas")}
              fullWidth
              style={{ marginBottom: "20px" }}
            />
            <DatePicker
              label="Fecha Entrega"
              value={invoiceData.fechaEntrega || null}
              onChange={handleDateChange("fechaEntrega")}
              components={{
                textField: ({ inputRef, inputProps, InputProps }) => (
                  <TextField
                    {...inputProps}
                    InputProps={InputProps}
                    ref={inputRef}
                    fullWidth
                  />
                ),
              }}
              style={{ marginBottom: "20px" }}
            />
          </Grid>
          <Grid item xs={4}>
            <Box marginBottom={2}>
              <DatePicker
                label="Fecha Pago"
                value={invoiceData.fechaPago || null}
                onChange={handleDateChange("fechaPago")}
                components={{
                  textField: ({ inputRef, inputProps, InputProps }) => (
                    <TextField
                      {...inputProps}
                      InputProps={InputProps}
                      ref={inputRef}
                      fullWidth
                    />
                  ),
                }}
                style={{ marginBottom: "20px" }}
              />
            </Box>
            <TextField
              label="Orden Pago Numero"
              value={invoiceData.ordenPagoNumero || ""}
              onChange={handleInputChange("ordenPagoNumero")}
              fullWidth
              style={{ marginBottom: "20px" }}
            />
            <TextField
              label="Orden Compra Servicio"
              value={invoiceData.ordenCompraServicio || ""}
              onChange={handleInputChange("ordenCompraServicio")}
              fullWidth
              style={{ marginBottom: "20px" }}
            />
          </Grid>
          <Grid item xs={4}>
            <Box marginBottom={2}>
              <DatePicker
                label="Orden Compra Servicio Fecha"
                value={invoiceData.ordenCompraServicioFecha || null}
                onChange={handleDateChange("ordenCompraServicioFecha")}
                components={{
                  textField: ({ inputRef, inputProps, InputProps }) => (
                    <TextField
                      {...inputProps}
                      InputProps={InputProps}
                      ref={inputRef}
                      fullWidth
                    />
                  ),
                }}
                style={{ marginBottom: "20px" }}
              />
            </Box>
            <TextField
              label="Nota Entrega Numero"
              value={invoiceData.notaEntregaNumero || ""}
              onChange={handleInputChange("notaEntregaNumero")}
              fullWidth
              style={{ marginBottom: "20px" }}
            />
            <TextField
              label="Estatus"
              value={invoiceData.estatus || ""}
              onChange={handleInputChange("estatus")}
              fullWidth
              style={{ marginBottom: "20px" }}
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              label="Observación"
              value={invoiceData.observacion || ""}
              onChange={handleInputChange("observacion")}
              fullWidth
              multiline
              rows={4}
              style={{ marginBottom: "20px" }}
            />
          </Grid>
        </Grid>
      </Paper>
    </LocalizationProvider>
  );
};

export default CostData;
