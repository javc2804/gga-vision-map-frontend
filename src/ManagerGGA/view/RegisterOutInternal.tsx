import { TextField, Grid } from "@mui/material";

const RegisterOutInternal = () => {
  return (
    <Grid container spacing={2} padding={2}>
      {Array.from({ length: 31 }).map((_, index) => (
        <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
          <TextField
            fullWidth
            label={`Campo ${index + 1}`}
            variant="outlined"
          />
        </Grid>
      ))}
    </Grid>
  );
};

export default RegisterOutInternal;
