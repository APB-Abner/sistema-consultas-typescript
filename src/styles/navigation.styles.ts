import { StyleSheet } from "react-native";

/** Estilos de navegação, separados da lógica e da estrutura da interface. */
export const styles = StyleSheet.create({
 loadingContainer: {
 flex: 1,
 justifyContent: "center",
 alignItems: "center",
 backgroundColor: "#fff",
 },
 headerRight: {
 marginRight: 10,
 },
 userBadge: {
 flexDirection: "row",
 alignItems: "center",
 },
 userInfo: {
 alignItems: "flex-end",
 },
 userName: {
 color: "#fff",
 fontSize: 12,
 fontWeight: "bold",
 },
});
