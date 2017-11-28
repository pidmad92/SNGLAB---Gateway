import { BaseEntity } from './../../shared';

export class Resolutor implements BaseEntity {
    constructor(
        public id?: number,
        public vNomresol?: string,
        public nCodresusu?: number,
        public nUsuareg?: number,
        public tFecreg?: any,
        public nFlgactivo?: boolean,
        public nSedereg?: number,
        public nUsuaupd?: number,
        public tFecupd?: any,
        public nSedeupd?: number,
        public expedientes?: BaseEntity[],
    ) {
        this.nFlgactivo = false;
    }
}
