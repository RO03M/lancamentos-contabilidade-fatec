import React, { useState } from "react";
import { AppBar, BottomNavigation, BottomNavigationAction, Drawer, IconButton, List, ListItem, ListItemIcon, ListItemText, ListItemButton, Tab, Tabs, Toolbar, Paper } from "@mui/material";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import SwipeableViews from "react-swipeable-views";
import Launches from "./Launches";
import Reasons from "./Reasons";
import BPDRE from "./BPDRE";
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import GitHubIcon from '@mui/icons-material/GitHub';

import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';

import { SwitchTheme } from "../actions/AppActions";

import "./index.css";

const MainPage = () => {

    const [activeTab, SetActiveTab] = useState(0);
    const [drawer, SetDrawer] = useState(false);

    const history = useHistory();
    const theme = useSelector(store => store.AppReducer.theme);

    const dispatch = useDispatch();

    return (
        <Paper className="Menu">
            <AppBar position="static">
                <Toolbar>
                    <IconButton onClick={() => SetDrawer(true)}>
                        <MenuIcon/>
                    </IconButton>
                    <div className="topNav w100">
                        <Tabs
                            value={activeTab}
                            onChange={(_, value) => {
                                SetActiveTab(value);
                                history.push(`?tab=${value}`);
                            }}
                            sx={{
                                flexGrow: 1
                            }}
                            indicatorColor="secondary"
                            textColor="inherit"
                            variant="scrollable"
                        >
                            <Tab label="Lançamentos"/>
                            <Tab label="Razão"/>
                            <Tab label="BP e DRE"/>
                            <Tab label="Resumo"/>
                        </Tabs>
                    </div>
                </Toolbar>
            </AppBar>
            <AppBar position="fixed" style={{ top: "auto", bottom: 0 }}>
                <div className="bottomNav">
                    <BottomNavigation
                        showLabels
                        value={activeTab}
                        onChange={(_, value) => {
                            SetActiveTab(value);
                            history.push(`?tab=${value}`);
                        }}
                        sx={{ width: "100%" }}
                    >
                        <BottomNavigationAction label="Lançamentos"/>
                        <BottomNavigationAction label="Razão"/>
                        <BottomNavigationAction label="BP e DRE"/>
                        <BottomNavigationAction label="Resumo"/>
                    </BottomNavigation>
                </div>
            </AppBar>
            <Drawer
                anchor="left"
                open={drawer}
                onClose={() => SetDrawer(false)}
            >
                <div style={{ padding: "10px" }}>
                    <IconButton onClick={() => dispatch(SwitchTheme())}>
                        {theme === "dark" ? <LightModeIcon/> : <DarkModeIcon/>}
                    </IconButton>
                    <IconButton onClick={() => SetDrawer(false)} sx={{ float: "right" }}>
                        <CloseIcon/>
                    </IconButton>
                </div>
                <List>
                    <ListItem>
                        <ListItemButton>
                            <ListItemIcon>
                                <GitHubIcon/>
                            </ListItemIcon>
                            <ListItemText primary="Repositório no github"/>
                        </ListItemButton>
                    </ListItem>
                </List>
            </Drawer>
            <SwipeableViews
                index={activeTab}
                onChangeIndex={index => SetActiveTab(index)}
            >
                <div className="launches">
                    <Launches/>
                </div>
                <div className="reasons">
                    <Reasons/>
                </div>
                <div className="bpdre">
                    <BPDRE/>
                </div>
            </SwipeableViews>
        </Paper>
    );
}

export default MainPage;