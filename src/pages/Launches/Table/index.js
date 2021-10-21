import React, { useEffect, useImperativeHandle, useState } from "react";
import { IconButton, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Table as MaterialTable } from "@mui/material";
import Board from "../Board";
import { useDispatch, useSelector } from "react-redux";
import Modal from "../Modal";
import { DataGrid } from "@mui/x-data-grid";
  
const columns = [
    {
        field: "id",
        headerName: "ID"
    },
    {
        field: "item",
        headerName: "Item"
    },
    {
        field: "registerType",
        headerName: "D/C"
    },
    {
        field: "ledgerType",
        headerName: "Conta contábil"
    },
    {
        field: "debt",
        headerName: "Débito"
    },
    {
        field: "credit",
        headerName: "Crédito"
    },
    {
        field: "actions",
        headerName: ""
    }
];

const Table = React.forwardRef((props, ref) => {

    const [boardCount, SetBoardCount] = useState(0);
    const [boardList, SetBoardList] = useState([]);

    const [modal, SetModal] = useState(false);
    const [rows, SetRows] = useState([]);

    const data = useSelector(store => store.AppReducer.data);
    const dispatch = useDispatch();

    useImperativeHandle(ref, () => ({
        OpenModal: () => {
            OpenModal();
        }
    }));

    const OpenModal = () => {
        SetModal(true);
    }

    useEffect(() => {
        let elements = [];
        for (let i = 0; i < data.length; i++) {
            elements.push(<Board
                key={data[i]?.id}
                id={data[i]?.id}
                item={data[i]?.item}
                registerType={data[i]?.registerType}
                ledgerType={data[i]?.ledgerType}
                debt={data[i]?.debt}
                credit={data[i]?.credit}
            />);
        }
        SetBoardList(...[elements]);
        // let tempRows = [];
        // for (let i = 0; i < data.length; i++) {
        //     tempRows.push({
        //         id: data[i]?.id,
        //         item: data[i]?.item,
        //         registerType: data[i]?.registerType,
        //         ledgerType: data[i]?.ledgerType,
        //         debt: data[i]?.debt,
        //         credit: data[i]?.credit,
        //         actions: <IconButton>t</IconButton>
        //     });
        // }
        // console.log(data)
        // console.log(tempRows);
        // SetRows(...[tempRows]);
    }, [data])

    return (
        <div style={{ height: "400px", width: "100%" }}>
            <Modal 
                open={modal}
                onClose={() => SetModal(false)}
            />
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
                        {boardList}
                    </TableBody>
                </MaterialTable>
            </TableContainer>
            {/* <DataGrid
                rows={rows}
                columns={columns}
            /> */}
        </div>
    );
})

export default Table;