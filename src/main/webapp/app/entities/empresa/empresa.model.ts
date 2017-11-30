import { BaseEntity } from './../../shared';

export class Empresa implements BaseEntity {
    constructor(
        public id?: number,
        public cDesdocruc?: string,
        public vDesrazons?: string,
        public vDesdirecc?: string,
        public vEstado?: string,
        public nUbigeo?: number,
        public vTipoempre?: string,
        public nUsuareg?: number,
        public tFecreg?: any,
        public nFlgactivo?: boolean,
        public nSedereg?: number,
        public nUsuaupd?: number,
        public tFecupd?: any,
        public nSedeupd?: number,
        public organizacio?: BaseEntity,
    ) {
        this.nFlgactivo = false;
    }
}
