import React from "react";
import { Box, Grid, IconButton, Paper } from "@mui/material";
// import BuildIcon from "@mui/icons-material/Build"; // Asumiendo íconos para el ejemplo
// import SettingsIcon from "@mui/icons-material/Settings";
// import AccountBalanceIcon from "@mui/icons-material/AccountBalance";

// Estilos comunes o específicos pueden ser definidos aquí

type DataItem = {
  description: string;
  facBs: number;
  paidBs: number;
  factDollar: number;
  paidDollar: number;
};

interface SectionProps {
  title: string;
  icon: React.ReactElement; // Assuming icon is a React element, adjust as necessary
  data: DataItem[];
}

const boxStyle = { margin: 8, padding: 8 };
const iconButtonStyle = {
  position: "absolute",
  top: "-30px",
  left: "50%",
  transform: "translateX(-50%)",
};

const Section: React.FC<SectionProps> = ({ title, icon, data }) => (
  <Paper elevation={3} style={boxStyle}>
    <Box position="relative">
      <IconButton sx={iconButtonStyle}>{icon}</IconButton>
    </Box>
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      height="100%"
      padding={2}
    >
      <h2>{title}</h2>
      <Grid container spacing={2}>
        <Grid item xs={3}>
          <b>Descripción</b>
        </Grid>
        <Grid item xs={2}>
          <b>Fac Bs.</b>
        </Grid>
        <Grid item xs={2}>
          <b>Pagado Bs.</b>
        </Grid>
        <Grid item xs={2}>
          <b>Fact $</b>
        </Grid>
        <Grid item xs={2}>
          <b>Pagado $</b>
        </Grid>
        {data.map((item: any, index: any) => (
          <React.Fragment key={index}>
            <Grid item xs={3}>
              {item.description}
            </Grid>
            <Grid item xs={2}>
              {item.facBs}
            </Grid>
            <Grid item xs={2}>
              {item.paidBs}
            </Grid>
            <Grid item xs={2}>
              {item.factDollar}
            </Grid>
            <Grid item xs={2}>
              {item.paidDollar}
            </Grid>
          </React.Fragment>
        ))}
      </Grid>
    </Box>
  </Paper>
);

export default Section;
