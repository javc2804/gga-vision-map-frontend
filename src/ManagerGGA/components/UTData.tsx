import React, { useEffect } from "react";
import { TextField, Box, Grid, Paper } from "@mui/material";

const UTData = ({
  note_number,
  delivered_by,
  quantity,
  observation,
  spare_part,
  spare_part_variant,
  provider,
  ut,
  style,
}) => {
  useEffect(() => {
    console.log(
      note_number,
      delivered_by,
      quantity,
      observation,
      spare_part,
      spare_part_variant,
      provider,
      ut
    );
  }, []); // Pasar un array vacío como segundo argumento asegura que el efecto se ejecute sólo una vez

  return (
    <Paper elevation={3} style={style}>
      <Grid container spacing={2}>
        <Grid item xs={4}>
          <Box mt={2} mb={2}>
            <TextField
              label="Note Number"
              value={note_number}
              disabled
              fullWidth
            />
          </Box>
          <Box mb={2}>
            <TextField
              label="Delivered By"
              value={delivered_by}
              disabled
              fullWidth
            />
          </Box>
          <Box mb={2}>
            <TextField label="Quantity" value={quantity} disabled fullWidth />
          </Box>
        </Grid>
        <Grid item xs={4}>
          <Box mt={2} mb={2}>
            <TextField
              label="Observation"
              value={observation}
              disabled
              fullWidth
            />
          </Box>
          <Box mb={2}>
            <TextField
              label="Spare Part"
              value={spare_part}
              disabled
              fullWidth
            />
          </Box>
          <Box mb={2}>
            <TextField
              label="Spare Part Variant"
              value={spare_part_variant}
              disabled
              fullWidth
            />
          </Box>
        </Grid>
        <Grid item xs={4}>
          <Box mt={2} mb={2}>
            <TextField label="Provider" value={provider} disabled fullWidth />
          </Box>
          <Box mb={2}>
            <TextField label="UT" value={ut} disabled fullWidth />
          </Box>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default UTData;
