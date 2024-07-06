import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Box,
  Collapse,
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
  Divider,
} from "@mui/material";
import { ExpandLess, ExpandMore } from "@mui/icons-material";
import MoneyIcon from "@mui/icons-material/Money";
import ListAltIcon from "@mui/icons-material/ListAlt";
import AddBoxIcon from "@mui/icons-material/AddBox";
import ListIcon from "@mui/icons-material/List";
import BarChartIcon from "@mui/icons-material/BarChart";
import PeopleOutlineIcon from "@mui/icons-material/PeopleOutline";
import Logo from "../../assets/logo.png";

const getIcon = (iconName: any) => {
  switch (iconName) {
    case "Money":
      return <MoneyIcon />;
    case "ListAlt":
      return <ListAltIcon />;
    case "AddBox":
      return <AddBoxIcon />;
    case "List":
      return <ListIcon />;
    case "BarChart":
      return <BarChartIcon />;
    case "PeopleOutline":
      return <PeopleOutlineIcon />;
    default:
      return null;
  }
};

interface SideBarProps {
  drawerWidth?: number;
  open: boolean;
  onClose: () => void;
}

interface MenuItem {
  name: string;
  icon?: string; // Add this line to include the 'icon' property
  subMenu?: MenuItem[];
  route?: string; // Assuming you might also need a 'route' property based on your menu structure
}

interface OpenSubMenuState {
  [key: string]: boolean;
}

const selectedStyle = {
  "&.Mui-selected": {
    backgroundColor: "#f5447a",
    color: "white",
    "&:hover": {
      backgroundColor: "#f5447a",
    },
  },
};

export const SideBar = ({ drawerWidth = 240, open, onClose }: SideBarProps) => {
  let menuData: MenuItem[] = JSON.parse(localStorage.getItem("menu") || "[]");
  const [openSubMenu, setOpenSubMenu] = useState<OpenSubMenuState>({});
  const [selectedItem, setSelectedItem] = useState<string>("");

  const toggleSubMenu = (name: string) => {
    setOpenSubMenu((prevOpenSubMenu) => ({
      ...prevOpenSubMenu,
      [name]: !prevOpenSubMenu[name],
    }));
    // Si no tiene submenú, también actualiza el elemento seleccionado
    if (!menuData.find((item) => item.name === name)?.subMenu) {
      setSelectedItem(name);
    }
  };

  const handleMenuItemClick = (name: string) => {
    setSelectedItem(name);
  };

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
          <Link to="/">
            <img
              src={Logo}
              alt="Logo"
              style={{
                width: "200px",
                height: "auto",
                marginBottom: "10px",
                marginTop: "20px",
              }}
            />
          </Link>
          <Typography variant="h6" noWrap>
            {localStorage.getItem("role") === "admin"
              ? "Administración"
              : "Almacén"}
          </Typography>
        </Toolbar>
        <Divider />
        <List>
          {menuData.map((item, index) => (
            <React.Fragment key={index}>
              <ListItemButton
                onClick={() => {
                  toggleSubMenu(item.name);
                  handleMenuItemClick(item.name);
                }}
                selected={selectedItem === item.name}
                sx={{ ...selectedStyle }}
              >
                <ListItemIcon>{getIcon(item.icon)}</ListItemIcon>
                <ListItemText primary={item.name} />
                {item.subMenu ? (
                  openSubMenu[item.name] ? (
                    <ExpandLess />
                  ) : (
                    <ExpandMore />
                  )
                ) : null}
              </ListItemButton>
              {item.subMenu && (
                <Collapse
                  in={openSubMenu[item.name]}
                  timeout="auto"
                  unmountOnExit
                >
                  <List component="div" disablePadding>
                    {item.subMenu.map((subItem, subIndex) => (
                      <ListItemButton
                        key={subIndex}
                        sx={{
                          pl: 4,
                          ...selectedStyle,
                        }}
                        onClick={() => handleMenuItemClick(subItem.name)}
                        selected={selectedItem === subItem.name}
                      >
                        <ListItemIcon>{getIcon(subItem.icon)}</ListItemIcon>
                        <ListItemText primary={subItem.name} />
                      </ListItemButton>
                    ))}
                  </List>
                </Collapse>
              )}
            </React.Fragment>
          ))}
        </List>
      </Drawer>
    </Box>
  );
};

export default SideBar;
