import React from "react";
import { Box, TextField, Button } from "@mui/material";

interface InvoiceTotalsProps {
  totalFactUsd: number;
  totalFactBs: number;
  handleSave: () => void;
  compromise: any;
  costData: any;
  invoice: any;
}

export const InvoiceTotalsDetail: React.FC<InvoiceTotalsProps> = ({
  totalFactUsd,
  totalFactBs,
  handleSave,
  compromise,
  costData,
  invoice,
}) => {
  let sumCosts = costData.reduce(
    (sum: any, cost: any) =>
      sum +
      (cost.montoTotalDivisasDeuda &&
      !Number.isNaN(Number(cost.montoTotalDivisasDeuda))
        ? parseFloat(cost.montoTotalDivisasDeuda)
        : 0),
    0
  );
  let montoTotalUsd =
    compromise &&
    compromise.montoTotalUsd &&
    !Number.isNaN(Number(compromise.montoTotalUsd))
      ? parseFloat(compromise.montoTotalUsd) - sumCosts
      : 0;
  let sumQuantity = invoice.invoices.reduce(
    (sum: any, cost: any) => sum + cost.quantity,
    0
  );
  console.log(montoTotalUsd);
  let totalQuantity =
    compromise && compromise.cantidad ? compromise.cantidad - sumQuantity : 0;
  return (
    <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2, mr: 3.7 }}>
      <TextField
        label="Cantidad"
        variant="outlined"
        sx={{ mr: 1 }}
        value={totalQuantity}
      />
      <TextField
        label="Por asignar"
        variant="outlined"
        sx={{ mr: 1 }}
        value={montoTotalUsd}
      />
      <Button variant="contained" color="primary" onClick={handleSave}>
        Guardar
      </Button>
    </Box>
  );
};

export default InvoiceTotalsDetail;
