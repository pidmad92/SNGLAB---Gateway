import { BaseEntity } from './../../shared';

export class Calbensoc implements BaseEntity {
    constructor(
        public id?: number,
        public nCalbens?: number,
        public nCalbens2?: number,
        public nUsuareg?: number,
        public tFecreg?: any,
        public nFlgactivo?: boolean,
        public nSedereg?: number,
        public nUsuaupd?: number,
        public tFecupd?: any,
        public nSedeupd?: number,
        public bensocial?: BaseEntity,
        public calperiodos?: BaseEntity[],
        public liquidacion?: BaseEntity,
    ) {
        this.nFlgactivo = false;
    }
}
