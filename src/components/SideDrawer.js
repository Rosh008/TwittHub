import { Home, Twitter } from "@mui/icons-material";
import {
  Drawer,
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { Link } from "react-router-dom";
import React from "react";
import logo from "../logo.svg";

const drawerWidth = 240;

const tabsOptions = [
  {
    tabName: "Home",
    navUrl: "/",
  },
  {
    tabName: "Tweets",
    navUrl: "/tweets",
  },
];

export default function SideDrawer() {
  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: "border-box" },
      }}
    >
      <Box>
        <Box
          marginTop={4}
          sx={{
            height: 100,
            width: "100%",
          }}
          component="img"
          src={logo}
        />
        <List>
          {tabsOptions.map((val, idx) => (
            <ListItem
              sx={{ marginTop: "4px" }}
              component={Link}
              to={val.navUrl}
              key={val.tabName}
              disablePadding
            >
              <ListItemButton>
                <ListItemIcon>{idx ? <Twitter /> : <Home />}</ListItemIcon>
                <ListItemText sx={{ color: "white" }}>
                  {val.tabName}
                </ListItemText>
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Box>
    </Drawer>
  );
}
