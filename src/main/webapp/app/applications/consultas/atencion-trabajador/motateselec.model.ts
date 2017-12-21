import { BaseEntity } from './../../../shared';

export class Motateselec implements BaseEntity {
    constructor(
        public id?: number,
        public vObsmoseat?: string,
        public nUsuareg?: number,
        public tFecreg?: any,
        public nFlgactivo?: boolean,
        public nSedereg?: number,
        public nUsuaupd?: number,
        public tFecupd?: any,
        public nSedeupd?: number,
        public atencion?: BaseEntity,
        public direcalter?: BaseEntity,
        public motatenofic?: BaseEntity,
    ) {
        this.nFlgactivo = false;
    }
}
