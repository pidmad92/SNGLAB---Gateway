import { BaseEntity } from './../../shared';

export class Calificacio implements BaseEntity {
    constructor(
        public id?: number,
        public vDescalifi?: string,
        public nPresento?: number,
        public nEnregla?: number,
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
