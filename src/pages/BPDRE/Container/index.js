import { Tooltip, Typography } from "@mui/material";
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
            <div className="bpdre-row jcsb">
                <Typography
                    style={{
                        fontWeight: children.length == 0 ? 0 : 700,
                        fontSize: children.length == 0 ? "14px" : "18px"
                    }}
                    variant="button"
                >
                    {title}
                </Typography>
                <Tooltip
                    title={`Valor de ${title}`}
                    placement="left"
                    arrow
                >
                    <div className="bpdre-value text-center">
                        {value}
                    </div>
                </Tooltip>
            </div>
            <div className="bpdre-children">
                {children}
            </div>
        </div>
    );
}

export default Container;