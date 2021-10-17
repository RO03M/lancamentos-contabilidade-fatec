import React from "react";
import Active from "./Active";
import Passive from "./Passive";
import Results from "./Results";

const List = props => {

    const {
        reasonList
    } = props;

    return (
        <div
            style={{
                padding: "10px"
            }}
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
        </div>
    );
}

export default List;