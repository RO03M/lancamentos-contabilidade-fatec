import React, { useEffect, useState } from "react";
import Container from "../../Container";

const Passive = props => {

    const {
        reasonList
    } = props;

    const [list, SetList] = useState({});

    useEffect(() => {
        let data = {
            salPagar: reasonList["Salários à Pagar"]?.balance ?? 0,
            fornecedores: reasonList["Fornecedores"]?.balance ?? 0,
            bancosMovimento: reasonList["Bancos conta Movimento"]?.balance ?? 0,
            emprestimosBancarios: reasonList["Empréstimos Bancários"]?.balance ?? 0,
            assinaturasAnuidade: reasonList["Assinaturas e Anuidades a Pagar"]?.balance ?? 0,
            segurosPagar: reasonList["Seguros à Pagar"]?.balance ?? 0,
            capitalSocial: reasonList["Capital Social"]?.balance ?? 0,
            reservasCapital: reasonList["Reservas de Capital"]?.balance ?? 0,
            reservasReavaliacao: reasonList["Reservas de Reavaliação"]?.balance ?? 0,
            reservasLucro: reasonList["Reservas de Lucro"]?.balance ?? 0,
            lucroPrejuizoAcumulado: reasonList["Lucro ou Prejuízo Acumulado"]?.balance ?? 0,
            lucroPrejuizoExercicio: reasonList["Lucro ou Prejuízo do Exercício"]?.balance ?? 0,
        };

        Object.assign(data, {
            obrigacoes: data.salPagar + data.fornecedores + data.bancosMovimento + data.emprestimosBancarios + data.assinaturasAnuidade + data.segurosPagar,
            obrigacoesLongoPrazo: data.emprestimosBancarios,
            capital: data.capitalSocial,
            reservas: data.reservasCapital + data.reservasLucro + data.reservasReavaliacao,
            lucroPrejuizo: data.lucroPrejuizoAcumulado + data.lucroPrejuizoExercicio
        });

        Object.assign(data, {
            circulante: data.obrigacoes,
            naoCirculante: data.obrigacoesLongoPrazo,
            patrimonioLiquido: data.capital + data.reservas + data.lucroPrejuizo
        });

        SetList(...[data]);
    }, [reasonList]);

    return (
        <Container title="PASSIVO">
            <Container title="CIRCULANTE" value={list.circulante}>
                <Container title="OBRIGAÇÕES" value={list.obrigacoes}>
                    <Container title="Salários à Pagar" value={list.salPagar}></Container>
                    <Container title="Fornecedores" value={list.fornecedores}></Container>
                    <Container title="Bancos conta Movimento" value={list.bancosMovimento}></Container>
                    <Container title="Empréstimos Bancários" value={list.emprestimosBancarios}></Container>
                    <Container title="Assinaturas e Anuidades a Pagar" value={list.assinaturasAnuidade}></Container>
                    <Container title="Seguros à Pagar" value={list.segurosPagar}></Container>
                </Container>
            </Container>
            <Container title="NÃO CIRCULANTE" value={list.naoCirculante}>
                <Container title="OBRIGAÇÕES DE LONGO PRAZO" value={list.obrigacoesLongoPrazo}>
                    <Container title="Empréstimos Bancários" value={list.emprestimosBancarios}/>
                </Container>
            </Container>
            <Container title="PATRIMÔNIO LÍQUIDO" value={list.patrimonioLiquido}>
                <Container title="CAPITAL" value={list.capital}>
                    <Container title="Capital Social" value={list.capitalSocial}/>
                </Container>
                <Container title="RESERVAS" value={list.reservas}>
                    <Container title="Reservas de Capital" value={list.reservasCapital}/>
                    <Container title="Reservas de Reavaliação" value={list.reservasReavaliacao}/>
                    <Container title="Reservas de Lucro" value={list.reservasLucro}/>
                </Container>
                <Container title="LUCRO OU PREJUÍZO" value={list.lucroPrejuizo}>
                    <Container title="Lucro ou Prejuízo Acumulado" value={list.lucroPrejuizoAcumulado}/>
                    <Container title="Lucro ou Prejuízo do Exercício" value={list.lucroPrejuizoExercicio}/>
                </Container>
            </Container>
        </Container>
    );
}

export default Passive;