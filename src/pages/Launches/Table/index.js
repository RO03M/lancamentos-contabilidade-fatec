import React, { useEffect, useState } from "react";
import { Button } from "@mui/material";
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
            <div className="table-responsive">
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>Item</th>
                            <th>D/C</th>
                            <th>Conta contábil</th>
                            <th>Débito</th>
                            <th>Crédito</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
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
                    </tbody>
                </table>
            </div>
            <Button
                onClick={AddRow}
            >Adicionar Linha</Button>
        </div>
    );
}

export default Table;