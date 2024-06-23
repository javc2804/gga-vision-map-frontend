import { Box, Grid, IconButton, Paper } from "@mui/material";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import SettingsIcon from "@mui/icons-material/Settings";
import BuildIcon from "@mui/icons-material/Build";

export const SummaryOutInternal = () => {
  const boxStyle = {
    padding: "10px",
    margin: "10px",
    backgroundColor: "white",
    width: "40%",
    height: "250px", // Aumenta la altura a 500px
    marginBottom: "5%",
    overflowY: "auto", // Añade desbordamiento de scroll en el eje Y
  };

  const iconButtonStyle1 = {
    backgroundColor: "#ffa523",
    color: "white",
    position: "absolute",
    left: 0,
    top: -5,
    width: "120px",
    height: 100,
    borderRadius: 0,
    boxShadow: "3px 3px 5px 0px rgba(0,0,0,0.75)",
  };

  const iconButtonStyle2 = {
    backgroundColor: "#4ca750",
    color: "white",
    position: "absolute" as "absolute",
    left: 0,
    top: -10,
    width: "120px",
    height: 100,
    borderRadius: 0,
    boxShadow: "3px 3px 5px 0px rgba(0,0,0,0.75)",
  };

  const iconButtonStyle3 = {
    backgroundColor: "#e94441",
    color: "white",
    position: "absolute" as "absolute",
    left: 0,
    top: -10,
    width: "120px",
    height: 100,
    borderRadius: 0,
    boxShadow: "3px 3px 5px 0px rgba(0,0,0,0.75)",
  };

  const titles = {
    margin: "0.2em 0",
  };
  return (
    <Box display="flex" justifyContent="center" flexWrap="wrap">
      <Paper elevation={3} style={boxStyle}>
        <Box position="relative">
          <IconButton style={iconButtonStyle1}>
            <BuildIcon style={{ fontSize: 60 }} />
          </IconButton>
        </Box>
        <Box
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          height="100%"
          padding={2}
        >
          <h2>Mantenimientos</h2>
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
            {/* Contenido para Adquisición */}
            <Grid item xs={3}>
              Adquisicion
            </Grid>
            <Grid item xs={2}>
              1.046.417,75
            </Grid>
            <Grid item xs={2}>
              27.940,91
            </Grid>
            <Grid item xs={2}>
              4
            </Grid>
            <Grid item xs={2}>
              5
            </Grid>
            {/* Contenido para Servicio */}
            <Grid item xs={3}>
              Servicio
            </Grid>
            <Grid item xs={2}>
              1.046.417,75
            </Grid>
            <Grid item xs={2}>
              27.940,91
            </Grid>
            <Grid item xs={2}>
              8
            </Grid>
            <Grid item xs={2}>
              9
            </Grid>
          </Grid>
        </Box>
      </Paper>
      <Paper elevation={3} style={boxStyle}>
        <Box position="relative">
          <IconButton style={iconButtonStyle2}>
            <SettingsIcon style={{ fontSize: 60 }} />
          </IconButton>
        </Box>
        <Box
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          height="100%"
          padding={2}
        >
          <h2>Funcionamiento</h2>
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
            {/* Contenido para Adquisición */}
            <Grid item xs={3}>
              Adquisicion
            </Grid>
            <Grid item xs={2}>
              1.046.417,75
            </Grid>
            <Grid item xs={2}>
              27.940,91
            </Grid>
            <Grid item xs={2}>
              4
            </Grid>
            <Grid item xs={2}>
              5
            </Grid>
            {/* Contenido para Servicio */}
            <Grid item xs={3}>
              Servicio
            </Grid>
            <Grid item xs={2}>
              1.046.417,75
            </Grid>
            <Grid item xs={2}>
              27.940,91
            </Grid>
            <Grid item xs={2}>
              8
            </Grid>
            <Grid item xs={2}>
              9
            </Grid>
          </Grid>
        </Box>
      </Paper>
      <Paper elevation={3} style={boxStyle}>
        <Box position="relative">
          <IconButton style={iconButtonStyle3}>
            <AccountBalanceIcon style={{ fontSize: 60 }} />
          </IconButton>
        </Box>
        <Box
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          height="100%"
          padding={2}
        >
          <h2>Otros</h2>
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
            {/* Contenido para Adquisición */}
            <Grid item xs={3}>
              Gasto de Personal
            </Grid>
            <Grid item xs={2}>
              1.046.417,75
            </Grid>
            <Grid item xs={2}>
              27.940,91
            </Grid>
            <Grid item xs={2}>
              4
            </Grid>
            <Grid item xs={2}>
              5
            </Grid>
            {/* Contenido para Servicio */}
            <Grid item xs={3}>
              Aportes
            </Grid>
            <Grid item xs={2}>
              1.046.417,75
            </Grid>
            <Grid item xs={2}>
              27.940,91
            </Grid>
            <Grid item xs={2}>
              8
            </Grid>
            <Grid item xs={2}>
              9
            </Grid>
            <Grid item xs={3}>
              Impuestos
            </Grid>
            <Grid item xs={2}>
              1.046.417,75
            </Grid>
            <Grid item xs={2}>
              27.940,91
            </Grid>
            <Grid item xs={2}>
              8
            </Grid>
            <Grid item xs={2}>
              9
            </Grid>
            <Grid item xs={3}>
              Donaciones
            </Grid>
            <Grid item xs={2}>
              1.046.417,75
            </Grid>
            <Grid item xs={2}>
              27.940,91
            </Grid>
            <Grid item xs={2}>
              8
            </Grid>
            <Grid item xs={2}>
              9
            </Grid>
          </Grid>
        </Box>
      </Paper>

      {/* <Paper elevation={3} style={boxStyle}>
        <Box position="relative">
          <IconButton style={iconButtonStyle2}>
            <AttachMoneyIcon style={{ fontSize: 60 }} />
          </IconButton>
        </Box>
        <Box
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          height="100%"
          padding={2} // Añade un poco de padding
        >
          <h2>Montos $</h2>
          <Grid container>
            <Grid item xs={6}>
              <h3 style={titles}>Cauchos:</h3>
              <h3 style={titles}>Baterias:</h3>
              <h3 style={titles}>Lubricantes:</h3>
            </Grid>
            <Grid item xs={6}>
              <h3 style={titles}>Servicios:</h3>
              <h3 style={titles}>Repuestos:</h3>
              <h3 style={titles}>Preventivos:</h3>
            </Grid>
          </Grid>
          <h3>
            Total:
            <span></span>
          </h3>
        </Box>
      </Paper>

      <Paper elevation={3} style={boxStyle}>
        <Box position="relative">
          <IconButton style={iconButtonStyle4}>
            <AccountBalanceIcon style={{ fontSize: 60 }} />
          </IconButton>
        </Box>
        <Box
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          height="100%"
          padding={2} // Añade un poco de padding
        >
          <h2>Deudas $</h2>
          <Grid container>
            <Grid item xs={6}>
              <h3 style={titles}>Cauchos:</h3>
              <h3 style={titles}>Baterias:</h3>
              <h3 style={titles}>Lubricantes:</h3>
            </Grid>
            <Grid item xs={6}>
              <h3 style={titles}>Servicios:</h3>
              <h3 style={titles}>Repuestos:</h3>
              <h3 style={titles}>Preventivos:</h3>
            </Grid>
          </Grid>
          <h3>
            Total:
            <span></span>
          </h3>
        </Box>
      </Paper> */}
    </Box>
  );
};

export default SummaryOutInternal;
