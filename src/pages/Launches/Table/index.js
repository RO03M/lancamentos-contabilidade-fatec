import React, { useEffect, useState } from "react";
import { Button, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Table as MaterialTable } from "@mui/material";
import Board from "../Board";
import { useDispatch, useSelector } from "react-redux";
import { AddData } from "../../../actions/AppActions";

const Table = props => {

    const [boardCount, SetBoardCount] = useState(0);

    const data = useSelector(store => store.AppReducer.data);
    const dispatch = useDispatch();

    const AddRow = () => {
        let toAddData = {
            item: "",
            registerType: "",
            ledgerType: "",
            debt: "",
            credit: "",
            id: boardCount
        };
        dispatch(AddData(toAddData));
        SetBoardCount(boardCount + 1);
    }

    useEffect(() => console.log(data), [data])

    return (
        <div>
            <TableContainer component={Paper}>
                <MaterialTable>
                    <TableHead>
                        <TableRow>
                            <TableCell>Item</TableCell>
                            <TableCell>D/C</TableCell>
                            <TableCell>Conta contábil</TableCell>
                            <TableCell>Débito</TableCell>
                            <TableCell>Crédito</TableCell>
                            <TableCell></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {(() => {
                            let elements = [];
                            for (let i = 0; i < data.length; i++) {
                                elements.push(<Board
                                    key={i}
                                    id={i}
                                />);
                            }
                            return elements;
                        })()}
                    </TableBody>
                </MaterialTable>
            </TableContainer>
            <Button
                onClick={AddRow}
            >Adicionar Linha</Button>
        </div>
    );
}

export default Table;