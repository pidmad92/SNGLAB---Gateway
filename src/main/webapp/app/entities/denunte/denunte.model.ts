import { BaseEntity } from './../../shared';

export class Denunte implements BaseEntity {
    constructor(
        public id?: number,
        public nCodusu?: number,
        public vFlgestado?: string,
        public vUsuareg?: string,
        public tFecreg?: any,
        public nFlgactivo?: boolean,
        public nSedereg?: number,
        public vUsuaupd?: string,
        public tFecupd?: any,
        public nSedeupd?: number,
        public pernatural?: BaseEntity,
        public dirdenuns?: BaseEntity[],
        public denuncias?: BaseEntity[],
    ) {
        this.nFlgactivo = false;
    }
}
