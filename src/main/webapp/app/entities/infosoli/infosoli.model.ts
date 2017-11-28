import { BaseEntity } from './../../shared';

export class Infosoli implements BaseEntity {
    constructor(
        public id?: number,
        public vInfosoli?: string,
        public tFecsoli?: any,
        public vRespuesta?: string,
        public tFecresp?: any,
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
