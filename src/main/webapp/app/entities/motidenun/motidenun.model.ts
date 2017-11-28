import { BaseEntity } from './../../shared';

export class Motidenun implements BaseEntity {
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
        public detmotdens?: BaseEntity[],
    ) {
        this.nFlgactivo = false;
    }
}
