import React from "react";
import { Box, TextField, Button } from "@mui/material";
import { useSelector } from "react-redux";

interface InvoiceTotalsProps {
  totalFactUsd: number;
  setTotalFactUsd: (value: number) => void;
  handleSaveClick: () => void;
  setIsSaveButtonDisabled: any;
  isSaveButtonDisabled: any;
}

export const InvoiceTotalsCompromises: React.FC<InvoiceTotalsProps> = ({
  totalFactUsd,
  setTotalFactUsd,
  handleSaveClick,
  setIsSaveButtonDisabled,
  isSaveButtonDisabled,
}) => {
  const editPurchase = useSelector((state: any) => state.purchase.purchaseEdit);

  return (
    <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2, mr: 3.7 }}>
      {editPurchase && Object.keys(editPurchase).length === 0 && (
        <TextField
          label="Total deuda $"
          variant="outlined"
          sx={{ mr: 1 }}
          value={totalFactUsd ? totalFactUsd.toString() : ""}
          onChange={(e) => setTotalFactUsd(Number(e.target.value))}
        />
      )}

      <Button
        variant="contained"
        disabled={isSaveButtonDisabled}
        color="primary"
        onClick={handleSaveClick}
      >
        {editPurchase && Object.keys(editPurchase).length !== 0
          ? "Editar"
          : "Guardar"}
      </Button>
    </Box>
  );
};

export default InvoiceTotalsCompromises;
