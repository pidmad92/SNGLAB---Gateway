import { BaseEntity } from './../../shared';

export class Pernatudire implements BaseEntity {
    constructor(
        public id?: number,
        public vCoddepartamento?: string,
        public vCodprovincia?: string,
        public vCoddistrito?: string,
        public vDircompleta?: string,
        public vReferencia?: string,
        public vFlgnotifica?: string,
        public vUsuarioreg?: string,
        public dFechareg?: any,
        public nEliminar?: number,
        public nSedereg?: number,
        public vUsuarioupd?: string,
        public dFechaupd?: any,
        public nSedeupd?: number,
        public personanatur?: BaseEntity,
    ) {
    }
}
