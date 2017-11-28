import { BaseEntity } from './../../shared';

export class Detmotden implements BaseEntity {
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
        public motidenun?: BaseEntity,
        public datdenus?: BaseEntity[],
    ) {
        this.nFlgactivo = false;
    }
}
