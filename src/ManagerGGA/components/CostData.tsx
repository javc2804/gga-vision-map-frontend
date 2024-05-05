import React from "react";
import { TextField, Grid, Paper } from "@mui/material";

const CostData = ({ invoiceData, onValuesChange, style }) => {
  const handleInputChange = (field) => (event) => {
    const newValues = { ...invoiceData };
    newValues[field] = event.target.value;
    onValuesChange(newValues);
  };

  return (
    <Paper elevation={3} style={style}>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <TextField
            label="Precio Unitario Divisas"
            value={invoiceData.precioUnitarioDivisas || ""}
            onChange={handleInputChange("precioUnitarioDivisas")}
            fullWidth
          />
          <TextField
            label="Monto Total Pago Bolivares"
            value={invoiceData.montoTotalPagoBolivares || ""}
            onChange={handleInputChange("montoTotalPagoBolivares")}
            fullWidth
          />
          <TextField
            label="Monto Total Divisas Deuda"
            value={invoiceData.montoTotalDivisasDeuda || ""}
            onChange={handleInputChange("montoTotalDivisasDeuda")}
            fullWidth
          />
          <TextField
            label="Precio Unitario Divisas S"
            value={invoiceData.precioUnitarioDivisasS || ""}
            onChange={handleInputChange("precioUnitarioDivisasS")}
            fullWidth
          />
          <TextField
            label="Monto Total Pago Divisas"
            value={invoiceData.montoTotalPagoDivisas || ""}
            onChange={handleInputChange("montoTotalPagoDivisas")}
            fullWidth
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            label="Fecha Entrega"
            value={invoiceData.fechaEntrega || ""}
            onChange={handleInputChange("fechaEntrega")}
            fullWidth
          />
          <TextField
            label="Fecha Pago"
            value={invoiceData.fechaPago || ""}
            onChange={handleInputChange("fechaPago")}
            fullWidth
          />
          <TextField
            label="Orden Pago Numero"
            value={invoiceData.ordenPagoNumero || ""}
            onChange={handleInputChange("ordenPagoNumero")}
            fullWidth
          />
          <TextField
            label="Orden Compra Servicio"
            value={invoiceData.ordenCompraServicio || ""}
            onChange={handleInputChange("ordenCompraServicio")}
            fullWidth
          />
          <TextField
            label="Orden Compra Servicio Fecha"
            value={invoiceData.ordenCompraServicioFecha || ""}
            onChange={handleInputChange("ordenCompraServicioFecha")}
            fullWidth
          />
          <TextField
            label="Nota Entrega Numero"
            value={invoiceData.notaEntregaNumero || ""}
            onChange={handleInputChange("notaEntregaNumero")}
            fullWidth
          />
          <TextField
            label="Estatus"
            value={invoiceData.estatus || ""}
            onChange={handleInputChange("estatus")}
            fullWidth
          />
          <TextField
            label="Observacion"
            value={invoiceData.observacion || ""}
            onChange={handleInputChange("observacion")}
            fullWidth
          />
        </Grid>
      </Grid>
    </Paper>
  );
};

export default CostData;
