import React, { useState } from "react";
import { AppBar, BottomNavigation, BottomNavigationAction, Drawer, IconButton, List, ListItem, ListItemIcon, ListItemText, ListItemButton, Tab, Tabs, Toolbar } from "@mui/material";
import { useHistory } from "react-router-dom";
import SwipeableViews from "react-swipeable-views";
import Launches from "./Launches";
import Reasons from "./Reasons";
import BPDRE from "./BPDRE";
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import GitHubIcon from '@mui/icons-material/GitHub';

import "./index.css";

const MainPage = () => {

    const [activeTab, SetActiveTab] = useState(0);
    const [drawer, SetDrawer] = useState(false);

    const history = useHistory();

    return (
        <div className="Menu">
            <AppBar position="static">
                <Toolbar>
                    <IconButton onClick={() => SetDrawer(true)}>
                        <MenuIcon/>
                    </IconButton>
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
                        className="topNav"
                    >
                        <Tab label="Lançamentos"/>
                        <Tab label="Razão"/>
                        <Tab label="BP e DRE"/>
                        <Tab label="Resumo"/>
                    </Tabs>
                </Toolbar>
            </AppBar>
            <AppBar position="fixed" style={{top: "auto", bottom: 0}}>
                <BottomNavigation
                    showLabels
                    value={activeTab}
                    onChange={(_, value) => {
                        SetActiveTab(value);
                        history.push(`?tab=${value}`);
                    }}
                    className="bottomNav"
                >
                    <BottomNavigationAction label="Lançamentos"/>
                    <BottomNavigationAction label="Razão"/>
                    <BottomNavigationAction label="BP e DRE"/>
                    <BottomNavigationAction label="Resumo"/>
                </BottomNavigation>
            </AppBar>
            <Drawer
                anchor="left"
                open={drawer}
                onClose={() => SetDrawer(false)}
            >
                <IconButton onClick={() => SetDrawer(false)} sx={{ float: "right" }}>
                    <CloseIcon/>
                </IconButton>
                <List>
                    <ListItem>
                        <ListItemButton>
                            <ListItemIcon>
                                <GitHubIcon/>
                            </ListItemIcon>
                            <ListItemText primary="Ver no github"/>
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
        </div>
    );
}

export default MainPage;