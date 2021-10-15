import React, { useEffect, useState } from "react";

import "./index.css";

const Container = props => {

    const {
        title,
        children = [],
        value,
        ...other
    } = props;

    return (
        <div 
            className="bpdre-group"
        >
            <div className="bpdre-row">
                <div
                    style={{
                        fontWeight: children.length == 0 ? 0 : 700
                    }}
                >{title}</div>
                <div>
                    {value}
                </div>
            </div>
            <div className="bpdre-children">
                {children}
            </div>
        </div>
    );
}

export default Container;