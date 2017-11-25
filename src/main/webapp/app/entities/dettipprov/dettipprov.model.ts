import { BaseEntity } from './../../shared';

export class Dettipprov implements BaseEntity {
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
        public docexpediens?: BaseEntity[],
        public tipproveid?: BaseEntity,
    ) {
        this.nFlgactivo = false;
    }
}
