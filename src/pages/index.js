import React, { useEffect, useRef, useState } from "react";
import { AppBar, BottomNavigation, BottomNavigationAction, Drawer, IconButton, List, ListItem, ListItemIcon, ListItemText, ListItemButton, Tab, Tabs, Toolbar, Paper, Fab, Tooltip, Dialog, DialogTitle, DialogContent, DialogActions, Button } from "@mui/material";
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
import AddIcon from '@mui/icons-material/Add';
import ClearAllIcon from '@mui/icons-material/ClearAll';

import { SwitchTheme, Reset } from "../actions/AppActions";

import "./index.css";
import Resume from "./Resume";

const MainPage = () => {

    const [activeTab, SetActiveTab] = useState(0);
    const [drawer, SetDrawer] = useState(false);
    const [resetDialog, SetResetDialog] = useState(false);

    const history = useHistory();
    const theme = useSelector(store => store.AppReducer.theme);

    const launchesRef = useRef();

    const dispatch = useDispatch();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [activeTab]);

    return (
        <Paper className="Menu">
            <AppBar 
                position="fixed"
            >
                <Toolbar>
                    <IconButton onClick={() => SetDrawer(true)}>
                        <MenuIcon/>
                    </IconButton>
                    <div className="d-md-block d-none w100">
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
                            <Tab label="Lançamentos" index={0}/>
                            <Tab label="Razão" index={1}/>
                            <Tab label="BP e DRE" index={2}/>
                            <Tab label="Resumo" index={3}/>
                        </Tabs>
                    </div>
                </Toolbar>
            </AppBar>
            <div
                style={{
                    width: "100%",
                    height: "5em"
                }}
                role="separator"
            />
            <AppBar position="fixed" style={{ top: "auto", bottom: 0 }}>
                <div className="d-md-none d-block">
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
                disableScrollLock
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
                    <ListItem button>
                        <ListItemIcon>
                            <GitHubIcon/>
                        </ListItemIcon>
                        <ListItemText primary="Repositório no github"/>
                    </ListItem>
                    <ListItem button onClick={() => SetResetDialog(true)}>
                        <ListItemIcon>
                            <ClearAllIcon/>
                        </ListItemIcon>
                        <ListItemText primary="Resetar valores"/>
                    </ListItem>
                </List>
            </Drawer>

            <Dialog
                open={resetDialog}
                onClose={() => SetResetDialog(false)}
            >
                <DialogTitle>Resetar valores das tabelas?</DialogTitle>
                <DialogContent>Deseja mesmo resetar os valores da tabela? Todos os dados cadastrados serão perdidos!</DialogContent>
                <DialogActions>
                    <Button variant="contained" color="error" onClick={() => SetResetDialog(false)}>Cancelar</Button>
                    <Button variant="contained" color="info" onClick={() => {
                        dispatch(Reset());
                        SetResetDialog(false);
                        SetDrawer(false);
                    }}>Confirmar</Button>
                </DialogActions>
            </Dialog>

            <SwipeableViews
                index={activeTab}
                onChangeIndex={index => SetActiveTab(index)}
                style={{
                    marginTop: "1em"
                }}
            >
                <div className="launches">
                    <Launches
                        ref={launchesRef}
                    />
                </div>
                <div className="reasons">
                    <Reasons/>
                </div>
                <div className="bpdre">
                    <BPDRE/>
                </div>
                <div className="resume">
                    <Resume/>
                </div>
            </SwipeableViews>
            <div
                style={{
                    width: "100%",
                    height: "4em"
                }}
                role="separator"
            />
            //////ADD BUTTON//////
            <Tooltip
                title="Adicionar lançamento"
                arrow
                placement="left"
            >
                <Fab
                    onClick={() => launchesRef.current.OpenModal()}
                    style={{
                        position: "fixed",
                        zIndex: 1200,
                        right: "20px",
                        bottom: "20px"
                    }}
                    size="medium"
                    hidden={activeTab !== 0}
                    className="d-md-block d-none"
                    color="primary"
                >
                    <AddIcon/>
                </Fab>
            </Tooltip>

            <Tooltip
                title="Adicionar lançamento"
                arrow
                placement="top"
            >
                <Fab
                    onClick={() => launchesRef.current.OpenModal()}
                    style={{
                        position: "fixed",
                        zIndex: 1200,
                        transform: "translate(-50%, -50%)",
                        left: "50%",
                        bottom: "10px"
                    }}
                    size="medium"
                    hidden={activeTab !== 0}
                    className="d-md-none d-block"
                    color="primary"
                >
                    <AddIcon/>
                </Fab>
            </Tooltip>
        </Paper>
    );
}

export default MainPage;