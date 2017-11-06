import { BaseEntity } from './../../shared';

export class Activecono implements BaseEntity {
    constructor(
        public id?: number,
        public vCiuu?: string,
        public vDescripcion?: string,
        public vUsuarioreg?: string,
        public dFechareg?: any,
        public nEliminar?: number,
        public nSedereg?: number,
        public vUsuarioupd?: string,
        public dFechaupd?: any,
        public nSedeupd?: number,
        public personajurids?: BaseEntity[],
    ) {
    }
}
