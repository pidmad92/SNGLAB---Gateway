import { BaseEntity } from './../../shared';

export class Multa implements BaseEntity {
    constructor(
        public id?: number,
        public fMonmulta?: number,
        public vNumresolucionsd?: string,
        public dFecresolucionsd?: any,
        public vcodigo?: string,
        public vUsuarioreg?: string,
        public dFechareg?: any,
        public nEliminar?: number,
        public nSedereg?: number,
        public vUsuarioupd?: string,
        public dFechaupd?: any,
        public nSedeupd?: number,
        public resolucrd?: BaseEntity,
    ) {
    }
}
