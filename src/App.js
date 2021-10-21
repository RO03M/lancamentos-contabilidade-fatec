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

const lightPalette = {
    
}

const darkPalette = {
    primary: {
        main: "#4527a0",
        dark: "#311b92",
        contrastText: "#fff"
    }
}

function App() {

    const theme = useSelector(store => store.AppReducer.theme);

    const themeMode = React.useMemo(() => createTheme({
        palette: {
            mode: theme,
            ...(theme === "dark" ? darkPalette : lightPalette)
        }
    }, [theme]));

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
