import { useEffect } from "react";
import { Paper, Card, CardContent, Typography } from "@mui/material";
import { useSelector } from "react-redux";

import styles from "./index.module.css";

const Resume = () => {

    const resumeData = useSelector(store => store.AppReducer.resumeData);

    return (
        <Paper className={styles.container}>
            <Card elevation={4}>
                <CardContent>
                    <Typography>Valor do ativo: {resumeData?.ativo}</Typography>
                    <Typography>Valor do ativo circulante: {resumeData?.ativoCirculante}</Typography>
                    <Typography>Valor do ativo imobilizado: {resumeData?.ativoImobilizado}</Typography>
                    <Typography>Valor do passivo: {resumeData?.passivo}</Typography>
                    <Typography>Valor do passivo circulante: {resumeData?.passivoCirculante}</Typography>
                    <Typography>Valor do patrimônio líquido: {resumeData?.patrimonioLiquido}</Typography>
                    <Typography>Valor das vendas: {resumeData?.vendas}</Typography>
                    <Typography>Valor dos custos das mercadorias vendidas: {resumeData?.custosMercadoriasVendidas}</Typography>
                    <Typography>Valor das despesas: {resumeData?.despesas}</Typography>
                    <Typography>Valor do lucro líquido: {resumeData?.lucroLiquido}</Typography>
                </CardContent>
            </Card>
        </Paper>
    );
}

export default Resume;