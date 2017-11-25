import { BaseEntity } from './../../shared';

export class Tipzona implements BaseEntity {
    constructor(
        public id?: number,
        public vDescrip?: string,
        public vDesccorta?: string,
        public vUsuareg?: string,
        public tFecreg?: any,
        public nFlgactivo?: boolean,
        public nSedereg?: number,
        public vUsuaupd?: string,
        public tFecupd?: any,
        public nSedeupd?: number,
        public dirdenuns?: BaseEntity[],
        public denuncias?: BaseEntity[],
    ) {
        this.nFlgactivo = false;
    }
}
