import { BaseEntity } from './../../shared';

export class Tipdoc implements BaseEntity {
    constructor(
        public id?: number,
        public vDestipdoc?: string,
        public nUsuareg?: number,
        public tFecreg?: any,
        public nFlgactivo?: boolean,
        public nSedereg?: number,
        public nUsuaupd?: number,
        public tFecupd?: any,
        public nSedeupd?: number,
        public documentos?: BaseEntity[],
    ) {
        this.nFlgactivo = false;
    }
}
