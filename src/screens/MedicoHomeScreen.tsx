/**
 * MedicoHomeScreen - Tela principal do médico.
 * Exibe a especialidade e o acesso à agenda do profissional logado.
 */

import React from "react";
import {
  Alert,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { styles } from "../styles/medicoHome.styles";
import { useAuth } from "../contexts/AuthContext";

type MedicoHomeScreenProps = {
  navigation: any;
};

export default function MedicoHomeScreen({
  navigation,
}: MedicoHomeScreenProps) {
  const { usuario, logout } = useAuth();

  async function handleLogout() {
    try {
      await logout();
    } catch (error) {
      console.error("Erro no logout do médico:", error);
      Alert.alert("Erro", "Não foi possível sair da conta. Tente novamente.");
    }
  }

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <Text style={styles.icone}>👨‍⚕️</Text>
          <Text style={styles.titulo}>Olá, {usuario?.nome}!</Text>
          <Text style={styles.subtitulo}>
            {usuario?.especialidade
              ? `Especialidade: ${usuario.especialidade}`
              : "Área do médico"}
          </Text>
        </View>

        <View style={styles.menu}>
          <TouchableOpacity
            style={[styles.card, styles.cardPrimario]}
            onPress={() => navigation.navigate("ConsultasList")}
          >
            <Text style={styles.cardIcone}>📋</Text>
            <Text style={styles.cardTitulo}>Minha Agenda</Text>
            <Text style={styles.cardDescricao}>
              Ver consultas e pacientes relacionados a você
            </Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.logoutText}>🚪 Sair da Conta</Text>
        </TouchableOpacity>

        <View style={styles.footer}>
          <Text style={styles.footerText}>Sistema de Consultas Médicas</Text>
        </View>
      </ScrollView>
    </View>
  );
}
