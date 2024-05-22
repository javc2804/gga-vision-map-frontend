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
  return (
    <>
      <Grid container spacing={1}>
        <Grid item xs={2}>
          <Box mb={2}>
            <TextField label="UT" value={ut} disabled fullWidth />
          </Box>
        </Grid>
        <Grid item xs={2}>
          <Box mb={2}>
            <TextField label="Marca/Modelo" value={ut} disabled fullWidth />
          </Box>
        </Grid>
        <Grid item xs={2}>
          <Box mb={2}>
            <TextField label="Eje" value={ut} disabled fullWidth />
          </Box>
        </Grid>
        <Grid item xs={2}>
          <Box mb={2}>
            <TextField label="Sub-Eje" value={ut} disabled fullWidth />
          </Box>
        </Grid>
        <Grid item xs={2}>
          <Box mb={2}>
            <TextField label="Cantidad" value={quantity} disabled fullWidth />
          </Box>
        </Grid>
      </Grid>
    </>
  );
};

export default UTData;
