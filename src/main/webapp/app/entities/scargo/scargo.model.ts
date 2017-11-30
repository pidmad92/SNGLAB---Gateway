import { BaseEntity } from './../../shared';

export class Scargo implements BaseEntity {
    constructor(
        public id?: number,
        public vDesscargo?: string,
        public vEstado?: string,
        public nUsuareg?: number,
        public tFecreg?: any,
        public nFlgactivo?: boolean,
        public nSedereg?: number,
        public nUsuaupd?: number,
        public tFecupd?: any,
        public nSedeupd?: number,
        public afiliados?: BaseEntity[],
    ) {
        this.nFlgactivo = false;
    }
}
