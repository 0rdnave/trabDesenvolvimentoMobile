import React, { useState, useEffect } from "react";
import { Button, Text, TextInput, View } from "react-native";
import { useForm } from "react-hook-form";
import * as s from "./styles";
import {
  encontrarTicker,
  encontrarTudoTicker,
  vendaInvestimento,
  zerarPosicao,
} from "../../db/mantenecao";

const VenderInvestimentos = () => {
  const { register, setValue, handleSubmit } = useForm();
  const [total, setTotal] = useState(0);

  useEffect(() => {
    register("ticker");
    register("quantidade");
  }, [register]);

  const onSubmitVenderTudo = (data) => {
    const inv = {
      ticker: data.ticker,
      quantidade: 0,
      dataVenda: Date.now(),
    };
    zerarPosicao(inv).then((i) => console.log("zerar posiição", i));
  };
  const onSubmitVender = (data) => {
    const inv = {
      ticker: data.ticker,
      quantidade: data.quantidade,
      dataVenda: Date.now(),
    };
  };

  return (
    <View>
      <Text style={s.styles.title}>Vender Investimentos</Text>
      <View style={s.styles.input}>
        <Text style={s.styles.text}>Ticker do investimento</Text>
        <TextInput
          onChangeText={(ticker) => setValue("ticker", ticker)}
          style={s.styles.text_input}
          placeholder="Insira codigo do investimento"
        />
      </View>
      <View style={s.styles.input}>
        <Text style={s.styles.text}>Quantidade</Text>
        <TextInput
          onChangeText={(quantidade) => setValue("quantidade", quantidade)}
          style={s.styles.text_input}
          placeholder="Insira codigo do investimento"
        />
      </View>
      <View style={s.styles.buttons}>
        <Button
          color="black"
          title="Vender"
          onPress={handleSubmit(onSubmitVender)}
        />
        <Button
          color="black"
          title="Vender Tudo"
          onPress={handleSubmit(onSubmitVenderTudo)}
        />
      </View>
    </View>
  );
};

export default VenderInvestimentos;
