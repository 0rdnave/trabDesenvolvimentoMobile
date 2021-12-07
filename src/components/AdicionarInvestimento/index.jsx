import React, { useState, useEffect } from "react";
import { Button, Text, TextInput, View, Alert } from "react-native";
import { useForm } from "react-hook-form";
import { cotacao } from "../../utils/cotacaoAtual.js";
import RNPickerSelect from "react-native-picker-select";

import * as s from "./styles";
import { inserirInvestimento } from "../../db/mantenecao";
import { getNomeInvestimento } from "../../utils/getNomeInvestimento.js";

const AdicionarInvestimento = () => {
  const { register, setValue, handleSubmit } = useForm();
  const [investTipo, setInvestTipo] = useState("");
  const [cotacaoAtual, setCotacaoAtual] = useState(0);

  const getNomesInvestimentos = () => {
    let investName = [];
    if (investTipo == "acao") {
      investName = [
        { label: "MR COFFEE", value: "MCFE1" },
        { label: "PETROBRAS PN", value: "PETR4" },
        { label: "Vale", value: "VALE3" },
        { label: "JBS", value: "JBSS3" },
        { label: "MELIUZ", value: "CASH3" },
      ];
    }
    if (investTipo == "cripto") {
      investName = [
        { label: "Dogelon Mars", value: "ELON" },
        { label: "Dent", value: "DENT" },
        { label: "SHIBA INU", value: "SHIB" },
        { label: "VeThor Token", value: "VTHO" },
        { label: "Reef", value: "REEF" },
      ];
    }
    if (investTipo == "fii") {
      investName = [
        { label: "FUNDO FATEC LINS", value: "FFTL" },
        { label: "CONJ HAB MONZALEL PAZGUETO", value: "CHMP" },
        { label: "EDIFICIO DOS DESENVOLVEDORES", value: "EDES" },
        { label: "CONGLOMERADO GAMERS", value: "CGER" },
        { label: "JBS INSTALACOES", value: "JBSI" },
      ];
    }
    return investName;
  };

  useEffect(() => {
    register("ticker");
    register("nome");
    register("tipo");
    register("quantidade");
  }, [register]);

  const onSubmit = (data) => {
    const invest = {
      ticker: data.ticker,
      tipo: data.tipo,
      nome: getNomeInvestimento(data.ticker),
      quantidade: data.quantidade,
      precoCompra: cotacaoAtual,
      precoVenda: 0,
      dataCompra: Date.now(),
      dataVenda: 0,
    };
    inserirInvestimento(invest)
      .then((id) => console.log(id))
      .catch((erro) => console.log(erro));
  };

  return (
    <View>
      <Text style={s.styles.title}>Adicionar Investimentos</Text>
      <View style={s.styles.input}>
        <RNPickerSelect
          style={{ inputWeb: s.styles.picker }}
          placeholder={{
            label: "Selecione o tipo de investimento",
            value: undefined,
          }}
          onValueChange={(value) => {
            setValue("tipo", value);
            setInvestTipo(value);
          }}
          items={[
            { label: "Ações", value: "acao" },
            { label: "Criptos", value: "cripto" },
            { label: "FIIs", value: "fii" },
          ]}
        />
      </View>
      <View style={s.styles.input}>
        <RNPickerSelect
          style={{
            inputWeb: s.styles.picker,
          }}
          placeholder={{ label: "Selecione o investimento", value: undefined }}
          onValueChange={(ticker) => {
            setValue("ticker", ticker);
            setCotacaoAtual(cotacao());
          }}
          items={getNomesInvestimentos()}
        />
      </View>
      <View style={s.styles.input}>
        <View style={s.styles.input_row}>
          <Text style={s.styles.text}>Quantidade</Text>
          <Text style={s.styles.text_cotacao}>
            Cotação atual: R${cotacaoAtual !== 0 && cotacaoAtual}
          </Text>
        </View>
        <TextInput
          onChangeText={(quantidade) => setValue("quantidade", quantidade)}
          style={s.styles.text_input}
          placeholder="Inserir a quantidade a se investir"
        ></TextInput>
      </View>
      <Button color="black" onPress={handleSubmit(onSubmit)} title="Investir" />
    </View>
  );
};

export default AdicionarInvestimento;
