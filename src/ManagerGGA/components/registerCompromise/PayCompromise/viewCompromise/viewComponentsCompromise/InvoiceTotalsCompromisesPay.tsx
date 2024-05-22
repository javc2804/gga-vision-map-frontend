import React from "react";
import { Box, TextField, Button } from "@mui/material";

interface InvoiceTotalsProps {
  totalFactUsd: number;
  totalFactBs: number;
  compromise: any;
  setTotalFactUsd: (value: number) => void;
  setTotalFactBs: (value: number) => void;
  handleSaveClick: () => void;
}
export const InvoiceTotalsComrpomisesPay: React.FC<InvoiceTotalsProps> = ({
  totalFactUsd,
  totalFactBs,
  compromise,
  setTotalFactUsd,
  setTotalFactBs,
  handleSaveClick,
}) => {
  const totalDeuda =
    compromise && compromise.response ? compromise.response.montoTotalUsd : 0;

  return (
    <Box
      sx={{
        mt: 2,
        mr: 3.7,
        display: "flex",
        justifyContent: "flex-end",
        alignItems: "flex-start",
      }}
    >
      <Box sx={{ display: "flex", flexDirection: "column", mr: 1 }}>
        <TextField
          label="Total factura $"
          variant="outlined"
          sx={{ mb: 2 }}
          value={totalFactUsd.toString()}
          onChange={(e) => setTotalFactUsd(Number(e.target.value))}
        />
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          <TextField
            label="Total deuda $ "
            variant="outlined"
            value={(totalDeuda - totalFactUsd).toString()}
            onChange={(e) => setTotalFactBs(Number(e.target.value))}
          />
          <Button variant="contained" color="primary" onClick={handleSaveClick}>
            Guardar
          </Button>
        </Box>
      </Box>
      <TextField
        label="Total factura Bs"
        variant="outlined"
        sx={{ mr: 1 }}
        value={totalFactBs.toString()}
        onChange={(e) => setTotalFactBs(Number(e.target.value))}
      />
    </Box>
  );
};

export default InvoiceTotalsComrpomisesPay;
