import { BaseEntity } from './../../shared';

export class Segsalud implements BaseEntity {
    constructor(
        public id?: number,
        public vSegsal?: string,
        public nUsuareg?: number,
        public tFecreg?: any,
        public nFlgactivo?: boolean,
        public nSedereg?: number,
        public nUsuaupd?: number,
        public tFecupd?: any,
        public nSedeupd?: number,
    ) {
        this.nFlgactivo = false;
    }
}
