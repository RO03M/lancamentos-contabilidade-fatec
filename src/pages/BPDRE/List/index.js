import React from "react";
import { Paper } from "@mui/material";
import Active from "./Active";
import Passive from "./Passive";
import Results from "./Results";

const List = props => {

    const {
        reasonList
    } = props;

    return (
        <Paper
            style={{
                margin: "10px 5%",
                padding: "10px 25px"
            }}
            elevation={4}
        >
            <Active
                reasonList={reasonList}
            />
            <Passive
                reasonList={reasonList}
            />
            <Results
                reasonList={reasonList}
            />
        </Paper>
    );
}

export default List;