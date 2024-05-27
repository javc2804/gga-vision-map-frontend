import { Grid, TextField } from "@mui/material";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers";
import React, { useEffect, useMemo, useCallback } from "react";

const CostData = React.memo(
  ({
    compromise,
    invoice,
    onValuesChangeProp,
    invoiceData,
    showFields = { modoPago },
  }) => {
    const { precioUnitarioBs, precioUnitarioUsd } = compromise || {};
    const { quantity } = invoice || {};

    const montoTotalBs = useMemo(() => {
      return compromise && invoice
        ? parseFloat(
            (compromise.precioUnitarioBs * invoice.quantity).toFixed(2)
          )
        : 0;
    }, [compromise, invoice]);

    const montoTotalUsd = useMemo(() => {
      return compromise && invoice
        ? parseFloat(
            (compromise.precioUnitarioUsd * invoice.quantity).toFixed(2)
          )
        : 0;
    }, [compromise, invoice]);

    const onValuesChange = useCallback(
      (newValues) => {
        onValuesChangeProp(newValues);
      },
      [onValuesChangeProp]
    );

    useEffect(() => {
      if (showFields) {
        if (precioUnitarioUsd && quantity) {
          const newValues = {
            precioUnitarioUsd,
            montoTotalUsd,
          };

          const valuesChanged = Object.keys(newValues).some(
            (key) => newValues[key] !== invoiceData[key]
          );

          if (valuesChanged) {
            onValuesChange({ ...invoiceData, ...newValues });
          }
        }
      } else {
        if (precioUnitarioBs && precioUnitarioUsd && quantity) {
          const newValues = {
            precioUnitarioBs,
            montoTotalBs,
            precioUnitarioUsd,
            montoTotalUsd,
          };

          const valuesChanged = Object.keys(newValues).some(
            (key) => newValues[key] !== invoiceData[key]
          );

          if (valuesChanged) {
            onValuesChange({ ...invoiceData, ...newValues });
          }
        }
      }
    }, [
      precioUnitarioBs,
      precioUnitarioUsd,
      quantity,
      montoTotalBs,
      montoTotalUsd,
      onValuesChange,
      invoiceData,
      showFields,
    ]);

    return (
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <Grid container spacing={1} sx={{ p: 3 }}>
          {!showFields && (
            <>
              <Grid item xs={3}>
                <TextField
                  label="Precio Unitario Bs"
                  value={compromise ? compromise.precioUnitarioBs : ""}
                  fullWidth
                  style={{ marginBottom: "20px" }}
                  disabled
                />
              </Grid>
              <Grid item xs={3}>
                <TextField
                  label="Monto Total Bs"
                  value={montoTotalBs || ""}
                  fullWidth
                  style={{ marginBottom: "20px" }}
                  disabled
                />
              </Grid>
            </>
          )}
          <Grid item xs={3}>
            <TextField
              label="Precio Unitario $"
              value={compromise ? compromise.precioUnitarioUsd : ""}
              fullWidth
              style={{ marginBottom: "20px" }}
              disabled
            />
          </Grid>
          <Grid item xs={3}>
            <TextField
              label="Monto Total $"
              value={montoTotalUsd || ""}
              fullWidth
              style={{ marginBottom: "20px" }}
              disabled
            />
          </Grid>
        </Grid>
      </LocalizationProvider>
    );
  }
);

export default CostData;
