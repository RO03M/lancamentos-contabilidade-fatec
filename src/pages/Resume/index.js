import { useEffect } from "react";
import { Paper } from "@mui/material";
import { useSelector } from "react-redux";

const Resume = () => {

    const resumeData = useSelector(store => store.AppReducer.resumeData);

    useEffect(() => console.log(resumeData));

    return (
        <Paper>

        </Paper>
    );
}

export default Resume;