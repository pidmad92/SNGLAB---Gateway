import { BaseEntity } from './../../shared';

export class Perreglab implements BaseEntity {
    constructor(
        public id?: number,
        public PerreglabId?: BaseEntity,
        public vUsuareg?: string,
        public tFecreg?: any,
        public nFlgactivo?: boolean,
        public nSedereg?: number,
        public vUsuaupd?: string,
        public tFecupd?: any,
        public nSedeupd?: number,
    ) {}
}
