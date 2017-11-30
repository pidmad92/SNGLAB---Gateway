import { BaseEntity } from './../../shared';

export class Multaconci implements BaseEntity {
    constructor(
        public id?: number,
        public fMonmulta?: number,
        public vNumresosd?: string,
        public dFecresosd?: any,
        public vCodigo?: string,
        public nUsuareg?: number,
        public tFecreg?: any,
        public nFlgactivo?: boolean,
        public nSedereg?: number,
        public nUsuaupd?: number,
        public tFecupd?: any,
        public nSedeupd?: number,
        public resolucrd?: BaseEntity,
    ) {
        this.nFlgactivo = false;
    }
}
