import { BaseEntity } from './../../shared';

export class UsuarioHorario implements BaseEntity {
    constructor(
        public id?: number,
        public numDiaSemana?: number,
        public datHoraInicio?: any,
        public datHoraFin?: any,
        public varUsuarioLog?: string,
        public datFechaLog?: any,
        public numEliminar?: number,
        public usuario?: BaseEntity,
    ) {
    }
}
