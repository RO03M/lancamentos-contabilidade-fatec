import React, { useState } from "react";
import Table from "./Table";

const Launches = React.forwardRef((props, ref) => {

    return (
        <div className="launches">
            <Table
                ref={ref}
            />
        </div>
    );
})

export default Launches;