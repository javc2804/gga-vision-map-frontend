import { Grid, Typography } from "@mui/material";
import logo from "../../assets/logo.png";
import fondo from "../../assets/fondo.png";
import "./AuthLayout.css";

const AuthLayout = ({ children, title }) => {
  return (
    <Grid
      container
      spacing={0}
      direction="column"
      alignItems="center"
      justifyContent="center"
      className="container"
      sx={{
        minHeight: "100vh",
        backgroundColor: "#F5447A",
        padding: 4,
        overflow: "hidden",
      }}
    >
      <Grid item className="box-shadow" xs={3}>
        <Typography variant="h5" sx={{ mb: 1 }}>
          {title}
        </Typography>
        {children}
      </Grid>
      <img src={fondo} className="fondo" alt="fondo" />
      <img src={logo} className="logo" alt="logo" />
    </Grid>
  );
};

export default AuthLayout;
