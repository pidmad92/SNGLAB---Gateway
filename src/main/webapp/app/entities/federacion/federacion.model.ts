import { BaseEntity } from './../../shared';

export class Federacion implements BaseEntity {
    constructor(
        public id?: number,
        public tFecafilia?: any,
        public vEstado?: string,
        public cTipafilia?: string,
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
