import { BaseEntity } from './../../shared';

export class Calidenu implements BaseEntity {
    constructor(
        public id?: number,
        public vUsuareg?: string,
        public tFecreg?: any,
        public nFlgactivo?: boolean,
        public nSedereg?: number,
        public vUsuaupd?: string,
        public tFecupd?: any,
        public nSedeupd?: number,
        public califica?: BaseEntity,
        public denuncias?: BaseEntity[],
    ) {
        this.nFlgactivo = false;
    }
}
