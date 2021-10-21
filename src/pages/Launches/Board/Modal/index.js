import { Dialog, DialogActions, DialogContent, DialogTitle, FormControl, InputLabel, MenuItem, Select, TextField, Button } from "@mui/material";
import { useEffect, useState } from "react";
import { LEDGER_REFS } from "../../../../data";
import { UpdateData } from "../../../../actions/AppActions";
import { useDispatch } from "react-redux";

const Modal = props => {

    const {
        onClose = () => {},
        id,
        item = "",
        registerType = "",
        ledgerType = "",
        debt = "",
        credit = "",
        ...other
    } = props;

    const [_id, SetId] = useState(id);
    const [_item, SetItem] = useState(item);
    const [_registerType, SetRegisterType] = useState(registerType);
    const [_ledgerType, SetLedgerType] = useState(ledgerType);
    const [_debt, SetDebt] = useState(debt);
    const [_credit, SetCredit] = useState(credit);

    const dispatch = useDispatch();

    const UpdateRow = () => {
        let toUpdateData = {
            item: _item,
            registerType: _registerType,
            ledgerType: _ledgerType,
            debt: _debt,
            credit: _credit,
            id: _id
        };
        dispatch(UpdateData(toUpdateData));
        onClose();
    }

    useEffect(() => {
        // console.log(_item);
        // console.log(item)
    })

    return (
        <Dialog
            {...other}
            onBackdropClick={onClose}
            onClose={onClose}
        >
            <DialogTitle>Editando lançamento</DialogTitle>
            <DialogContent 
                className="flex fdcolumn"
                sx={{
                    minWidth: "450px"
                }}
            >
                <TextField
                    variant="filled"
                    label="Item"
                    value={_item}
                    onChange={e => SetItem(e.target.value)}
                />

                <FormControl variant="filled" sx={{ minWidth: 120 }}>
                    <InputLabel>D/C</InputLabel>
                    <Select
                        value={_registerType}
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
                        value={_ledgerType}
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
                    value={_debt}
                    label="Débito"
                    onChange={e => SetDebt(e.target.value)}
                />

                <TextField
                    variant="filled"
                    label="Crédito"
                    value={_credit}
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
                    onClick={UpdateRow}
                >
                    Confirmar
                </Button>
            </DialogActions>
        </Dialog>
    );
}

export default Modal;