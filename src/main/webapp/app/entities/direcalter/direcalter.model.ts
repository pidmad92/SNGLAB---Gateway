import { BaseEntity } from './../../shared';

export class Direcalter implements BaseEntity {
    constructor(
        public id?: number,
        public vRazsocial?: string,
        public vDireccion?: string,
        public nUsuareg?: number,
        public tFecreg?: any,
        public nFlgactivo?: boolean,
        public nSedereg?: number,
        public nUsuaupd?: number,
        public tFecupd?: any,
        public nSedeupd?: number,
        public motateselecs?: BaseEntity[],
    ) {
        this.nFlgactivo = false;
    }
}
