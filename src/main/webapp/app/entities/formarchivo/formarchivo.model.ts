import { BaseEntity } from './../../shared';

export class Formarchivo implements BaseEntity {
    constructor(
        public id?: number,
        public nCodfarch?: number,
        public vDesform?: string,
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
        public solFormularios?: BaseEntity[],
    ) {
        this.nFlgactivo = false;
    }
}
