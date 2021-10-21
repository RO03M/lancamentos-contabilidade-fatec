import React, { useEffect, useState } from "react";
import Container from "../../Container";
import { UpdateResumeData } from "../../../../actions/AppActions";
import { useDispatch } from "react-redux";

const Results = props => {

    const {
        reasonList
    } = props;

    const [list, SetList] = useState({});

    const dispatch = useDispatch();

    useEffect(() => {
        let data = {
            venda: reasonList["Venda"]?.balance ?? 0,
            icmsVendas: reasonList["ICMS sobre Vendas"]?.balance ?? 0,
            cofins: reasonList["Cofins"]?.balance ?? 0,
            pis: reasonList["Pis"]?.balance ?? 0,
            vendasCaneladas: reasonList["Vendas Caneladas"]?.balance ?? 0,
            devolucaoVendas: reasonList["Devolução de Vendas"]?.balance ?? 0,
            custosMercadoriasVendidas: reasonList["Custos das Mercadorias Vendidas"]?.balance ?? 0,
            comissoesVendas: reasonList["Comissões sobre Vendas"]?.balance ?? 0,
            propagandaPublicidade: reasonList["Propaganda e Publicidade"]?.balance ?? 0,
            salariosOrdenados: reasonList["Salários e Ordenados"]?.balance ?? 0,
            aluguel: reasonList["Aluguel"]?.balance ?? 0,
            depreciacao: reasonList["Depreciação"]?.balance ?? 0,
            manutencaoReparos: reasonList["Manutenção e Reparos"]?.balance ?? 0,
            agua: reasonList["Água"]?.balance ?? 0,
            correio: reasonList["Correio"]?.balance ?? 0,
            energiaEletrica: reasonList["Energia Elétrica"]?.balance ?? 0,
            seguros: reasonList["Seguros"]?.balance ?? 0,
            telefone: reasonList["Telefone"]?.balance ?? 0,
            transportePessoal: reasonList["Transporte de Pessoal"]?.balance ?? 0,
            proLabore: reasonList["Pró-Labore"]?.balance ?? 0,
            materialEscritorio: reasonList["Material de Escritório"]?.balance ?? 0,
            refeicoesLanches: reasonList["Refeições e Lanches"]?.balance ?? 0,
            revistasPublicacoes: reasonList["Revistas e Publicações"]?.balance ?? 0,
            despesasFinanceiras: reasonList["Despesas Financeiras"]?.balance ?? 0,
            receitasFinanceiras: reasonList["Receitas Financeiras"]?.balance ?? 0,
            ganhosAlienacaoImobilizado: reasonList["Ganhos na Alienação do Imobilizado"]?.balance ?? 0,
            valorLiquidoBensBaixado: reasonList["Valor Líquido de Bens Baixado"]?.balance ?? 0,
            perdasAlienacaoImobilizado: reasonList["Perdas na Alienação do Imobilizado"]?.balance ?? 0,
            irpj: reasonList["IRPJ"]?.balance ?? 0,
            irpjAdicional: reasonList["IRPJ - Adicional"]?.balance ?? 0,
            csll: reasonList["CSLL"]?.balance ?? 0,
            lucroPrejuizoExercicio: reasonList["Lucro ou Prejuízo do Exercício"]?.balance ?? 0
        };

        Object.assign(data, {
            receitasOperacionais: data.venda,
            deducoesReceitasVendas: data.icmsVendas + data.cofins + data.pis + data.vendasCaneladas + data.devolucaoVendas,
            custosMercadorias: data.custosMercadoriasVendidas,
            despesasVendas: data.comissoesVendas + data.propagandaPublicidade,
            despesasAdmin: data.salariosOrdenados + data.aluguel + data.depreciacao + data.manutencaoReparos + data.agua + data.correio + data.energiaEletrica + data.seguros + data.telefone + data.transportePessoal + data.proLabore + data.materialEscritorio + data.refeicoesLanches + data.revistasPublicacoes,
            resultadoFinanceiroLiquido: data.despesasFinanceiras + data.receitasFinanceiras,

            receitasNaoOperacionais: data.ganhosAlienacaoImobilizado + data.valorLiquidoBensBaixado,
            despesasNaoOperacionais: data.perdasAlienacaoImobilizado + data.valorLiquidoBensBaixado,
            impostosContribuicoes: data.irpj + data.irpjAdicional + data.csll,
            resultadoExercicio: data.lucroPrejuizoExercicio
        });

        Object.assign(data, {
            receitas: data.receitasOperacionais,
            deducoes: data.deducoesReceitasVendas,
            custos: data.custosMercadorias,
            despesas: data.despesasVendas + data.despesasAdmin + data.resultadoFinanceiroLiquido,
            receitasDespesasNaoOperacionais: data.receitasNaoOperacionais + data.despesasNaoOperacionais,
            provisaoImpostosContribuicoes: data.impostosContribuicoes,
            resultado: data.resultadoExercicio
        });

        Object.assign(data, {
            demonstracaoResultadoExercicio: data.receitas + data.deducoes,
            receitaLiquida: data.custos,
            lucroBruto: data.despesas,
            resultadoOperacional: data.receitasDespesasNaoOperacionais,
            resultadoImpostoRendaContriSocial: data.provisaoImpostosContribuicoes + data.resultado
        });

        dispatch(UpdateResumeData({
            vendas: data.venda,
            custosMercadoriasVendidas: data.custosMercadoriasVendidas,
            despesas: data.despesas,
            lucroLiquido: parseFloat(data.receitas) - parseFloat(data.custo)
        }));

        SetList(...[data]);
    }, [reasonList]);

    return (
        <div>
            <Container title="DEMONSTRAÇÃO DO RESULTADO DO EXERCÍCIO" value={list.demonstracaoResultadoExercicio}>
                <Container title="RECEITAS" value={list.receitas}>
                    <Container title="RECEITAS OPERACIONAIS" value={list.receitasOperacionais}>
                        <Container title="Venda" value={list.venda}></Container>
                    </Container>
                </Container>
                <Container title="DEDUÇÕES" value={list.deducoes}>
                    <Container title="DEDUÇÕES NAS RECEITAS COM VENDAS" value={list.deducoesReceitasVendas}>
                        <Container title="ICMS sobre Vendas" value={list.icmsVendas}></Container>
                        <Container title="Cofins" value={list.cofins}></Container>
                        <Container title="Pis" value={list.pis}></Container>
                        <Container title="Vendas Caneladas" value={list.vendasCaneladas}></Container>
                        <Container title="Devolução de Vendas" value={list.devolucaoVendas}></Container>
                    </Container>
                </Container>
            </Container>
            <Container title="RECEITA LÍQUIDA" value={list.receitaLiquida}>
                <Container title="CUSTOS" value={list.custos}>
                    <Container title="CUSTOS DAS MERCADORIAS" value={list.custosMercadorias}>
                        <Container title="Custos das Mercadorias Vendidas" value={list.custosMercadoriasVendidas}></Container>
                    </Container>
                </Container>
            </Container>
            <Container title="LUCRO BRUTO" value={list.lucroBruto}>
                <Container title="DESPESAS" value={list.despesas}>
                    <Container title="DESPESAS COM VENDAS" value={list.despesasVendas}>
                        <Container title="Comissões sobre Vendas" value={list.comissoesVendas}></Container>
                        <Container title="Propaganda e Publicidade" value={list.propagandaPublicidade}></Container>
                    </Container>
                    <Container title="DESPESAS ADMINISTRATIVAS" value={list.despesasAdmin}>
                        <Container title="Salários e Ordenados" value={list.salariosOrdenados}></Container>
                        <Container title="Aluguel" value={list.aluguel}></Container>
                        <Container title="Depreciação" value={list.depreciacao}></Container>
                        <Container title="Manutenção e Reparos" value={list.manutencaoReparos}></Container>
                        <Container title="Água" value={list.agua}></Container>
                        <Container title="Correio" value={list.correio}></Container>
                        <Container title="Energia Elétrica" value={list.energiaEletrica}></Container>
                        <Container title="Seguros" value={list.seguros}></Container>
                        <Container title="Telefone" value={list.telefone}></Container>
                        <Container title="Transporte de Pessoal" value={list.transportePessoal}></Container>
                        <Container title="Pró-Labore" value={list.proLabore}></Container>
                        <Container title="Material de Escritório" value={list.materialEscritorio}></Container>
                        <Container title="Refeições e Lanches" value={list.refeicoesLanches}></Container>
                        <Container title="Revistas e Publicações" value={list.revistasPublicacoes}></Container>
                    </Container>
                    <Container title="RESULTADO FINANCEIRO LÍQUIDO" value={list.resultadoFinanceiroLiquido}>
                        <Container title="Despesas Financeiras" value={list.despesasFinanceiras}></Container>
                        <Container title="Receitas Financeiras" value={list.receitasFinanceiras}></Container>
                    </Container>
                </Container>
            </Container>
            <Container title="RESULTADO OPERACIONAL" value={list.resultadoOperacional}>
                <Container title="RECEITAS E DESPESAS NÃO OPERACIONAIS" value={list.receitasDespesasNaoOperacionais}>
                    <Container title="RECEITAS NÃO OPERACIONAIS" value={list.receitasNaoOperacionais}>
                        <Container title="Ganhos na Alienação do Imobilizado" value={list.ganhosAlienacaoImobilizado}></Container>
                        <Container title="Valor Líquido de Bens Baixado" value={list.valorLiquidoBensBaixado}></Container>
                    </Container>
                    <Container title="DESPESAS NÃO OPERACIONAIS" value={list.despesasNaoOperacionais}>
                        <Container title="Perdas na Alienação do Imobilizado" value={list.perdasAlienacaoImobilizado}></Container>
                        <Container title="Valor Líquido de Bens Baixado" value={list.valorLiquidoBensBaixado}></Container>
                    </Container>
                </Container>
            </Container>
            <Container title="RESULTADO ANTES DO IMPOSTO DE RENDA E CONTRIBUIÇÃO SOCIAL" value={list.resultadoImpostoRendaContriSocial}>
                <Container title="PROVISÃO PARA IMPOSTOS E CONTRIBUIÇÕES" value={list.provisaoImpostosContribuicoes}>
                    <Container title="IMPOSTOS E CONTRIBUIÇÕES" value={list.impostosContribuicoes}>
                        <Container title="IRPJ" value={list.irpj}></Container>
                        <Container title="IRPJ - Adicional" value={list.irpjAdicional}></Container>
                        <Container title="CSLL" value={list.csll}></Container>
                    </Container>
                </Container>
                <Container title="RESULTADO" value={list.resultado}>
                    <Container title="RESULTADO DO EXERCÍCIO" value={list.resultadoExercicio}>
                        <Container title="Lucro ou Prejuízo do Exercício" value={list.lucroPrejuizoExercicio}></Container>
                    </Container>
                </Container>
            </Container>
        </div>
    );
}

export default Results;