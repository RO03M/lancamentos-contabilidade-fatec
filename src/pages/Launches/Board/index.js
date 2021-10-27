import React, { useEffect, useRef, useState } from "react";
import { FormControl, IconButton, InputLabel, MenuItem, Select, TableCell, TableRow, TextField } from "@mui/material";
import { DeleteData } from "../../../actions/AppActions";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import Modal from "./Modal";

const Board = props => {

    const {
        id,
        item,
        registerType,
        ledgerType,
        debt,
        credit,
        onChange
    } = props;

    const [modal, SetModal] = useState(false);

    const dispatch = useDispatch();
    
    return (
        <TableRow id={id}>
            <TableCell>{item}</TableCell>
            <TableCell>{registerType}</TableCell>
            <TableCell>{ledgerType}</TableCell>
            <TableCell>{debt}</TableCell>
            <TableCell>{credit}</TableCell>
            <TableCell style={{verticalAlign: "middle"}}>
                <Modal
                    open={modal}
                    onClose={() => SetModal(false)}
                    id={id}
                    item={item}
                    registerType={registerType}
                    ledgerType={ledgerType}
                    debt={debt}
                    credit={credit}
                />
                <IconButton 
                    color="info"
                    onClick={() => SetModal(true)}
                >
                    <EditIcon/>    
                </IconButton>
                <IconButton 
                    color="error"
                    onClick={() => dispatch(DeleteData(id))}
                >
                    <DeleteIcon/>
                </IconButton>
            </TableCell>
        </TableRow>
    );
}

export default Board;