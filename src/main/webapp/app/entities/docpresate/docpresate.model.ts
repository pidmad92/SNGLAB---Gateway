import { BaseEntity } from './../../shared';

export class Docpresate implements BaseEntity {
    constructor(
        public id?: number,
        public vObsdopate?: string,
        public nUsuareg?: number,
        public tFecreg?: any,
        public nFlgactivo?: boolean,
        public nSedereg?: number,
        public nUsuaupd?: number,
        public tFecupd?: any,
        public nSedeupd?: number,
        public atencion?: BaseEntity,
        public documento?: BaseEntity,
    ) {
        this.nFlgactivo = false;
    }
}
