import React, { useEffect, useRef, useState } from "react";
import { FormControl, IconButton, InputLabel, MenuItem, Select, TableCell, TableRow, TextField } from "@mui/material";
import { LEDGER_REFS } from "../../../data";
import { UpdateData, DeleteData } from "../../../actions/AppActions";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import DeleteIcon from '@mui/icons-material/Delete';

const Board = props => {

    const {
        id,
        onChange
    } = props;

    const [item, SetItem] = useState("");
    const [registerType, SetRegisterType] = useState("");
    const [ledgerType, SetLedgerType] = useState("");
    const [debt, SeTableCellebt] = useState("");
    const [credit, SetCredit] = useState("");

    const INITIAL_RENDER_FLAG = useRef(true);

    const dispatch = useDispatch();
    const location = useLocation();

    const currentTab = useRef(new URLSearchParams(location.search).get("tab"));

    useEffect(() => {
        if (INITIAL_RENDER_FLAG.current) {
            INITIAL_RENDER_FLAG.current = false;
            return;
        }

        if (currentTab.current == 0 && ledgerType && (debt || credit)) {
            let data = {
                item: item,
                registerType: registerType,
                ledgerType: ledgerType,
                debt: debt,
                credit: credit,
                id: id
            };
            dispatch(UpdateData(data));
        }

        currentTab.current = new URLSearchParams(location.search).get("tab");
    }, [location]);//item, registerType, ledgerType, debt, credit

    return (
        <TableRow>
            <TableCell>
                <TextField
                    variant="filled"
                    label="Item"
                    value={item}
                    onChange={e => SetItem(e.target.value)}
                />
            </TableCell>
            <TableCell>
                <FormControl variant="filled" sx={{ minWidth: 120 }}>
                    <InputLabel>D/C</InputLabel>
                    <Select
                        value={registerType}
                        onChange={e => SetRegisterType(e.target.value)}
                    >
                        <MenuItem value="">Nenhum</MenuItem>
                        <MenuItem value="D">D</MenuItem>
                        <MenuItem value="C">C</MenuItem>
                    </Select>
                </FormControl>
            </TableCell>
            <TableCell>
                <FormControl variant="filled" sx={{ minWidth: 240 }}>
                    <InputLabel>Conta Contábil</InputLabel>
                    <Select
                        value={ledgerType}
                        onChange={e => SetLedgerType(e.target.value)}
                    >
                        <MenuItem>Nenhum</MenuItem>
                        {LEDGER_REFS.map((value, index) => (
                            <MenuItem 
                                key={index}
                                id={`ledger-ref-${index}`}
                                value={value}
                            >{value}</MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </TableCell>
            <TableCell>
                <TextField
                    variant="filled"
                    value={debt}
                    label="Débito"
                    onChange={e => SeTableCellebt(e.target.value)}
                />
            </TableCell>
            <TableCell>
                <TextField
                    variant="filled"
                    label="Crédito"
                    value={credit}
                    onChange={e => SetCredit(e.target.value)}
                />
            </TableCell>
            <TableCell style={{verticalAlign: "middle"}}>
                <IconButton onClick={() => dispatch(DeleteData(id))}>
                    <DeleteIcon/>    
                </IconButton>
            </TableCell>
        </TableRow>
    );
}

export default Board;