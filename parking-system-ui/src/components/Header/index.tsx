import { AppBar, Box, Tab, Tabs, Toolbar, Typography } from "@mui/material";
import React, { useState } from "react";
import NavDrawer from "../Drawer";
import { Link, useLocation } from "react-router-dom";
import TabContext from "@mui/lab/TabContext";

const useStyles = {
  linkStyle: {
    ml: 3,
    alignSelf: "center",
    color: "#000",
    "&:hover, &:focus": {
      color: "#FF0000",
    },
  },
  buttonStyle: {
    ml: 3,
    alignSelf: "center",
    backgroundColor: "#000",
    textTransform: "none",
    "&:hover": {
      backgroundColor: "#000",
    },
    "&:MuiTabs-indicator": {
      display: "none",
    },
  },
  tabButtonStyle: {
    textTransform: "none",
    fontSize: 22,
    fontWeight: "w800",
    color: "#000",
    "&:hover, &:focus": {
      color: "#C71616",
    },
    "&.Mui-selected": {
      color: "#C71616"
    }
  },
  tabBarStyle: {
    "& .MuiTabs-indicator": { 
      display: "none" 
    },
  },
  logoText: {
    fontWeight: "400",
    fontSize: "1.15rem",
    paddingRight: "2rem",
    paddingLeft: "1rem",
    paddingTop: "0.3rem",
    paddingBottom: "0.3rem",
    color: "#fff",
    //marginBottom: "0.5rem",
    backgroundColor: "black",
    borderRadius: "0 25px 25px 0",
  },
  toolBar:{
    paddingRight: "24px",
    ".MuiToolbar-root": {
      paddingLeft:'50px',
    }
  }
};

// const LinkTab: React.ComponentType<TabProps & LinkProps> = Tab as React.ComponentType<TabProps & LinkProps>;

const Header: React.FC = () => {
  const { pathname } = useLocation();
  const [value, setValue] = useState(pathname);

  return (
    <div>
      <AppBar position="static" color="transparent" sx={{ boxShadow: "none"}}>
        <Toolbar disableGutters sx={useStyles.toolBar} >
          {value !== "/" ? (
            <Typography sx={useStyles.logoText} children="Intelligent Parking System" />
          ) : null}
          <Box flexGrow={1} />

          <TabContext value={pathname}>
            <Box sx={{ display: { xs: "none", md: "flex" } }}>
              <Tabs
                indicatorColor="primary"
                value={pathname}
                onChange={(e, value) => setValue(value)}
                sx={useStyles.tabBarStyle}
              >
                <Tab
                  disableRipple
                  sx={useStyles.tabButtonStyle}
                  label="Home"
                  component={Link}
                  to="/"
                  value={"/"}
                />
                <Tab
                  disableRipple
                  sx={useStyles.tabButtonStyle}
                  label="Find a Spot"
                  component={Link}
                  to="/find"
                  value={"/find"}
                />
                <Tab
                  disableRipple
                  sx={useStyles.tabButtonStyle}
                  label="Watch Live"
                  component={Link}
                  to="/watch"
                  value={"/watch"}
                />
                <Tab
                  disableRipple
                  sx={useStyles.tabButtonStyle}
                  label="About"
                  component={Link}
                  to="/about"
                  value={"/about"}
                />
              </Tabs>
            </Box>
          </TabContext>

          <Box sx={{ display: { xs: "flex", md: "none" } }}>
            <NavDrawer />
          </Box>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Header;
