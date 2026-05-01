import React from "react";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";

type LoadingProps = {
    mensagem?: string;
};

export default function Loading({
    mensagem = "Carregando...",
}: LoadingProps) {
    return (
        <View style={styles.container}>
            <ActivityIndicator size="large" color="#79059C" />
            <Text style={styles.texto}>{mensagem}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 24,
        backgroundColor: "#f5f5f5",
        gap: 12,
    },
    texto: {
        fontSize: 16,
        color: "#666",
    },
});
