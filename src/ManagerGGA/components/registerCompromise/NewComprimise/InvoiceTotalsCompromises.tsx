import React from "react";
import { Box, TextField, Button } from "@mui/material";

interface InvoiceTotalsProps {
  totalFactUsd: number;
  setTotalFactUsd: (value: number) => void;
  handleSaveClick: () => void;
}

export const InvoiceTotalsCompromises: React.FC<InvoiceTotalsProps> = ({
  totalFactUsd,
  setTotalFactUsd,
  handleSaveClick,
}) => (
  <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2, mr: 3.7 }}>
    <TextField
      label="Total deuda $"
      variant="outlined"
      sx={{ mr: 1 }}
      value={totalFactUsd.toString()}
      onChange={(e) => setTotalFactUsd(Number(e.target.value))}
    />

    <Button variant="contained" color="primary" onClick={handleSaveClick}>
      Guardar
    </Button>
  </Box>
);

export default InvoiceTotalsCompromises;
