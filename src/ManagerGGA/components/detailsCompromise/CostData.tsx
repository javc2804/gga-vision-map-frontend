import { Grid, TextField } from "@mui/material";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers";
import React, { useEffect, useMemo, useCallback } from "react";

interface InvoiceData {
  [key: string]: number | undefined; // Assuming all values are numbers or undefined
}

interface CostDataProps {
  compromise?: {
    precioUnitarioBs?: number;
    precioUnitarioUsd?: number;
  };
  invoice?: {
    quantity?: number;
  };
  onValuesChangeProp: (newValues: any) => void; // Adjust the type of newValues as needed
  invoiceData: any; // Specify a more precise type if possible
  showFields?: {
    modoPago?: boolean; // Assuming modoPago is a boolean, adjust as necessary
  };
}

const CostData = React.memo(
  ({
    compromise,
    invoice,
    onValuesChangeProp,
    invoiceData,
    showFields = { modoPago: true },
  }: CostDataProps) => {
    const { precioUnitarioBs, precioUnitarioUsd } = compromise || {};
    const { quantity } = invoice || {};

    const montoTotalBs = useMemo(() => {
      // Ensure compromise, invoice, precioUnitarioBs, and quantity are defined
      if (
        compromise &&
        invoice &&
        compromise.precioUnitarioBs !== undefined &&
        invoice.quantity !== undefined
      ) {
        return parseFloat(
          (compromise.precioUnitarioBs * invoice.quantity).toFixed(2)
        );
      } else {
        return 0;
      }
    }, [compromise, invoice]);

    const montoTotalUsd = useMemo(() => {
      if (
        compromise &&
        invoice &&
        compromise.precioUnitarioUsd !== undefined &&
        invoice.quantity !== undefined
      ) {
        return parseFloat(
          (compromise.precioUnitarioUsd * invoice.quantity).toFixed(2)
        );
      } else {
        return 0;
      }
    }, [compromise, invoice]);

    const onValuesChange = useCallback(
      (newValues: any) => {
        onValuesChangeProp(newValues);
      },
      [onValuesChangeProp]
    );

    useEffect(() => {
      if (showFields) {
        if (precioUnitarioUsd && quantity) {
          const newValues: InvoiceData = {
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
            (key) =>
              newValues[key as keyof typeof newValues] !==
              invoiceData[key as keyof typeof invoiceData]
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
