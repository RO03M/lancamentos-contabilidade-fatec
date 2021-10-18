// import { ThemeProvider } from "@mui/material";
// import { createTheme } from "@mui/system";
import { ThemeProvider, useTheme, createTheme } from '@mui/material/styles';

import React from "react";
import { useSelector } from "react-redux";

import {
    BrowserRouter as Router,
    Switch,
    Route
} from "react-router-dom";
import MainPage from "./pages";

function App() {

    const theme = useSelector(store => store.AppReducer.theme);

    const themeMode = React.useMemo(() => createTheme({
        palette: {
            mode: theme
        }
    }, []));

    return (
        <div className="App">
            <Router>
                <Switch>
                    <Route path="/">
                        <ThemeProvider theme={themeMode}>
                            <MainPage/>
                        </ThemeProvider>
                    </Route>
                </Switch>
            </Router>
        </div>
    );
}

export default App;
