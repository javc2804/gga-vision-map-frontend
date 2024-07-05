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
// import MoneyIcon from "@mui/icons-material/Money";
// import AddBoxIcon from "@mui/icons-material/AddBox";
// import ListAltIcon from "@mui/icons-material/ListAlt";
// import StoreIcon from "@mui/icons-material/Store";
// import NoteIcon from "@mui/icons-material/Note";
// import InventoryIcon from "@mui/icons-material/Inventory2"; // Adjust based on the correct icon name

interface SideBarProps {
  drawerWidth?: number;
  open: boolean;
  onClose: () => void;
}

type IconKey =
  | "Money"
  | "AddBox"
  | "List"
  | "ListAlt"
  | "Store"
  | "Note"
  | "Inventory";

// const iconMap: { [key in IconKey]: JSX.Element } = {
//   Money: <MoneyIcon />,
//   AddBox: <AddBoxIcon />,
//   List: <ListIcon />,
//   ListAlt: <ListAltIcon />,
//   Store: <StoreIcon />,
//   Note: <NoteIcon />,
//   Inventory: <InventoryIcon />,
// };

type OpenSubMenuState = {
  [key: string]: boolean;
};

export const SideBar = ({ drawerWidth = 240, open, onClose }: SideBarProps) => {
  let menu = JSON.parse(localStorage.getItem("menu") || "[]");
  if (!Array.isArray(menu)) {
    menu = [menu];
  }

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [openSubMenu, setOpenSubMenu] = useState<OpenSubMenuState>({});
  const [selectedItem, setSelectedItem] = useState(null);

  const handleClick = (name: any, route: any) => {
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

  const handleSubItemClick = (event: any, name: any, route: any) => {
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
          {menu.map((item: any) => (
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
                  {iconMap[item.icon as IconKey]}{" "}
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
                    item.subMenu.map((subItem: any) => (
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
                            {iconMap[subItem.icon as IconKey]}
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
