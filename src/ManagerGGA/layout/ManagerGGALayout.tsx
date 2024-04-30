import { Box, Toolbar } from "@mui/material";
import { Navbar, SideBar } from "../components/";

const drawerWidth = 240;

const ManagerGGALayout = ({ children }) => {
  return (
    <Box sx={{ display: "flex" }}>
      {/*Navbar drawerWidth*/}
      <Navbar drawerWidth={drawerWidth} />
      {/*SideBar drawerWidth*/}
      <SideBar drawerWidth={drawerWidth} />
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        {/*ToolBar*/}
        <Toolbar />
        {children}
      </Box>
    </Box>
  );
};

export default ManagerGGALayout;
