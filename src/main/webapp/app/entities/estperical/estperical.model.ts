import { BaseEntity } from './../../shared';

export class Estperical implements BaseEntity {
    constructor(
        public id?: number,
        public vNomestper?: string,
        public nUsuareg?: number,
        public tFecreg?: any,
        public nFlgactivo?: boolean,
        public nSedereg?: number,
        public nUsuaupd?: number,
        public tFecupd?: any,
        public nSedeupd?: number,
        public calperiodos?: BaseEntity[],
    ) {
        this.nFlgactivo = false;
    }
}
