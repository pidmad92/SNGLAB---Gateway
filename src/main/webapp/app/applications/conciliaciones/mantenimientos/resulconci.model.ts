import { BaseEntity } from './../../../shared';

export class Resulconci implements BaseEntity {
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
        public concilias?: BaseEntity[],
        public tipresconc?: BaseEntity,
    ) {
        this.nFlgactivo = false;
    }
}
