import { Consulta } from "./interfaces/consulta";
import { StatusConsulta } from "./types/statusConsulta";

type DadosConsulta = Omit<Consulta, "id" | "status">;

function criarConsulta(id: number, dados: DadosConsulta): Consulta {
    return {
        id,
        ...dados,
        status: "agendada",
    };
}

function alterarStatusConsulta(
    consulta: Consulta,
    novoStatus: StatusConsulta
): Consulta | null {
    if (consulta.status === "realizada" && novoStatus === "cancelada") {
        return null;
    }

    return {
        ...consulta,
        status: novoStatus,
    };
}

function confirmarConsulta(consulta: Consulta): Consulta {
    const consultaConfirmada = alterarStatusConsulta(consulta, "confirmada");

    if (!consultaConfirmada) {
        throw new Error("Nao foi possivel confirmar a consulta");
    }

    return consultaConfirmada;
}

function cancelarConsulta(consulta: Consulta): Consulta | null {
    return alterarStatusConsulta(consulta, "cancelada");
}

function listarConsultasPorStatus(
    consultas: Consulta[],
    status: StatusConsulta
): Consulta[] {
    return consultas.filter((consulta) => consulta.status === status);
}

function listarConsultasFuturas(consultas: Consulta[]): Consulta[] {
    const hoje = new Date();
    hoje.setHours(0, 0, 0, 0);

    return consultas.filter((consulta) => {
        const [ano, mes, dia] = consulta.data.split("-").map(Number);
        const dataConsulta = new Date(ano, mes - 1, dia);
        return !Number.isNaN(dataConsulta.getTime()) && dataConsulta >= hoje;
    });
}

function calcularFaturamento(consultas: Consulta[]): number {
    return consultas
        .filter((consulta) => consulta.status === "realizada")
        .reduce((total, consulta) => total + (consulta.valor ?? 0), 0);
}

function exibirConsulta(consulta: Consulta): string {
    const valorFormatado = (consulta.valor ?? 0).toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL",
    });

    return [
        `Consulta #${consulta.id}`,
        `Paciente: ${consulta.pacienteNome}`,
        `Medico: ${consulta.medicoNome}`,
        `Especialidade: ${consulta.especialidade}`,
        `Data: ${consulta.data}`,
        `Horario: ${consulta.horario}`,
        `Valor: ${valorFormatado}`,
        `Status: ${consulta.status}`,
    ].join("\n");
}

const consultas: Consulta[] = [
    criarConsulta(1, {
        usuarioId: 2,
        pacienteId: 1,
        pacienteNome: "Carlos Andrade",
        medicoId: 1,
        medicoNome: "Dr. Roberto Silva",
        especialidade: "Cardiologia",
        data: "2026-10-28",
        horario: "09:00",
        valor: 350,
    }),
    confirmarConsulta(
        criarConsulta(2, {
            usuarioId: 3,
            pacienteId: 2,
            pacienteNome: "Maria Silva",
            medicoId: 2,
            medicoNome: "Dra. Ana Paula Costa",
            especialidade: "Ortopedia",
            data: "2026-11-01",
            horario: "14:00",
            valor: 420,
            observacoes: "Retorno pos-cirurgia",
        })
    ),
];

const consultaRealizada = alterarStatusConsulta(
    criarConsulta(3, {
        usuarioId: 4,
        pacienteId: 3,
        pacienteNome: "Pedro Santos",
        medicoId: 3,
        medicoNome: "Dr. Joao Mendes",
        especialidade: "Pediatria",
        data: "2026-01-15",
        horario: "10:30",
        valor: 280,
    }),
    "realizada"
);

if (consultaRealizada) {
    consultas.push(consultaRealizada);
}

const consultaCancelada = cancelarConsulta(
    criarConsulta(4, {
        usuarioId: 3,
        pacienteId: 2,
        pacienteNome: "Maria Silva",
        medicoId: 1,
        medicoNome: "Dr. Roberto Silva",
        especialidade: "Cardiologia",
        data: "2026-01-10",
        horario: "08:00",
        valor: 300,
    })
);

if (consultaCancelada) {
    consultas.push(consultaCancelada);
}

consultas.push(
    criarConsulta(5, {
        usuarioId: 2,
        pacienteId: 1,
        pacienteNome: "Carlos Andrade",
        medicoId: 2,
        medicoNome: "Dra. Ana Paula Costa",
        especialidade: "Ortopedia",
        data: "2026-12-05",
        horario: "16:15",
        valor: 390,
    })
);

console.log("=== TODAS AS CONSULTAS ===");
consultas.forEach((consulta) => console.log(exibirConsulta(consulta)));

console.log("=== CONSULTAS CONFIRMADAS ===");
listarConsultasPorStatus(consultas, "confirmada").forEach((consulta) => {
    console.log(exibirConsulta(consulta));
});

console.log("=== CONSULTAS REALIZADAS ===");
listarConsultasPorStatus(consultas, "realizada").forEach((consulta) => {
    console.log(exibirConsulta(consulta));
});

console.log("=== CONSULTAS FUTURAS ===");
listarConsultasFuturas(consultas).forEach((consulta) => {
    console.log(exibirConsulta(consulta));
});

const faturamento = calcularFaturamento(consultas);
const faturamentoFormatado = faturamento.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
});

console.log("=== FATURAMENTO (CONSULTAS REALIZADAS) ===");
console.log(faturamentoFormatado);
