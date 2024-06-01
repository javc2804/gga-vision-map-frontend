import React from "react";
import { Box, TextField, Button, Grid } from "@mui/material";

interface InvoiceTotalsProps {
  totalFactUsd: number;
  totalFactBs: number;
  compromise: any;
  setTotalFactUsd: (value: number) => void;
  setTotalFactBs: (value: number) => void;
  handleSaveClick: () => void;
}
export const InvoiceTotalsCompromisesPay: React.FC<InvoiceTotalsProps> = ({
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
    <Grid
      container
      direction="row"
      justifyContent="flex-end"
      alignItems="flex-end"
      spacing={2}
    >
      <Grid item>
        <Grid container direction="column">
          <Grid item>
            <TextField
              label="Total factura $"
              variant="outlined"
              value={totalFactUsd.toString()}
              onChange={(e) => setTotalFactUsd(Number(e.target.value))}
            />
          </Grid>
          <Grid item style={{ marginTop: "20px" }}>
            <TextField
              label="Total deuda $ "
              variant="outlined"
              value={(totalDeuda - totalFactUsd).toString()}
              onChange={(e) => setTotalFactBs(Number(e.target.value))}
            />
          </Grid>
        </Grid>
      </Grid>
      <Grid item>
        <Grid container direction="column">
          <Grid item>
            <TextField
              label="Total factura Bs"
              variant="outlined"
              value={totalFactBs.toString()}
              onChange={(e) => setTotalFactBs(Number(e.target.value))}
            />
          </Grid>
          <Grid item style={{ marginTop: "20px" }}>
            <TextField
              label="Cantidad Deuda"
              variant="outlined"
              // Asegúrate de agregar el estado y el manejador de eventos para este campo
            />
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12} container justifyContent="flex-end">
        <Button variant="contained" color="primary" onClick={handleSaveClick}>
          Guardar
        </Button>
      </Grid>
    </Grid>
  );
};

export default InvoiceTotalsCompromisesPay;
