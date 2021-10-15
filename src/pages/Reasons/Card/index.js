import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import React from "react";

import "./index.css";

const Card = props => {

    const {
        title,
        debts = [],
        credits = [],
        item
    } = props;

    return (
        <div className="reason-card">
            <h2 className="text-center">{title}</h2>
            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell></TableCell>
                            <TableCell>Débito</TableCell>
                            <TableCell>Crédito</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {debts?.map((value, index) => (
                            <TableRow key={index}>
                                <TableCell></TableCell>
                                <TableCell>{value}</TableCell>
                                <TableCell></TableCell>
                            </TableRow>
                        ))}
                        {credits?.map((value, index) => (
                            <TableRow key={index}>
                                <TableCell></TableCell>
                                <TableCell></TableCell>
                                <TableCell>{value}</TableCell>
                            </TableRow>
                        ))}
                        <TableRow>
                            <TableCell>Soma</TableCell>
                            <TableCell>{(() => {
                                let sum = 0;
                                for (let i = 0; i < debts.length; i++) sum += debts[i];
                                return sum;
                            })()}</TableCell>
                            <TableCell>{(() => {
                                let sum = 0;
                                for (let i = 0; i < credits.length; i++) sum += credits[i];
                                return sum;
                            })()}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>Saldo</TableCell>
                            <TableCell className="text-primary">{(() => {
                                let sum = 0;
                                for (let i = 0; i < debts.length; i++) sum += debts[i];
                                for (let i = 0; i < credits.length; i++) sum -= credits[i];
                                return sum >= 0 && sum;
                            })()}</TableCell>
                            <TableCell className="text-danger">{(() => {
                                let sum = 0;
                                for (let i = 0; i < debts.length; i++) sum += debts[i];
                                for (let i = 0; i < credits.length; i++) sum -= credits[i];
                                return sum < 0 && sum;
                            })()}</TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
}

export default Card;