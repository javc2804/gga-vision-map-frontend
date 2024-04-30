import { LoginOutlined, MenuOutlined } from "@mui/icons-material";
import {
  AppBar,
  Box,
  Grid,
  IconButton,
  Toolbar,
  Typography,
} from "@mui/material";
import { useDispatch } from "react-redux";
import { startLogout } from "../../store/auth";

export const Navbar = ({ drawerWidth = 240 }) => {
  const dispatch = useDispatch();
  const logOut = () => {
    dispatch(startLogout());
  };

  const userName =
    `${localStorage.getItem("name")} ${localStorage.getItem("lastName")} ` ||
    "Usuario desconocido";

  return (
    <AppBar
      position="fixed"
      sx={{
        backgroundColor: "#17dbeb",
        width: { sm: `calc(100% - ${drawerWidth}px)` },
        ml: { sm: `${drawerWidth}px` },
      }}
    >
      <Toolbar>
        <IconButton>
          <MenuOutlined />
        </IconButton>
        <Grid
          container
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Typography variant="h6" noWrap component="div">
            GGA 360 Vision Map
          </Typography>
          <Box display="flex" alignItems="center">
            <Typography noWrap component="div">
              {userName}
            </Typography>
            <IconButton color="white" onClick={logOut}>
              <LoginOutlined />
            </IconButton>
          </Box>
        </Grid>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
