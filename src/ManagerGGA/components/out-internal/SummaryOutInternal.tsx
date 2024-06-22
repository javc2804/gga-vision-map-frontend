import { Box, Grid, IconButton, Paper } from "@mui/material";
import InsertChartOutlinedIcon from "@mui/icons-material/InsertChartOutlined";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import MoneyOffIcon from "@mui/icons-material/MoneyOff";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";

export const SummaryOutInternal = () => {
  const boxStyle = {
    padding: "10px",
    margin: "10px",
    backgroundColor: "white",
    width: "22%",
    height: "250px", // Aumenta la altura a 500px
    marginBottom: "5%",
    overflowY: "auto", // Añade desbordamiento de scroll en el eje Y
  };

  const iconButtonStyle1 = {
    backgroundColor: "#ffa523",
    color: "white",
    position: "absolute",
    left: 0,
    top: -20,
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
    backgroundColor: "#13b9cd",
    color: "white",
    position: "absolute" as "absolute",
    left: 0,
    top: -10,
    width: "120px",
    height: 100,
    borderRadius: 0,
    boxShadow: "3px 3px 5px 0px rgba(0,0,0,0.75)",
  };

  const iconButtonStyle4 = {
    backgroundColor: "#ea4541",
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
            <InsertChartOutlinedIcon style={{ fontSize: 60 }} />
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
          <h2>Mantenimientos</h2>
          <Grid container>
            <Grid item xs={6}>
              <h3 style={titles}>Adquisicion:</h3>
              <h3 style={titles}>Servicio:</h3>
            </Grid>
            <Grid item xs={6}>
              <h3 style={titles}>Monto Fact Pagado Bs: 3</h3>
              <h3 style={titles}>Monto Pagado Bs: 3</h3>
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
          <IconButton style={iconButtonStyle3}>
            <MoneyOffIcon style={{ fontSize: 60 }} />
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
          <h2>Montos Bs</h2>
          <Grid container>
            <Grid item xs={6}>
              <h3 style={titles}>Cauchos: 2</h3>
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
      </Paper>
    </Box>
  );
};

export default SummaryOutInternal;
