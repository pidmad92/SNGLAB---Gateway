import { BaseEntity } from './../../../shared';

export class Motatenofic implements BaseEntity {
    constructor(
        public id?: number,
        public nUsuareg?: number,
        public tFecreg?: any,
        public nFlgactivo?: boolean,
        public nSedereg?: number,
        public nUsuaupd?: number,
        public tFecupd?: any,
        public nSedeupd?: number,
        public motate?: BaseEntity,
        public oficina?: BaseEntity,
        public motateselecs?: BaseEntity[],
        public motivPases?: BaseEntity[],
        public motivselec?: boolean,
    ) {
        this.nFlgactivo = false;
    }
}
