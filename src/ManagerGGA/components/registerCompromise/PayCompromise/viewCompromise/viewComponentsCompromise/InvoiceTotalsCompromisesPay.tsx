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
    <>
      <TextField
        label="Total factura $"
        variant="outlined"
        value={totalFactUsd.toString()}
        onChange={(e) => setTotalFactUsd(Number(e.target.value))}
      />
      <TextField
        label="Total deuda $ "
        variant="outlined"
        value={(totalDeuda - totalFactUsd).toString()}
        onChange={(e) => setTotalFactBs(Number(e.target.value))}
      />
      <Button variant="contained" color="primary" onClick={handleSaveClick}>
        Guardar
      </Button>
      <TextField
        label="Total factura Bs"
        variant="outlined"
        value={totalFactBs.toString()}
        onChange={(e) => setTotalFactBs(Number(e.target.value))}
      />
    </>
  );
};

export default InvoiceTotalsComrpomisesPay;
