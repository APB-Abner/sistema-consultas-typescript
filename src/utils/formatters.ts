import { StatusConsulta } from "../types/statusConsulta";

const STATUS_META: Record<StatusConsulta, { cor: string; texto: string }> = {
    agendada: {
        cor: "#2196F3",
        texto: "Agendada",
    },
    confirmada: {
        cor: "#4CAF50",
        texto: "Confirmada",
    },
    cancelada: {
        cor: "#F44336",
        texto: "Cancelada",
    },
    realizada: {
        cor: "#9C27B0",
        texto: "Realizada",
    },
};

export function formatarData(data: string | Date): string {
    if (data instanceof Date) {
        return data.toLocaleDateString("pt-BR");
    }

    const [ano, mes, dia] = data.split("-").map(Number);
    const dataNormalizada = new Date(ano, mes - 1, dia);

    if (Number.isNaN(dataNormalizada.getTime())) {
        return data;
    }

    return dataNormalizada.toLocaleDateString("pt-BR");
}

export function formatarHorario(horario: string): string {
    if (/^\d{2}:\d{2}$/.test(horario)) {
        return horario;
    }

    const horarioNormalizado = new Date(`1970-01-01T${horario}`);

    if (Number.isNaN(horarioNormalizado.getTime())) {
        return horario;
    }

    return horarioNormalizado.toLocaleTimeString("pt-BR", {
        hour: "2-digit",
        minute: "2-digit",
    });
}

export function obterCorStatus(status: StatusConsulta): string {
    return STATUS_META[status].cor;
}

export function obterTextoStatus(status: StatusConsulta): string {
    return STATUS_META[status].texto;
}
