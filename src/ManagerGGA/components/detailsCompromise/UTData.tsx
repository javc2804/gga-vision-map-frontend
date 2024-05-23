import { TextField, Box, Grid, Paper } from "@mui/material";

const UTData = ({ eje, subeje, marcaModelo, quantity, ut, style }) => {
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
            <TextField
              label="Marca/Modelo"
              value={marcaModelo}
              disabled
              fullWidth
            />
          </Box>
        </Grid>
        <Grid item xs={2}>
          <Box mb={2}>
            <TextField label="Eje" value={eje} disabled fullWidth />
          </Box>
        </Grid>
        <Grid item xs={2}>
          <Box mb={2}>
            <TextField label="Sub-Eje" value={subeje} disabled fullWidth />
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
