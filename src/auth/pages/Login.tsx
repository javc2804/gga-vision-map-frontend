import { Button, Grid, TextField } from "@mui/material";
import AuthLayout from "../layout/AuthLayout";

export const Login = () => {
  return (
    <>
      <AuthLayout title={"Login"}>
        <form className="animate__animated animate__fadeIn animate__faster">
          <Grid container>
            <Grid item xs={12} sx={{ mt: 2 }}>
              <TextField
                label="Correo"
                type="email"
                placeholder="correo@correo.com"
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sx={{ mt: 2 }}>
              <TextField
                label="Clave"
                type="password"
                placeholder="Clave"
                fullWidth
                name="password"
              />
            </Grid>
            <Grid item xs={12} sx={{ mt: 2 }}></Grid>

            <Grid container spacing={2} sx={{ mb: 2, mt: 1 }}>
              <Grid item xs={12} sm={6}>
                <Button type="submit" variant="contained" fullWidth>
                  Login
                </Button>
              </Grid>
              <Grid item xs={12} sm={6}></Grid>
            </Grid>
            <Grid container direction="row" justifyContent="end"></Grid>
          </Grid>
        </form>
      </AuthLayout>
    </>
  );
};

export default Login;
