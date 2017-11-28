import { BaseEntity } from './../../shared';

export class Documento implements BaseEntity {
    constructor(
        public id?: number,
        public vDesdoc?: string,
        public nUsuareg?: number,
        public tFecreg?: any,
        public nFlgactivo?: boolean,
        public nSedereg?: number,
        public nUsuaupd?: number,
        public tFecupd?: any,
        public nSedeupd?: number,
        public docpresates?: BaseEntity[],
        public tipdoc?: BaseEntity,
    ) {
        this.nFlgactivo = false;
    }
}
