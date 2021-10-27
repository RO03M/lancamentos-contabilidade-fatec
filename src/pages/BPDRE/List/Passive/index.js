import React, { useEffect, useState } from "react";
import Container from "../../Container";
import { UpdateResumeData } from "../../../../actions/AppActions";
import { useDispatch } from "react-redux";

const Passive = props => {

    const {
        reasonList
    } = props;

    const [list, SetList] = useState({});

    const dispatch = useDispatch();

    useEffect(() => {
        const venda = Math.abs(reasonList["Venda"]?.balance ?? 0) + Math.abs(reasonList["Venda de Mercadoria"]?.balance ?? 0);
        //Deduções
        const vendasCaneladas = reasonList["Vendas Caneladas"]?.balance ?? 0;
        const icmsVendas = reasonList["ICMS sobre Vendas"]?.balance ?? 0;
        const cofins = reasonList["Cofins"]?.balance ?? 0;
        const pis = reasonList["Pis"]?.balance ?? 0;
        const devolucaoVendas = reasonList["Devolução de Vendas"]?.balance ?? 0;
        const deducoes = icmsVendas + cofins + pis + vendasCaneladas + devolucaoVendas;
        //Fim deduções
        //Despesas
        const comissoesVendas = reasonList["Comissões sobre Vendas"]?.balance ?? 0;
        const propagandaPublicidade = reasonList["Propaganda e Publicidade"]?.balance ?? 0;
        const salariosOrdenados = reasonList["Salários e Ordenados"]?.balance ?? 0;
        const aluguel = reasonList["Aluguel"]?.balance ?? 0;
        const depreciacao = reasonList["Depreciação"]?.balance ?? 0;
        const manutencaoReparos = reasonList["Manutenção e Reparos"]?.balance ?? 0;
        const agua = reasonList["Água"]?.balance ?? 0;
        const correio = reasonList["Correio"]?.balance ?? 0;
        const energiaEletrica = reasonList["Energia Elétrica"]?.balance ?? 0;
        const seguros = reasonList["Seguros"]?.balance ?? 0;
        const telefone = reasonList["Telefone"]?.balance ?? 0;
        const transportePessoal = reasonList["Transporte de Pessoal"]?.balance ?? 0;
        const proLabore = reasonList["Pró-Labore"]?.balance ?? 0;
        const materialEscritorio = reasonList["Material de Escritório"]?.balance ?? 0;
        const refeicoesLanches = reasonList["Refeições e Lanches"]?.balance ?? 0;
        const revistasPublicacoes = reasonList["Revistas e Publicações"]?.balance ?? 0;

        const despesasVendas = comissoesVendas + propagandaPublicidade;
        const despesasAdmin = salariosOrdenados + aluguel + depreciacao + manutencaoReparos + agua + correio + energiaEletrica + seguros + telefone + transportePessoal + proLabore + materialEscritorio + refeicoesLanches + revistasPublicacoes;
        const resultadoFinanceiroLiquido = (reasonList["Despesas Financeiras"]?.balance ?? 0) + (reasonList["Receitas Financeiras"]?.balance ?? 0);
        //Fim despesas

        const receitaLiquida = venda - deducoes;
        const lucroBruto = Math.abs(receitaLiquida - (reasonList["Custos das Mercadorias Vendidas"]?.balance ?? 0)); 
        const resultadoOperacional = Math.abs(lucroBruto - (despesasVendas + despesasAdmin + resultadoFinanceiroLiquido));
        const resultadoAntesImposto = Math.abs(resultadoOperacional - ((reasonList["Ganhos na Alienação do Imobilizado"]?.balance ?? 0) + (reasonList["Valor Líquido de Bens Baixado"]?.balance ?? 0)));
        const lucroPrejuizoExercicio = Math.abs(resultadoAntesImposto - (reasonList["IRPJ"]?.balance ?? 0) + (reasonList["IRPJ - Adicional"]?.balance ?? 0) + (reasonList["CSLL"]?.balance ?? 0));

        let data = {
            salPagar: reasonList["Salários à Pagar"]?.balance ?? 0,
            fornecedores: Math.abs(reasonList["Fornecedores"]?.balance ?? 0),
            bancosMovimento: reasonList["Bancos conta Movimento"]?.balance ?? 0,
            emprestimosBancarios: reasonList["Empréstimos Bancários"]?.balance ?? 0,
            assinaturasAnuidade: reasonList["Assinaturas e Anuidades a Pagar"]?.balance ?? 0,
            segurosPagar: reasonList["Seguros à Pagar"]?.balance ?? 0,
            capitalSocial: Math.abs(reasonList["Capital Social"]?.balance ?? 0),
            reservasCapital: reasonList["Reservas de Capital"]?.balance ?? 0,
            reservasReavaliacao: reasonList["Reservas de Reavaliação"]?.balance ?? 0,
            reservasLucro: reasonList["Reservas de Lucro"]?.balance ?? 0,
            lucroPrejuizoAcumulado: reasonList["Lucro ou Prejuízo Acumulado"]?.balance ?? 0,
            lucroPrejuizoExercicio: lucroPrejuizoExercicio
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

        Object.assign(data, {
            passive: data.circulante + data.naoCirculante + data.patrimonioLiquido
        });

        dispatch(UpdateResumeData({
            passivo: data.passive,
            passivoCirculante: data.circulante,
            patrimonioLiquido: data.patrimonioLiquido
        }));

        SetList(...[data]);
    }, [reasonList]);

    return (
        <Container title="PASSIVO" value={list.passive}>
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