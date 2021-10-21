import { Dialog, DialogActions, DialogContent, DialogTitle, FormControl, InputLabel, MenuItem, Select, TextField, Button } from "@mui/material";
import { useState } from "react";
import { LEDGER_REFS } from "../../../data";
import { AddData } from "../../../actions/AppActions";
import { useDispatch } from "react-redux";

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

    const dispatch = useDispatch();

    const AddRow = () => {
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
    }

    return (
        <Dialog
            {...other}
            onBackdropClick={onClose}
            onClose={onClose}
        >
            <DialogTitle>Adicionar lançamento</DialogTitle>
            <DialogContent 
                className="flex fdcolumn"
                sx={{
                    minWidth: "450px"
                }}
            >
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
                    onClick={AddRow}
                >
                    Confirmar
                </Button>
            </DialogActions>
        </Dialog>
    );
}

export default Modal;