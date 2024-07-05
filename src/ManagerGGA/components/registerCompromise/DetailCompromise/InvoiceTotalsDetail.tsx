import React from "react";
import { Box, TextField, Button } from "@mui/material";

interface InvoiceTotalsProps {
  totalFactUsd: number;
  totalFactBs: number;
  handleSave: () => void;
  compromise: any;
  costData: any;
  invoice: any;
  showFields: boolean;
}

export const InvoiceTotalsDetail: React.FC<InvoiceTotalsProps> = ({
  // totalFactUsd,
  // totalFactBs,
  handleSave,
  compromise,
  // costData,
  invoice,
  showFields,
}) => {
  let sumQuantity = invoice.invoices.reduce(
    (sum: any, cost: any) => sum + cost.quantity,
    0
  );
  let totalQuantity =
    compromise && compromise.cantidad ? compromise.cantidad - sumQuantity : 0;

  // let sumTotal = invoice.invoices.reduce(
  //   (sum: any, cost: any) => sum + cost.montoTotalUsd,
  //   0
  // );

  const totalInvoiceAmount =
    compromise && invoice.invoices
      ? invoice.invoices.reduce((total: any, currentInvoice: any) => {
          return total + currentInvoice.quantity * compromise.precioUnitarioUsd;
        }, 0)
      : 0;

  const montoTotalUsd = compromise
    ? (compromise.montoTotalUsd - totalInvoiceAmount).toFixed(2)
    : 0;

  return (
    <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2, mr: 3.7 }}>
      <TextField
        label="Cantidad"
        variant="outlined"
        sx={{ mr: 1 }}
        value={totalQuantity}
      />
      <TextField
        label={showFields ? "Deuda" : "Por asignar"}
        variant="outlined"
        value={montoTotalUsd}
        sx={{ mr: 1 }}
      />
      <Button
        variant="contained"
        color="primary"
        onClick={handleSave}
        disabled={invoice.status === true}
      >
        Guardar
      </Button>
    </Box>
  );
};

export default InvoiceTotalsDetail;
