import { BaseEntity } from './../../shared';

export class Bensocial implements BaseEntity {
    constructor(
        public id?: number,
        public vBensocial?: string,
        public nUsuareg?: number,
        public tFecreg?: any,
        public nFlgactivo?: boolean,
        public nSedereg?: number,
        public nUsuaupd?: number,
        public tFecupd?: any,
        public nSedeupd?: number,
        public calbensocs?: BaseEntity[],
    ) {
        this.nFlgactivo = false;
    }
}
