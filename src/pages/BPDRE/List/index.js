import React from "react";
import Active from "./Active";
import Passive from "./Passive";

const List = props => {

    const {
        reasonList
    } = props;

    return (
        <div>
            <Active
                reasonList={reasonList}
            />
            <Passive
                reasonList={reasonList}
            />
        </div>
    );
}

export default List;