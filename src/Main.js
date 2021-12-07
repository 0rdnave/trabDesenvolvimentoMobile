import React, { useEffect, useState } from "react";
import { Text, View, Button, Modal, Pressable } from "react-native";
import { PieChart } from "react-native-chart-kit";
import { Ionicons } from "@expo/vector-icons";
import AdicionarInvestimento from "./components/AdicionarInvestimento/index";
import AlterarInvestimento from "./components/AlterarInvestimento";
import VenderInvestimentos from "./components/VenderInvestimentos";
import PesquisarInvestimentos from "./components/PesquisarInvestimentos";
import ResumoInvestimentos from "./components/ResumoInvestimentos";
import * as s from "./styles";
import { encontrarPorTipoResumido } from "./db/mantenecao";

export default function Main() {
  const [modalOpen, setModalOpen] = useState(false);
  const [componente, setComponente] = useState("comprar");
  const [qntCripto, setQuantidadeCripto] = useState();
  const [qntAcoes, setQuantidadeAcoes] = useState();
  const [qntFiis, setQuantidadeFiis] = useState();

  useEffect(() => {
    let test = {};
    encontrarPorTipoResumido("acao").then((inv) => {
      setQuantidadeAcoes(inv[0].qntTotal);
      console.log(inv[0]);
    });
    encontrarPorTipoResumido("cripto").then((inv) =>
      setQuantidadeCripto(inv[0].qntTotal)
    );
    encontrarPorTipoResumido("fii").then((inv) =>
      setQuantidadeFiis(inv[0].qntTotal)
    );
    console.log("qntAcoes", qntAcoes);
    console.log("test", test);
  }, []);

  const getChart = () => {
    const chartConfig = {
      backgroundGradientFrom: "#1E2923",
      backgroundGradientFromOpacity: 0,
      backgroundGradientTo: "#08130D",
      backgroundGradientToOpacity: 0.5,
      color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
      strokeWidth: 2, // optional, default 3
      barPercentage: 0.5,
      useShadowColorFromDataset: false, // optional
    };

    const data = [
      {
        name: "Criptomoedas",
        quantidade: qntCripto,
        color: "#4287f5",
        legendFontColor: "#7F7F7F",
        legendFontSize: 15,
      },
      {
        name: "Ações",
        quantidade: qntAcoes,
        color: "#b642f5",
        legendFontColor: "#7F7F7F",
        legendFontSize: 15,
      },
      {
        name: "FIIs",
        quantidade: qntFiis,
        color: "#42f58d",
        legendFontColor: "#7F7F7F",
        legendFontSize: 15,
      },
    ];

    return (
      <PieChart
        data={data}
        width={400}
        height={240}
        chartConfig={chartConfig}
        accessor={"quantidade"}
        backgroundColor={"transparent"}
        paddingLeft={"15"}
        center={[-10, 0]}
      />
    );
  };
  const selectComponente = () => {
    switch (componente) {
      case "comprar":
        return <AdicionarInvestimento />;
      case "alterar":
        return <AlterarInvestimento />;
      case "pesquisar":
        return <PesquisarInvestimentos />;
      case "vender":
        return <VenderInvestimentos />;
      case "visualizar":
        return <ResumoInvestimentos tipoInvestimento={"todos"} />;
      case "cripto":
        return <ResumoInvestimentos tipoInvestimento={"cripto"} />;
      case "acao":
        return <ResumoInvestimentos tipoInvestimento={"acao"} />;
      case "fii":
        return <ResumoInvestimentos tipoInvestimento={"fii"} />;

      default:
        return alert("Componente não encontrado");
    }
  };

  return (
    <View style={s.styles.container}>
      {/* header */}
      <View
        style={{
          flex: 1,
          width: "100%",
          backgroundColor: "#2E2E2E",
          flexDirection: "row",
          alignItems: "center",
          paddingLeft: "24px",
        }}
      >
        <View>
          <Ionicons name="person-outline" size={24} color="white" />
        </View>
        <View style={{ paddingLeft: "16px" }}>
          <Text style={{ color: "white" }}>Carteira</Text>
        </View>
      </View>

      {/* body */}
      <View
        style={{
          flex: 9,
          width: "100%",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Modal visible={modalOpen}>
          <View style={s.styles.modal}>
            <View style={s.styles.closeButton}>
              <Pressable onPress={() => setModalOpen(false)}>
                <Ionicons name="close" size={24} color="white" />
              </Pressable>
            </View>
            {selectComponente()}
          </View>
        </Modal>
        <View
          style={{
            flex: 1,
            width: "100%",
          }}
        >
          {getChart()}
        </View>
        <View
          style={{
            flex: 1,
            width: "100%",
          }}
        >
          <View style={s.styles.button}>
            <Button
              onPress={() => {
                setModalOpen(), setComponente("cripto");
              }}
              title="Criptomoedas"
              color="#1D1D1D"
            />
          </View>
          <View style={s.styles.button}>
            <Button
              onPress={() => {
                setModalOpen(), setComponente("acao");
              }}
              title="Ações"
              color="#1D1D1D"
            />
          </View>
          <View style={s.styles.button}>
            <Button
              onPress={() => {
                setModalOpen(), setComponente("fii");
              }}
              title="FIIs"
              color="#1D1D1D"
            />
          </View>
        </View>
      </View>
      <View style={s.styles.footer}>
        <View style={s.styles.button}>
          <Button
            onPress={() => {
              setModalOpen(), setComponente("comprar");
            }}
            title="comprar"
            color="#1D1D1D"
          />
        </View>
        <View style={s.styles.button}>
          <Button
            onPress={() => {
              setModalOpen(), setComponente("vender");
            }}
            title="vender"
            color="#1D1D1D"
          />
        </View>
        <View style={s.styles.button}>
          <Button
            onPress={() => {
              setModalOpen(), setComponente("visualizar");
            }}
            title="Visualizar"
            color="#1D1D1D"
          />
        </View>
        <View style={s.styles.button}>
          <Button
            onPress={() => {
              setModalOpen(), setComponente("pesquisar");
            }}
            title="Pesquisar"
            color="#1D1D1D"
          />
        </View>
        <View style={s.styles.button}>
          <Button
            onPress={() => {
              setModalOpen(), setComponente("alterar");
            }}
            title="editar"
            color="#1D1D1D"
          />
        </View>
      </View>
    </View>
  );
}
