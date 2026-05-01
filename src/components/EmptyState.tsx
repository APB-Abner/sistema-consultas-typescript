import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

type EmptyStateProps = {
    mensagem: string;
    descricao?: string;
    icone?: string;
    acaoLabel?: string;
    onAcao?: () => void;
};

export default function EmptyState({
    mensagem,
    descricao,
    icone = "[]",
    acaoLabel,
    onAcao,
}: EmptyStateProps) {
    return (
        <View style={styles.container}>
            <Text style={styles.icone}>{icone}</Text>
            <Text style={styles.mensagem}>{mensagem}</Text>
            {descricao ? <Text style={styles.descricao}>{descricao}</Text> : null}

            {acaoLabel && onAcao ? (
                <TouchableOpacity style={styles.botao} onPress={onAcao}>
                    <Text style={styles.botaoTexto}>{acaoLabel}</Text>
                </TouchableOpacity>
            ) : null}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        padding: 32,
        gap: 12,
    },
    icone: {
        fontSize: 48,
    },
    mensagem: {
        fontSize: 18,
        fontWeight: "600",
        color: "#333",
        textAlign: "center",
    },
    descricao: {
        fontSize: 14,
        color: "#666",
        textAlign: "center",
        lineHeight: 20,
    },
    botao: {
        marginTop: 8,
        paddingHorizontal: 20,
        paddingVertical: 12,
        borderRadius: 10,
        backgroundColor: "#79059C",
    },
    botaoTexto: {
        color: "#fff",
        fontWeight: "600",
    },
});
