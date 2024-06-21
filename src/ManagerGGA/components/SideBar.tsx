import { Link } from "react-router-dom";

import {
  ExpandLess,
  ExpandMore,
  MoneyOffCsred,
  AddBox,
  List as ListIcon,
  Store,
  Note,
  Inventory,
  People,
  PersonAdd,
  PeopleOutline,
  ListAlt,
} from "@mui/icons-material";
import {
  Box,
  Collapse,
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
} from "@mui/material";
import Logo from "../../assets/logo.png";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { editPurchaseClear } from "../../store/purchase/purchaseSlice";
import ShowChartIcon from "@mui/icons-material/ShowChart";

export const SideBar = ({ drawerWidth = 240, open, onClose }) => {
  let menu = JSON.parse(localStorage.getItem("menu") || "[]");
  if (!Array.isArray(menu)) {
    menu = [menu];
  }

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [openSubMenu, setOpenSubMenu] = useState({});
  const [selectedItem, setSelectedItem] = useState(null);

  const handleClick = (name, route) => {
    console.log(name, route);
    if (selectedItem === name) {
      return;
    }

    if (name === "Registro") {
      console.log("first");
      dispatch(editPurchaseClear());
    }
    setOpenSubMenu((prevOpenSubMenu) => ({
      ...prevOpenSubMenu,
      [name]: !prevOpenSubMenu[name],
    }));
    setSelectedItem(name);
    navigate(route);
  };

  const handleSubItemClick = (event, name, route) => {
    event.stopPropagation();

    if (selectedItem === name) {
      return;
    }

    setSelectedItem(name);
    navigate(route);
  };

  const iconMap = {
    Money: <MoneyOffCsred />,
    AddBox: <AddBox />,
    List: <ListIcon />,
    ListAlt: <ListAlt />,
    Store: <Store />,
    Note: <Note />,
    Inventory: <Inventory />,
    People: <People />,
    PersonAdd: <PersonAdd />,
    PeopleOutline: <PeopleOutline />,
    BarChart: <ShowChartIcon />,
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
          {menu.map((item) => (
            <div key={item.name}>
              <ListItemButton
                onClick={() => handleClick(item.name, item.route)}
                selected={selectedItem === item.name}
                style={{
                  backgroundColor:
                    selectedItem === item.name ? "#f5447a" : "inherit",
                  color: selectedItem === item.name ? "#ffffff" : "inherit",
                }}
              >
                <ListItemIcon
                  style={{
                    color: selectedItem === item.name ? "#ffffff" : "inherit",
                  }}
                >
                  {iconMap[item.icon]}
                </ListItemIcon>
                <ListItemText primary={item.name} />
                {openSubMenu[item.name] ? <ExpandLess /> : <ExpandMore />}
              </ListItemButton>
              <Collapse
                in={openSubMenu[item.name]}
                timeout="auto"
                unmountOnExit
              >
                <List component="div" disablePadding>
                  {item.subMenu &&
                    item.subMenu.map((subItem) => (
                      <ListItem key={subItem.name} disablePadding>
                        <ListItemButton
                          onClick={(event) =>
                            handleSubItemClick(
                              event,
                              subItem.name,
                              subItem.route
                            )
                          }
                          selected={selectedItem === subItem.name}
                          style={{
                            backgroundColor:
                              selectedItem === subItem.name
                                ? "#f5447a"
                                : "inherit",
                            color:
                              selectedItem === subItem.name
                                ? "#ffffff"
                                : "inherit",
                            marginLeft: "8px",
                          }}
                        >
                          <ListItemIcon
                            style={{
                              color:
                                selectedItem === subItem.name
                                  ? "#ffffff"
                                  : "inherit",
                            }}
                          >
                            {iconMap[subItem.icon]}
                          </ListItemIcon>
                          <ListItemText primary={subItem.name} />
                        </ListItemButton>
                      </ListItem>
                    ))}
                </List>
              </Collapse>
            </div>
          ))}
        </List>
      </Drawer>
    </Box>
  );
};

export default SideBar;
