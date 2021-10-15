import React, { useEffect, useState } from "react";
import Container from "../../Container";
import { LEDGER_REFS, BPDRE_OBJ } from "../../../../data";

const Active = props => {

    const {
        reasonList
    } = props;

    const [list, SetList] = useState({});

    useEffect(() => {
        let data = {
            caixa: reasonList["Caixa"] ? reasonList["Caixa"]?.balance : 0,
            bancos: reasonList["Bancos"] ? reasonList["Bancos"]?.balance : 0,
            clientes: reasonList["Clientes"] ? reasonList["Clientes"]?.balance : 0,
            poupanca: reasonList["Poupança"] ? reasonList["Poupança"]?.balance : 0,
            adiantamentosFuncionarios: reasonList["Adiantamentos a Funcionários"] ? reasonList["Adiantamentos a Funcionários"]?.balance : 0,
            adiantamentosFornecedor: reasonList["Adiantamentos a Fornecedor"]?.balance ?? 0,
            mercadoriaRevenda: reasonList["Mercadoria pra Revenda"]?.balance ?? 0,
            segurosVencer: reasonList["Seguros à Vencer"]?.balance ?? 0,
            assinaturasRevistas: reasonList["Assinaturas de Revistas"]?.balance ?? 0,
            titulosReceber: reasonList["Títulos à Receber"]?.balance ?? 0,
            clientesLP: reasonList["Clientes (LP)"]?.balance ?? 0,
            participacaoFundoInvestimentos: reasonList["Participação em Fundos de Investimentos"]?.balance ?? 0,
            computadoresPerifericos: reasonList["Computadores e Periféricos"]?.balance ?? 0,
            equipamentosTelefonicos: reasonList["Equipamentos Telefônicos"]?.balance ?? 0,
            maquinasEquipamentos: reasonList["Máquinas e Equipamentos"]?.balance ?? 0,
            moveisUtensilios: reasonList["Móveis e Utensílios"]?.balance ?? 0,
            predios: reasonList["Prédios"]?.balance ?? 0,
            prediosConstrucao: reasonList["Prédios em Construção"]?.balance ?? 0,
            terrenos: reasonList["Terrenos"]?.balance ?? 0,
            veiculos: reasonList["Veículos"]?.balance ?? 0,
            depreciacaoAcumulada: reasonList["Depreciação Acumulada"]?.balance ?? 0,
            pesquisaDevProdutos: reasonList["Pesquisa e Desenvolvimento de Produtos"]?.balance ?? 0,
        };

        Object.assign(data, {
            disponivel: data.caixa + data.bancos,
            creditos: data.clientes + data.poupanca + data.adiantamentosFuncionarios + data.adiantamentosFornecedor,
            estoques: data.mercadoriaRevenda,
            despesasAntecipadas: data.segurosVencer + data.assinaturasRevistas,
            outrosValBens: data.titulosReceber,
            realizavelLongoPrazo: data.clientesLP,
            investimentos: data.participacaoFundoInvestimentos,
            imobilizado: data.computadoresPerifericos + data.equipamentosTelefonicos + data.maquinasEquipamentos + data.moveisUtensilios + data.predios + data.prediosConstrucao + data.terrenos + data.veiculos + data.depreciacaoAcumulada,
            intangivel: data.pesquisaDevProdutos
        });

        Object.assign(data, {
            circulante: data.disponivel + data.creditos + data.estoques + data.despesasAntecipadas + data.outrosValBens,
            naoCirculantes: data.realizavelLongoPrazo + data.investimentos + data.imobilizado + data.intangivel
        });

        SetList(...[data]);
    }, [reasonList]);

    return (
        <Container title="ATIVO">
            <Container title="CIRCULANTE" value={list.circulante}>
                <Container title="DISPONÍVEL" value={list.disponivel}>
                    <Container title="Caixa" value={list.caixa}></Container>
                    <Container title="Bancos" value={list.bancos}></Container>
                </Container>
                <Container title="CRÉDITOS" value={list.creditos}>
                    <Container title="Clientes" value={list.clientes}></Container>
                    <Container title="Poupança" value={list.poupanca}></Container>
                    <Container title="Adiantamentos a Funcionários" value={list.adiantamentosFuncionarios}></Container>
                    <Container title="Adiantamentos a Fornecedor" value={list.adiantamentosFornecedor}></Container>
                </Container>
                <Container title="ESTOQUES" value={list.estoques}>
                    <Container title="Mercadoria pra Revenda" value={list.mercadoriaRevenda}></Container>
                </Container>
                <Container title="DESPESAS ANTECIPADAS" value={list.despesasAntecipadas}>
                    <Container title="Seguros à Vencer" value={list.segurosVencer}></Container>
                    <Container title="Assinaturas de Revistas" value={list.assinaturasRevistas}></Container>
                </Container>
                <Container title="OUTROS VALORES E BENS" value={list.outrosValBens}>
                    <Container title="Títulos à Receber" value={list.titulosReceber}></Container>
                </Container>
            </Container>
            <Container title="NÃO CIRCULANTE" value={list.naoCirculantes}>
                <Container title="REALIZÁVEL À LONGO PRAZO" value={list.realizavelLongoPrazo}>
                    <Container title="Clientes (LP)" value={list.clientesLP}></Container>
                </Container>
                <Container title="INVESTIMENTOS" value={list.investimentos}>
                    <Container title="Participação em Fundos de Investimentos" value={list.participacaoFundoInvestimentos}></Container>
                </Container>
                <Container title="IMOBILIZADO" value={list.imobilizado}>
                    <Container title="Computadores e Periféricos" value={list.computadoresPerifericos}></Container>
                    <Container title="Equipamentos Telefônicos" value={list.equipamentosTelefonicos}></Container>
                    <Container title="Máquinas e Equipamentos" value={list.maquinasEquipamentos}></Container>
                    <Container title="Móveis e Utensílios" value={list.moveisUtensilios}></Container>
                    <Container title="Prédios" value={list.predios}></Container>
                    <Container title="Prédios em Construção" value={list.prediosConstrucao}></Container>
                    <Container title="Terrenos" value={list.terrenos}></Container>
                    <Container title="Veículos" value={list.veiculos}></Container>
                    <Container title="Depreciação Acumulada" value={list.depreciacaoAcumulada}></Container>
                </Container>
                <Container title="INTANGÍVEL" value={list.intangivel}>
                    <Container title="Pesquisa e Desenvolvimento de Produtos" value={list.pesquisaDevProdutos}></Container>
                </Container>
            </Container>
        </Container>
    );
}

export default Active;