import React, { useEffect, useRef, useState } from "react";
import { FormControl, IconButton, InputLabel, MenuItem, Select, TextField } from "@mui/material";
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
    const [debt, SetDebt] = useState("");
    const [credit, SetCredit] = useState("");

    const INITIAL_RENDER_FLAG = useRef(true);

    const dispatch = useDispatch();
    const location = useLocation();

    useEffect(() => {
        if (INITIAL_RENDER_FLAG.current) {
            INITIAL_RENDER_FLAG.current = false;
            return;
        }
        let data = {
            item: item,
            registerType: registerType,
            ledgerType: ledgerType,
            debt: debt,
            credit: credit,
            id: id
        };
        dispatch(UpdateData(data));
    }, [location]);//item, registerType, ledgerType, debt, credit

    return (
        <tr>
            <td>
                <TextField
                    variant="filled"
                    label="Item"
                    value={item}
                    onChange={e => SetItem(e.target.value)}
                />
            </td>
            <td>
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
            </td>
            <td>
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
            </td>
            <td>
                <TextField
                    variant="filled"
                    value={debt}
                    label="Débito"
                    onChange={e => SetDebt(e.target.value)}
                />
            </td>
            <td>
                <TextField
                    variant="filled"
                    label="Crédito"
                    value={credit}
                    onChange={e => SetCredit(e.target.value)}
                />
            </td>
            <td style={{verticalAlign: "middle"}}>
                <IconButton onClick={() => dispatch(DeleteData(id))}>
                    <DeleteIcon/>    
                </IconButton>
            </td>
        </tr>
    );
}

export default Board;