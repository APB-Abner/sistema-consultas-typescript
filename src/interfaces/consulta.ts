import { StatusConsulta } from "../types/statusConsulta";

export interface Consulta {
 id: number;
 pacienteId: number;
 pacienteNome: string;
 medicoId: number;
 medicoNome: string;
 especialidade: string;
 usuarioId: number; // ID do usuário que agendou a consulta
 data: string;
 horario: string;
 status: StatusConsulta;
 observacoes?: string;
 valor?: number;
}
