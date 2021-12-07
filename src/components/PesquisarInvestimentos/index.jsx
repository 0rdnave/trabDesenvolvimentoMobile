import React, { useEffect, useState } from "react";
import { Button, Text, TextInput, View, Modal, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useForm } from "react-hook-form";
import * as s from "./styles";
import ResumoInvestimentos from "../ResumoInvestimentos";
import { encontrarTicker } from "../../db/mantenecao";

const PesquisarInvestimentos = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [tickerAtual, setTickerAtual] = useState("");

  const { register, setValue, handleSubmit } = useForm();

  useEffect(() => {
    register("ticker");
  }, [register]);

  const onSubmit = (data) => {
    console.log("data.ticker", data.ticker);
    setTickerAtual(data.ticker);
    setModalOpen();
  };
  console.log("tickerAtual", tickerAtual);
  return (
    <View>
      <View style={s.styles.input}>
        <Text style={s.styles.text}>Pesquisar</Text>
        <TextInput
          onChangeText={(ticker) => setValue("ticker", ticker)}
          style={s.styles.text_input}
          placeholder="Inserir o ticker"
        />
      </View>
      <Button color="black" onPress={handleSubmit(onSubmit)} title="Investir" />

      <Modal visible={modalOpen}>
        <View style={s.styles.modal}>
          <View style={s.styles.closeButton}>
            <Pressable onPress={() => setModalOpen(false)}>
              <Ionicons name="close" size={24} color="white" />
            </Pressable>
          </View>
          <ResumoInvestimentos
            tipoInvestimento={"pesquisar"}
            ticker={tickerAtual}
          />
        </View>
      </Modal>
    </View>
  );
};

export default PesquisarInvestimentos;
