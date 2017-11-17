import { BaseEntity } from './../../shared';

export class Conciliacion implements BaseEntity {
    constructor(
        public id?: number,
        public dFecha?: any,
        public vFlgaudienciaresistida?: string,
        public vFlgreprogramacion?: string,
        public vUsuarioreg?: string,
        public dFechareg?: any,
        public nEliminar?: number,
        public nSedereg?: number,
        public vUsuarioupd?: string,
        public dFechaupd?: any,
        public nSedeupd?: number,
        public expediente?: BaseEntity,
        public abogado?: BaseEntity,
        public hora?: BaseEntity,
        public resulconci?: BaseEntity,
    ) {
    }
}
