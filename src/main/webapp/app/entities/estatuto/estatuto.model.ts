import { BaseEntity } from './../../shared';

export class Estatuto implements BaseEntity {
    constructor(
        public id?: number,
        public vDesestatu?: string,
        public tFecestatu?: any,
        public blArchivoContentType?: string,
        public blArchivo?: any,
        public vEstado?: string,
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
