import { BaseEntity } from './../../../shared';

export class Sucesor implements BaseEntity {
    constructor(
        public id?: number,
        public vEstado?: string,
        public vCodpartid?: string,
        public nUsuareg?: number,
        public tFecreg?: any,
        public nFlgactivo?: boolean,
        public nSedereg?: number,
        public nUsuaupd?: number,
        public tFecupd?: any,
        public nSedeupd?: number,
        public pernatural?: BaseEntity,
        public trabajador?: BaseEntity,
    ) {
        this.nFlgactivo = false;
    }
}
