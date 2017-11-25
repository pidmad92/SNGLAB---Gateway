import { BaseEntity } from './../../shared';

export class Tipproveid implements BaseEntity {
    constructor(
        public id?: number,
        public vDescrip?: string,
        public nUsuareg?: number,
        public tFecreg?: any,
        public nFlgactivo?: boolean,
        public nSedereg?: number,
        public nUsuaupd?: number,
        public tFecupd?: any,
        public nSedeupd?: number,
        public tipdocexp?: BaseEntity,
        public dettipprovs?: BaseEntity[],
        public docexpediens?: BaseEntity[],
    ) {
        this.nFlgactivo = false;
    }
}
