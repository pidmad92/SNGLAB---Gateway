import { BaseEntity } from './../../shared';

export class Docexpedien implements BaseEntity {
    constructor(
        public id?: number,
        public vNumoficio?: string,
        public dFechadoc?: any,
        public nFolios?: number,
        public vNumresord?: string,
        public nUsuareg?: number,
        public tFecreg?: any,
        public nFlgactivo?: boolean,
        public nSedereg?: number,
        public nUsuaupd?: number,
        public tFecupd?: any,
        public nSedeupd?: number,
        public expediente?: BaseEntity,
        public dettipprov?: BaseEntity,
        public tipdocexp?: BaseEntity,
        public tipproveid?: BaseEntity,
        public fecregistro?: string,
        public usuarioreg?: string,
        public observacion?: string,
    ) {
        this.nFlgactivo = false;
    }
}
