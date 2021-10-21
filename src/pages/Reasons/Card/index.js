import React, { useState } from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Card as MaterialCard, Typography, Collapse, CardActions, IconButton } from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';

import "./index.css";

const Card = props => {

    const {
        title,
        debts = [],
        credits = [],
        item
    } = props;

    const [expanded, SetExpanded] = useState(false);

    return (
        <MaterialCard 
            raised
            style={{
                padding: "5px"
            }}
        >
            <Typography align="center" variant="button" component="div" style={{ fontSize: "20px", fontWeight: 700, padding: "5px" }}>{title}</Typography>
            <CardActions style={{ display: "flex", justifyContent: "flex-end" }}>
                <IconButton onClick={() => SetExpanded(!expanded)}>
                    {expanded ? <ExpandLessIcon/> : <ExpandMoreIcon/>}
                </IconButton>
            </CardActions>
            <Collapse in={expanded} timeout="auto">
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
            </Collapse>
        </MaterialCard>
    );
}

export default Card;