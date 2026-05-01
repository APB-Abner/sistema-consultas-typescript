import AsyncStorage from "@react-native-async-storage/async-storage";
import { Consulta } from "../interfaces/consulta";
import { Medico } from "../interfaces/medico";
import { Especialidade } from "../types/especialidade";

const KEYS = {
  ESPECIALIDADES: "@consultas:especialidades",
  MEDICOS: "@consultas:medicos",
  CONSULTAS: "@consultas:consultas",
};

export async function salvarEspecialidades(
  especialidades: Especialidade[]
): Promise<void> {
  try {
    await AsyncStorage.setItem(
      KEYS.ESPECIALIDADES,
      JSON.stringify(especialidades)
    );
  } catch (erro) {
    console.error("Erro ao salvar especialidades:", erro);
  }
}

export async function obterEspecialidades(): Promise<Especialidade[]> {
  try {
    const dados = await AsyncStorage.getItem(KEYS.ESPECIALIDADES);
    return dados ? JSON.parse(dados) : [];
  } catch (erro) {
    console.error("Erro ao obter especialidades:", erro);
    return [];
  }
}

export async function salvarMedicos(medicos: Medico[]): Promise<void> {
  try {
    await AsyncStorage.setItem(KEYS.MEDICOS, JSON.stringify(medicos));
  } catch (erro) {
    console.error("Erro ao salvar medicos:", erro);
  }
}

export async function obterMedicos(): Promise<Medico[]> {
  try {
    const dados = await AsyncStorage.getItem(KEYS.MEDICOS);
    return dados ? JSON.parse(dados) : [];
  } catch (erro) {
    console.error("Erro ao obter medicos:", erro);
    return [];
  }
}

export async function salvarConsultas(consultas: Consulta[]): Promise<void> {
  try {
    await AsyncStorage.setItem(KEYS.CONSULTAS, JSON.stringify(consultas));
  } catch (erro) {
    console.error("Erro ao salvar consultas:", erro);
  }
}

export async function obterConsultas(): Promise<Consulta[]> {
  try {
    const dados = await AsyncStorage.getItem(KEYS.CONSULTAS);

    if (!dados) {
      return [];
    }

    const consultas = JSON.parse(dados);
    return Array.isArray(consultas) ? (consultas as Consulta[]) : [];
  } catch (erro) {
    console.error("Erro ao obter consultas:", erro);
    return [];
  }
}
