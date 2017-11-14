import { BaseEntity } from './../../shared';

export class Trabajador implements BaseEntity {
    constructor(
        public id?: number,
        public vFlgsucesor?: string,
        public vUsuarioreg?: string,
        public dFechareg?: any,
        public nEliminar?: number,
        public nSedereg?: number,
        public vUsuarioupd?: string,
        public dFechaupd?: any,
        public nSedeupd?: number,
        public cargotrabaja?: BaseEntity,
        public personanatur?: BaseEntity,
        public expedientes?: BaseEntity[],
        public datlaborals?: BaseEntity[],
        public atencions?: BaseEntity[],
        public sucesors?: BaseEntity[],
    ) {
    }
}
