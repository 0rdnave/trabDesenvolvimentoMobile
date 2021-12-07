import React, { useEffect, useState } from "react";
import { View, Text, ScrollView } from "react-native";
import {
  encontrarPorTipo,
  encontrarInvestimentos,
  encontrarTicker,
} from "../../db/mantenecao";
import { cotacao } from "../../utils/cotacaoAtual";
import * as s from "./styles";

// import { Container } from './styles';

const ResumoInvestimentos = ({ tipoInvestimento, ticker }) => {
  const [investimentos, setInvestimentos] = useState([]);

  const getBalanco = (qntInvestimentos, totalInvestimentos) => {
    const cot = cotacao();
    const cotTotal = cot * qntInvestimentos;

    const resultado =
      cot < totalInvestimentos ? (
        <Text style={s.styles.table_text}>
          lucro de R${(totalInvestimentos - cotTotal).toFixed(2)}
        </Text>
      ) : (
        <Text style={s.styles.table_text}>
          prejuíso de R${(totalInvestimentos - cotTotal).toFixed(2)}
        </Text>
      );
    return resultado;
  };

  useEffect(() => {
    if (tipoInvestimento === "cripto") {
      encontrarPorTipo("cripto")
        .then((investimento) => {
          const list = [];
          for (const invest of investimento) {
            list[invest.id] = invest;
          }

          const listaFiltrada = list.filter((i) => i);
          setInvestimentos(listaFiltrada);
        })
        .catch((error) => console.log(error));
    }
    if (tipoInvestimento === "acao") {
      encontrarPorTipo("acao")
        .then((investimento) => {
          const list = [];
          for (const invest of investimento) {
            list[invest.id] = invest;
          }

          const listaFiltrada = list.filter((i) => i);
          setInvestimentos(listaFiltrada);
        })
        .catch((error) => console.log(error));
    }
    if (tipoInvestimento === "fii") {
      encontrarPorTipo("fii")
        .then((investimento) => {
          const list = [];
          for (const invest of investimento) {
            list[invest.id] = invest;
          }

          const listaFiltrada = list.filter((i) => i);
          setInvestimentos(listaFiltrada);
        })
        .catch((error) => console.log(error));
    }
    if (tipoInvestimento === "todos") {
      encontrarInvestimentos()
        .then((investimento) => {
          const list = [];
          for (const invest of investimento) {
            list[invest.id] = invest;
          }

          const listaFiltrada = list.filter((i) => i);
          setInvestimentos(listaFiltrada);
        })
        .catch((error) => console.log(error));
    }
    if (tipoInvestimento === "pesquisar") {
      console.log("ticker", ticker);
      if (ticker === "") {
        encontrarInvestimentos()
          .then((investimento) => {
            const list = [];
            for (const invest of investimento) {
              list[invest.id] = invest;
            }

            const listaFiltrada = list.filter((i) => i);
            setInvestimentos(listaFiltrada);
          })
          .catch((error) => console.log(error));
      } else {
        encontrarTicker(ticker)
          .then((investimento) => {
            const list = [];
            for (const invest of investimento) {
              list[invest.id] = invest;
            }

            const listaFiltrada = list.filter((i) => i);
            setInvestimentos(listaFiltrada);
          })
          .catch((erro) => console.log(erro));
      }
    }
  }, []);

  const listInvestimentos = () => {
    return investimentos.map((element) => {
      console.log("element", element);
      const lista = (
        <View>
          <View key={element.id} style={s.styles.table_content}>
            <View style={s.styles.table_tiker_wrapper}>
              <Text style={s.styles.table_text}>{element.ticker}</Text>
            </View>
            <View style={s.styles.table_name_wrapper}>
              <Text style={s.styles.table_text}>{element.nome}</Text>
            </View>
            <View style={s.styles.table_type_wrapper}>
              <Text style={s.styles.table_text}>{element.tipo}</Text>
            </View>
            {element.qntTotal !== 0 ? (
              <View style={{ flexDirection: "row" }}>
                <View style={s.styles.table_type_wrapper}>
                  <Text style={s.styles.table_text}>{element.qntTotal}</Text>
                </View>
                <View style={s.styles.table_total_wrapper}>
                  <Text style={s.styles.table_text}>
                    {element.valorTotal.toFixed(2)}
                  </Text>
                </View>
              </View>
            ) : (
              <Text style={s.styles.table_text}>
                Vendida em:{" "}
                {new Date(element.data_venda).toLocaleDateString("pt-BR")}
              </Text>
            )}
          </View>
          <View key={element.id} style={s.styles.preco_medio}>
            {element.valorTotal && (
              <>
                <View style={{ flexDirection: "row" }}>
                  <Text style={s.styles.table_text}>Preco médio: </Text>
                  <Text style={s.styles.table_text}>
                    R${(element.valorTotal / element.qntTotal).toFixed(2)}
                  </Text>
                </View>
                <Text style={s.styles.table_text}>
                  Balanço: {getBalanco(element.qntTotal, element.valorTotal)}
                </Text>
              </>
            )}
          </View>
        </View>
      );

      return lista;
    });
  };

  return (
    <ScrollView>
      <Text style={s.styles.title}>Investimentos</Text>

      <View style={s.styles.input}>
        <View style={s.styles.table}>
          <View style={s.styles.table_tiker_wrapper}>
            <Text style={s.styles.table_title}>Ticker</Text>
          </View>
          <View style={s.styles.table_name_wrapper}>
            <Text style={s.styles.table_title}>Nome</Text>
          </View>
          <View style={s.styles.table_type_wrapper}>
            <Text style={s.styles.table_title}>Tipo</Text>
          </View>
          <View style={s.styles.table_type_wrapper}>
            <Text style={s.styles.table_title}>Qnt</Text>
          </View>
          <View style={s.styles.table_total_wrapper}>
            <Text style={s.styles.table_title}>Total</Text>
          </View>
        </View>

        {listInvestimentos()}
      </View>
    </ScrollView>
  );
};

export default ResumoInvestimentos;
