import React, { useCallback, useState } from "react";
import { Button, ScrollView, Text, View } from "react-native";
import { StatusBar } from "expo-status-bar";
import { useFocusEffect } from "@react-navigation/native";
import { ConsultaCard } from "../components";
import { Consulta } from "../interfaces/consulta";
import { obterConsultas, salvarConsultas } from "../services/storage";
import { styles } from "../styles/app.styles";

type HomeProps = {
  navigation?: {
    navigate: (screen: "Admin") => void;
  };
};

export default function Home({ navigation }: HomeProps) {
  const [consultas, setConsultas] = useState<Consulta[]>([]);

  useFocusEffect(
    useCallback(() => {
      carregarConsultas();
    }, [])
  );

  async function carregarConsultas() {
    const consultasSalvas = await obterConsultas();
    setConsultas(consultasSalvas);
  }

  async function confirmarConsulta(consultaId: number) {
    const consultasAtualizadas = consultas.map((consulta) =>
      consulta.id === consultaId
        ? { ...consulta, status: "confirmada" as const }
        : consulta
    );

    setConsultas(consultasAtualizadas);
    await salvarConsultas(consultasAtualizadas);
  }

  async function cancelarConsulta(consultaId: number) {
    const consultasAtualizadas = consultas.map((consulta) =>
      consulta.id === consultaId
        ? { ...consulta, status: "cancelada" as const }
        : consulta
    );

    setConsultas(consultasAtualizadas);
    await salvarConsultas(consultasAtualizadas);
  }

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <Text style={styles.titulo}>Minhas Consultas</Text>
          <Text style={styles.subtitulo}>
            {consultas.length} consulta(s) cadastrada(s)
          </Text>
        </View>

        {consultas.length === 0 ? (
          <View style={styles.emptyState}>
            <Text style={styles.emptyText}>Nenhuma consulta cadastrada.</Text>
            <Button
              title="Ir para Admin"
              onPress={() => navigation?.navigate("Admin")}
            />
          </View>
        ) : (
          <>
            <View style={styles.adminButton}>
              <Button
                title="Cadastrar nova consulta"
                onPress={() => navigation?.navigate("Admin")}
              />
            </View>
            {consultas.map((consulta) => (
              <ConsultaCard
                key={consulta.id}
                consulta={consulta}
                onConfirmar={() => confirmarConsulta(consulta.id)}
                onCancelar={() => cancelarConsulta(consulta.id)}
              />
            ))}
          </>
        )}
      </ScrollView>
    </View>
  );
}
