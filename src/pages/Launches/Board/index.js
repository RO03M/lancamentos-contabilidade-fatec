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

    // const [item, SetItem] = useState("");
    // const [registerType, SetRegisterType] = useState("");
    // const [ledgerType, SetLedgerType] = useState("");
    // const [debt, SetDebt] = useState("");
    // const [credit, SetCredit] = useState("");
    const [modal, SetModal] = useState(false);

    // const INITIAL_RENDER_FLAG = useRef(true);

    const dispatch = useDispatch();
    // const location = useLocation();

    // const currentTab = useRef(new URLSearchParams(location.search).get("tab"));

    // useEffect(() => {
    //     if (INITIAL_RENDER_FLAG.current) {
    //         INITIAL_RENDER_FLAG.current = false;
    //         return;
    //     }

    //     if (currentTab.current == 0 && ledgerType && (debt || credit)) {
    //         let data = {
    //             item: item,
    //             registerType: registerType,
    //             ledgerType: ledgerType,
    //             debt: debt,
    //             credit: credit,
    //             id: id
    //         };
    //         dispatch(UpdateData(data));
    //     }

    //     currentTab.current = new URLSearchParams(location.search).get("tab");
    // }, [location]);

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