import React, { useState } from "react";
import Table from "./Table";
import TextToList from "./TextToList";

const Launches = React.forwardRef((props, ref) => {

    return (
        <div className="launches">
            <TextToList/>
            <Table
                ref={ref}
            />
        </div>
    );
})

export default Launches;