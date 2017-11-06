import { BaseEntity } from './../../shared';

export class Tipdocident implements BaseEntity {
    constructor(
        public id?: number,
        public vDescripcion?: string,
        public nNumdigitos?: number,
        public vDescripcioncorta?: string,
        public vUsuarioreg?: string,
        public dFechareg?: any,
        public nEliminar?: number,
        public nSedereg?: number,
        public vUsuarioupd?: string,
        public dFechaupd?: any,
        public nSedeupd?: number,
        public personanaturs?: BaseEntity[],
        public personajurids?: BaseEntity[],
    ) {
    }
}
