import React, { useState } from "react";
import { AppBar, Tab, Tabs } from "@mui/material";
import { useHistory } from "react-router-dom";
import SwipeableViews from "react-swipeable-views";
import Launches from "./Launches";
import Reasons from "./Reasons";
import BPDRE from "./BPDRE";

const MainPage = () => {

    const [activeTab, SetActiveTab] = useState(0);

    const history = useHistory();

    return (
        <div className="Menu">
            <AppBar position="static">
                <Tabs
                    value={activeTab}
                    onChange={(_, value) => {
                        SetActiveTab(value);
                        history.push(`?tab=${value}`);
                    }}
                    indicatorColor="secondary"
                    textColor="inherit"
                    variant="fullWidth"
                >
                    <Tab label="Lançamentos"/>
                    <Tab label="Razão"/>
                    <Tab label="BP e DRE"/>
                    <Tab label="Resumo"/>
                </Tabs>
            </AppBar>
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