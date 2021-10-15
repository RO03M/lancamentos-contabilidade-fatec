import React from "react";
import { useSelector } from "react-redux";

import {
    BrowserRouter as Router,
    Switch,
    Route
} from "react-router-dom";
import MainPage from "./pages";

function App() {
    return (
        <div className="App">
            <Router>
                <Switch>
                    <Route path="/">
                        <MainPage/>
                    </Route>
                </Switch>
            </Router>
        </div>
    );
}

export default App;
