import { BaseEntity } from './../../shared';

export class Direcalter implements BaseEntity {
    constructor(
        public id?: number,
        public vRazonsocial?: string,
        public vDireccion?: string,
        public vUsuarioreg?: string,
        public dFechareg?: any,
        public nEliminar?: number,
        public nSedereg?: number,
        public vUsuarioupd?: string,
        public dFechaupd?: any,
        public nSedeupd?: number,
        public atenmotiatens?: BaseEntity[],
    ) {
    }
}
