import { TurnedInNot } from "@mui/icons-material";
import {
  Box,
  Divider,
  Drawer,
  Grid,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
} from "@mui/material";
import Logo from "../../assets/logo.png";

export const SideBar = ({ drawerWidth = 240, open, onClose }) => {
  let menu = JSON.parse(localStorage.getItem("menu") || "[]");
  if (!Array.isArray(menu)) {
    menu = [menu];
  }
  return (
    <Box
      component="nav"
      sx={{ width: { sm: open ? drawerWidth : 0 }, flexShrink: { sm: 0 } }}
    >
      <Drawer
        variant={open ? "persistent" : "temporary"}
        open={open}
        onClose={onClose}
        sx={{
          display: { xs: "none", sm: "block" },
          "& .MuiDrawer-paper": { boxSizing: "border-box", width: drawerWidth },
        }}
      >
        <Toolbar sx={{ justifyContent: "center", flexDirection: "column" }}>
          {" "}
          <img
            src={Logo}
            alt="Logo"
            style={{
              width: "200px",
              height: "auto",
              marginTop: "10px",
              marginBottom: "10px",
            }}
          />
          <Typography variant="h6" noWrap>
            GGA - Administración
          </Typography>
        </Toolbar>
        <Divider />
        <List>
          {menu.map((item) => (
            <div key={item.name}>
              <ListItem disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    <TurnedInNot />
                  </ListItemIcon>
                  <ListItemText primary={item.name} />
                </ListItemButton>
              </ListItem>
              {item.subMenu &&
                item.subMenu.map((subItem) => (
                  <ListItem key={subItem} disablePadding>
                    <ListItemButton>
                      <ListItemIcon>
                        <TurnedInNot />
                      </ListItemIcon>
                      <ListItemText primary={subItem} />
                    </ListItemButton>
                  </ListItem>
                ))}
            </div>
          ))}
        </List>
      </Drawer>
    </Box>
  );
};

export default SideBar;
