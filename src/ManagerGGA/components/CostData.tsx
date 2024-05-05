import React from "react";
import { TextField, Grid, Paper } from "@mui/material";

const CostData = ({ invoiceData, onValuesChange, style }) => {
  const handleInputChange = (field) => (event) => {
    const newValues = { ...invoiceData };
    newValues[field] = event.target.value;
    onValuesChange(newValues);
  };

  return (
    <Paper elevation={3} style={style}>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <TextField
            label="Price BS"
            value={invoiceData.priceBS || ""}
            onChange={handleInputChange("priceBS")}
            fullWidth
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            label="Price USD"
            value={invoiceData.priceUSD || ""}
            onChange={handleInputChange("priceUSD")}
            fullWidth
          />
        </Grid>
      </Grid>
    </Paper>
  );
};

export default CostData;
