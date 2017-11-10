import { BaseEntity } from './../../shared';

export class Atencion implements BaseEntity {
    constructor(
        public id?: number,
        public vObservacion?: string,
        public cFlgpresentaembarazo?: string,
        public cFlgestado?: string,
        public vNumeroticket?: string,
        public nCodtrabrepresentante?: number,
        public vUsuarioreg?: string,
        public dFechareg?: any,
        public nEliminar?: number,
        public nSedereg?: number,
        public vUsuarioupd?: string,
        public dFechaupd?: any,
        public nSedeupd?: number,
        public pase?: BaseEntity,
        public atendiscas?: BaseEntity[],
        public atenaccadops?: BaseEntity[],
        public atenmotiatens?: BaseEntity[],
        public datlaboral?: BaseEntity,
        public empleador?: BaseEntity,
        public tipatencion?: BaseEntity,
        public trabajador?: BaseEntity,
    ) {
    }
}
