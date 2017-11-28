import { BaseEntity } from './../../shared';

export class Oridenu implements BaseEntity {
    constructor(
        public id?: number,
        public vDescripcion?: string,
        public vEstado?: string,
        public vUsuareg?: string,
        public tFecreg?: any,
        public nFlgactivo?: boolean,
        public nSedereg?: number,
        public vUsuaupd?: string,
        public tFecupd?: any,
        public nSedeupd?: number,
        public denuncias?: BaseEntity[],
    ) {
        this.nFlgactivo = false;
    }
}
