import { Dialog, DialogActions, DialogContent, DialogTitle, FormControl, InputLabel, MenuItem, Select, TextField, Button } from "@mui/material";
import { useState, useEffect } from "react";
import { LEDGER_REFS } from "../../../data";
import { AddData } from "../../../actions/AppActions";
import { useDispatch, useSelector } from "react-redux";

const Modal = props => {

    const {
        onClose = () => {},
        ...other
    } = props;

    const [item, SetItem] = useState("");
    const [registerType, SetRegisterType] = useState("");
    const [ledgerType, SetLedgerType] = useState("");
    const [debt, SetDebt] = useState("");
    const [credit, SetCredit] = useState("");
    const [boardCount, SetBoardCount] = useState(0);

    const data = useSelector(store => store.AppReducer.data);

    const dispatch = useDispatch();

    const AddRow = (e) => {
        e && e.preventDefault();
        let toAddData = {
            item: item,
            registerType: registerType,
            ledgerType: ledgerType,
            debt: debt,
            credit: credit,
            id: boardCount
        };
        dispatch(AddData(toAddData));
        SetBoardCount(boardCount + 1);
        onClose();
        ClearStates();
    }

    const ClearStates = () => {
        SetItem("");
        SetRegisterType("");
        SetLedgerType("");
        SetDebt("");
        SetCredit("");
    }

    useEffect(() => {
        let lastId = data.sort((a, b) => {
            if (a?.id < b?.id) return -1;
            else if (a?.id > b?.id) return 1;
            return 0;
        })[data.length - 1]?.id || 0;//Get last id to don't generate already created ids
        SetBoardCount(lastId + 1);
    }, []);

    return (
        <Dialog
            {...other}
            onBackdropClick={onClose}
            onClose={onClose}
            fullWidth
        >
            <form onSubmit={AddRow}>
                <DialogTitle>Adicionar lançamento</DialogTitle>
                <DialogContent className="flex fdcolumn">
                    <TextField
                        variant="filled"
                        label="Item"
                        value={item}
                        onChange={e => SetItem(e.target.value)}
                    />

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

                    <TextField
                        variant="filled"
                        value={debt}
                        label="Débito"
                        onChange={e => SetDebt(e.target.value)}
                    />

                    <TextField
                        variant="filled"
                        label="Crédito"
                        value={credit}
                        onChange={e => SetCredit(e.target.value)}
                    />
                </DialogContent>
                <DialogActions>
                    <Button 
                        variant="contained" 
                        color="error"
                        onClick={onClose}
                    >
                        Cancelar
                    </Button>
                    <Button 
                        variant="contained" 
                        color="primary"
                        type="submit"
                    >
                        Confirmar
                    </Button>
                </DialogActions>
            </form>
        </Dialog>
    );
}

export default Modal;