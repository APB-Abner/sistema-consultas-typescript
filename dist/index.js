// Especialidades
const cardiologia = {
    id: 1,
    nome: "Cardiologia",
};
const ortopedia = {
    id: 2,
    nome: "Ortopedia",
    descricao: "Tratamento de ossos e articulações",
};
const pediatria = {
    id: 3,
    nome: "Pediatria",
};
// Médicos
const medico1 = {
    id: 1,
    nome: "Dr. Roberto Silva",
    crm: "CRM12345",
    especialidade: cardiologia,
    ativo: true,
};
const medico2 = {
    id: 2,
    nome: "Dra. Ana Paula Costa",
    crm: "CRM54321",
    especialidade: ortopedia,
    ativo: true,
};
const medico3 = {
    id: 3,
    nome: "Dr. João Mendes",
    crm: "CRM98765",
    especialidade: pediatria,
    ativo: true,
};
// Pacientes
const paciente1 = {
    id: 1,
    nome: "Carlos Andrade",
    cpf: "123.456.789-00",
    email: "carlos@email.com",
};
const paciente2 = {
    id: 2,
    nome: "Maria Silva",
    cpf: "987.654.321-00",
    email: "maria@email.com",
    telefone: "(11) 98765-4321",
};
const paciente3 = {
    id: 3,
    nome: "Pedro Santos",
    cpf: "456.789.123-00",
    email: "pedro@email.com",
};
function criarConsulta(id, medico, paciente, data, valor) {
    return {
        id,
        medico,
        paciente,
        data,
        valor,
        status: "agendada",
    };
}
function alterarStatusConsulta(consulta, novoStatus) {
    if (consulta.status === "realizada" && novoStatus === "cancelada") {
        return null;
    }
    return Object.assign(Object.assign({}, consulta), { status: novoStatus });
}
function confirmarConsulta(consulta) {
    const consultaConfirmada = alterarStatusConsulta(consulta, "confirmada");
    if (!consultaConfirmada) {
        throw new Error("Não foi possível confirmar a consulta");
    }
    return consultaConfirmada;
}
function cancelarConsulta(consulta) {
    return alterarStatusConsulta(consulta, "cancelada");
}
function listarConsultasPorStatus(consultas, status) {
    return consultas.filter((consulta) => consulta.status === status);
}
function listarConsultasFuturas(consultas) {
    const hoje = new Date();
    hoje.setHours(0, 0, 0, 0);
    return consultas.filter((consulta) => consulta.data >= hoje);
}
function calcularFaturamento(consultas) {
    return consultas
        .filter((consulta) => consulta.status === "realizada")
        .reduce((total, consulta) => total + consulta.valor, 0);
}
function exibirConsulta(consulta) {
    const valorFormatado = consulta.valor.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL",
    });
    return `
Consulta #${consulta.id}
Médico: ${consulta.medico.nome}
Paciente: ${consulta.paciente.nome}
Especialidade: ${consulta.medico.especialidade.nome}
Data: ${consulta.data.toLocaleDateString("pt-BR")}
Valor: ${valorFormatado}
Status: ${consulta.status}
`;
}
const consultas = [];
const consulta1 = criarConsulta(1, medico1, paciente1, new Date(2026, 1, 28), 350);
consultas.push(consulta1);
const consulta2Base = criarConsulta(2, medico2, paciente2, new Date(2026, 2, 1), 420);
const consulta2 = alterarStatusConsulta(consulta2Base, "confirmada");
if (consulta2) {
    consultas.push(consulta2);
}
const consulta3 = criarConsulta(3, medico3, paciente3, new Date(2026, 0, 15), 280);
const consulta3Realizada = alterarStatusConsulta(consulta3, "realizada");
if (consulta3Realizada) {
    consultas.push(consulta3Realizada);
}
const consulta4Base = criarConsulta(4, medico1, paciente2, new Date(2026, 0, 10), 300);
const consulta4Cancelada = alterarStatusConsulta(consulta4Base, "cancelada");
if (consulta4Cancelada) {
    consultas.push(consulta4Cancelada);
}
const consulta5 = criarConsulta(5, medico2, paciente1, new Date(2026, 2, 5), 390);
consultas.push(consulta5);
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
export {};
