import React, { useEffect, useState } from "react";
import { Button, Text, TextInput, View, ScrollView } from "react-native";
import { useForm } from "react-hook-form";
import * as s from "./styles";

import {
  atualizarInvestimento,
  encontrarId,
  removerInvestimento,
} from "../../db/mantenecao";

const AlterarInvestimento = () => {
  const { register, setValue, handleSubmit } = useForm();
  const [id, setId] = useState();
  const [investimento, setInvestimento] = useState();
  const [mostrarInvestimento, setMostrarInvestimento] = useState(false);

  useEffect(() => {
    if (id && id != 0) {
      setMostrarInvestimento(true);
    }
    encontrarId(id)
      .then((inv) => {
        setInvestimento(inv[0]);
        setMostrarInvestimento(false);
      })
      .catch((err) => {
        console.log(err);
        setInvestimento(undefined);
      });
  }, [id, investimento]);

  useEffect(() => {
    register("id");
    register("ticker");
    register("nome");
    register("tipo");
    register("quantidade");
    register("precoCompra");
    register("precoVenda");
    register("dataCompra");
    register("dataVenda");
    register("quantidade");
  }, [register]);

  const onSubmitExcluir = (data) => {
    removerInvestimento(data.id)
      .then((id) => console.log(id))
      .catch((id) => console.log(id));
  };

  const onSubmit = (data) => {
    const invest = {
      ticker: data.ticker,
      nome: data.nome,
      tipo: data.tipo,
      quantidade: data.quantidade,
      precoCompra: data.precoCompra,
      precoVenda: data.dataVenda,
      dataCompra: data.dataCompra,
      dataVenda: data.dataVenda,
    };
    atualizarInvestimento(id, invest)
      .then((id) => console.log(id))
      .catch((erro) => console.log(erro));
  };

  return (
    <ScrollView>
      <Text style={s.styles.title}>Alterar Investimentos</Text>
      <View style={s.styles.input_row}>
        <View style={s.styles.input}>
          <Text style={s.styles.text}>ID</Text>
          <TextInput
            onChangeText={(id) => {
              setValue("id", id);
              setId(id);
            }}
            style={s.styles.text_input}
            placeholder="Inserir id"
          ></TextInput>
        </View>
        <View style={s.styles.input}>
          <Text style={s.styles.text}>Ticker</Text>
          <TextInput
            onChangeText={(ticker) => setValue("ticker", ticker)}
            style={s.styles.text_input}
            placeholder="Inserir ticker"
          ></TextInput>
        </View>
      </View>
      <View style={s.styles.input}>
        <Text style={s.styles.text}>Nome</Text>
        <TextInput
          onChangeText={(nome) => setValue("nome", nome)}
          style={s.styles.text_input}
          placeholder="Inserir nome"
        ></TextInput>
      </View>
      <View style={s.styles.input_row}>
        <View style={s.styles.input}>
          <Text style={s.styles.text}>Tipo</Text>
          <TextInput
            onChangeText={(tipo) => setValue("tipo", tipo)}
            style={s.styles.text_input}
            placeholder="Inserir tipo"
          ></TextInput>
        </View>
        <View style={s.styles.input}>
          <Text style={s.styles.text}>Quantidade</Text>
          <TextInput
            onChangeText={(quantidade) => setValue("quantidade", quantidade)}
            style={s.styles.text_input}
            placeholder="Insera a quantidade"
          ></TextInput>
        </View>
      </View>
      <View style={s.styles.input_row}>
        <View style={s.styles.input}>
          <Text style={s.styles.text}>Preço de compra</Text>
          <TextInput
            onChangeText={(precoCompra) => setValue("precoCompra", precoCompra)}
            style={s.styles.text_input}
            placeholder="Inserir precoCompra"
          ></TextInput>
        </View>
        <View style={s.styles.input}>
          <Text style={s.styles.text}>Preço de venda</Text>
          <TextInput
            onChangeText={(precoVenda) => setValue("precoVenda", precoVenda)}
            style={s.styles.text_input}
            placeholder="Inserir precoVenda"
          ></TextInput>
        </View>
      </View>

      <View style={s.styles.input_row}>
        <View style={s.styles.input}>
          <Text style={s.styles.text}>Data de compra</Text>
          <TextInput
            onChangeText={(dataCompra) => setValue("dataCompra", dataCompra)}
            style={s.styles.text_input}
            placeholder="Inserir dataCompra (em timestamp)"
          ></TextInput>
        </View>
        <View style={s.styles.input}>
          <Text style={s.styles.text}>Data de venda</Text>
          <TextInput
            onChangeText={(dataVenda) => setValue("dataVenda", dataVenda)}
            style={s.styles.text_input}
            placeholder="Inserir dataVenda (em timestamp)"
          ></TextInput>
        </View>
      </View>
      <View style={s.styles.button_row}>
        <Button color="black" onPress={handleSubmit(onSubmit)} title="Alterar">
          Alterar
        </Button>
        <Button
          color="black"
          onPress={handleSubmit(onSubmitExcluir)}
          title="Excluir"
        />
      </View>

      {mostrarInvestimento && (
        <View>
          <Text style={s.styles.resume_title}> Atual</Text>
          {investimento ? (
            <>
              <Text style={s.styles.resume_text}>
                Ticker: {investimento.ticker}
              </Text>
              <Text style={s.styles.resume_text}>
                Nome: {investimento.nome}
              </Text>
              <Text style={s.styles.resume_text}>
                Tipo: {investimento.tipo}
              </Text>
              <Text style={s.styles.resume_text}>
                Quantidade: {investimento.quantidade}
              </Text>
              <Text style={s.styles.resume_text}>
                Preco compra: {investimento.preco_compra}
              </Text>
              <Text style={s.styles.resume_text}>
                Preco venda: {investimento.preco_venda}
              </Text>
              <Text style={s.styles.resume_text}>
                Data compra: {investimento.data_compra}
              </Text>
              <Text style={s.styles.resume_text}>
                Data venda: {investimento.data_venda}
              </Text>
            </>
          ) : (
            <Text style={s.styles.resume_text}>
              Não há investimento com esse ID{" "}
            </Text>
          )}
        </View>
      )}
    </ScrollView>
  );
};

export default AlterarInvestimento;
