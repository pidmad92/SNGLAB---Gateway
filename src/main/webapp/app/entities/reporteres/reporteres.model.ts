import { BaseEntity } from './../../shared';

export class Reporteres implements BaseEntity {
    constructor(
        public id?: number,
        public nCodrepre?: number,
        public vTiporep?: string,
        public vNombre?: string,
        public bArchivoContentType?: string,
        public bArchivo?: any,
        public vContype?: string,
        public vUsuareg?: string,
        public tFecreg?: any,
        public nFlgactivo?: boolean,
        public nSedereg?: number,
        public vUsuaupd?: string,
        public tFecupd?: any,
        public nSedeupd?: number,
    ) {
        this.nFlgactivo = false;
    }
}
