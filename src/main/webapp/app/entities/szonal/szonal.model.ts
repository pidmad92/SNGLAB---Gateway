import { BaseEntity } from './../../shared';

export class Szonal implements BaseEntity {
    constructor(
        public id?: number,
        public vDesszonal?: string,
        public vEstado?: string,
        public nUsuareg?: number,
        public tFecreg?: any,
        public nFlgactivo?: boolean,
        public nSedereg?: number,
        public nUsuaupd?: number,
        public tFecupd?: any,
        public nSedeupd?: number,
        public organizacios?: BaseEntity[],
    ) {
        this.nFlgactivo = false;
    }
}
