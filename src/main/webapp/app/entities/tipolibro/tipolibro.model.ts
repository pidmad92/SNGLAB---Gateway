import { BaseEntity } from './../../shared';

export class Tipolibro implements BaseEntity {
    constructor(
        public id?: number,
        public vDestlibro?: string,
        public vEstado?: string,
        public nUsuareg?: number,
        public tFecreg?: any,
        public nFlgactivo?: boolean,
        public nSedereg?: number,
        public nUsuaupd?: number,
        public tFecupd?: any,
        public nSedeupd?: number,
        public librosindics?: BaseEntity[],
    ) {
        this.nFlgactivo = false;
    }
}
