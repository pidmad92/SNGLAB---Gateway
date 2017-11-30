import { BaseEntity } from './../../shared';

export class Document implements BaseEntity {
    constructor(
        public id?: number,
        public vNomdocume?: string,
        public blArchivoContentType?: string,
        public blArchivo?: any,
        public vObsdocume?: string,
        public vEstado?: string,
        public vTipodocum?: string,
        public tFecregist?: any,
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
