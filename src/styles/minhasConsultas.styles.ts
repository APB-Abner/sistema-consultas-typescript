import { StyleSheet } from "react-native";

/** Estilos de MinhasConsultas, separados da lógica e da estrutura da interface. */
export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 32,
  },
  icone: {
    fontSize: 80,
    marginBottom: 24,
  },
  titulo: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#79059C",
    marginBottom: 16,
  },
  descricao: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
    marginBottom: 32,
  },
  botoesContainer: {
    width: "100%",
    gap: 16,
  },
  botao: {
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 12,
    alignItems: "center",
  },
  botaoPrimario: {
    backgroundColor: "#79059C",
  },
  botaoSecundario: {
    backgroundColor: "#4CAF50",
  },
  botaoTerciario: {
    backgroundColor: "transparent",
    borderWidth: 2,
    borderColor: "#79059C",
  },
  botaoTexto: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  botaoTextoSecundario: {
    color: "#79059C",
    fontWeight: "bold",
    fontSize: 16,
  },
});
