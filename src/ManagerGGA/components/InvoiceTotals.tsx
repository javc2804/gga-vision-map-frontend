import React from "react";
import { Box, TextField, Button } from "@mui/material";

interface InvoiceTotalsProps {
  totalFactUsd: number;
  totalFactBs: number;
  setTotalFactUsd: (value: number) => void;
  setTotalFactBs: (value: number) => void;
  handleSaveClick: () => void;
}

const InvoiceTotals: React.FC<InvoiceTotalsProps> = ({
  totalFactUsd,
  totalFactBs,
  setTotalFactUsd,
  setTotalFactBs,
  handleSaveClick,
}) => (
  <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2, mr: 3.7 }}>
    <TextField
      label="Total factura $"
      variant="outlined"
      sx={{ mr: 1 }}
      value={totalFactUsd.toString()}
      onChange={(e) => setTotalFactUsd(Number(e.target.value))}
    />
    <TextField
      label="Total factura Bs"
      variant="outlined"
      sx={{ mr: 1 }}
      value={totalFactBs.toString()}
      onChange={(e) => setTotalFactBs(Number(e.target.value))}
    />
    <Button variant="contained" color="primary" onClick={handleSaveClick}>
      Guardar
    </Button>
  </Box>
);

export default InvoiceTotals;
