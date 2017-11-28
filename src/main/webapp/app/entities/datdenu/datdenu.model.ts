import { BaseEntity } from './../../shared';

export class Datdenu implements BaseEntity {
    constructor(
        public id?: number,
        public nNumtrbafe?: number,
        public vHoraini?: string,
        public vHorafin?: string,
        public vDesmotivo?: string,
        public vDesotro?: string,
        public bArchivoContentType?: string,
        public bArchivo?: any,
        public vArchtipo?: string,
        public vFlggreide?: boolean,
        public vUsuareg?: string,
        public tFecreg?: any,
        public nFlgactivo?: boolean,
        public nSedereg?: number,
        public vUsuaupd?: string,
        public tFecupd?: any,
        public nSedeupd?: number,
        public detmotden?: BaseEntity,
    ) {
        this.vFlggreide = false;
        this.nFlgactivo = false;
    }
}
