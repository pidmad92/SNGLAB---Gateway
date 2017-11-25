import { BaseEntity } from './../../shared';

export class Motfin implements BaseEntity {
    constructor(
        public id?: number,
        public vDescrip?: string,
        public vUsuareg?: string,
        public tFecreg?: any,
        public nFlgactivo?: boolean,
        public nSedereg?: number,
        public vUsuaupd?: string,
        public tFecupd?: any,
        public nSedeupd?: number,
        public denuncias?: BaseEntity[],
    ) {
        this.nFlgactivo = false;
    }
}
