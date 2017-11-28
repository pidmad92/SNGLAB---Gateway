import { BaseEntity } from './../../shared';

export class Docinperdlb implements BaseEntity {
    constructor(
        public id?: number,
        public nUsuareg?: number,
        public tFecreg?: any,
        public nFlgactivo?: boolean,
        public nSedereg?: number,
        public nUsuaupd?: number,
        public tFecupd?: any,
        public nSedeupd?: number,
        public datlab?: BaseEntity,
        public docingrper?: BaseEntity,
    ) {
        this.nFlgactivo = false;
    }
}
