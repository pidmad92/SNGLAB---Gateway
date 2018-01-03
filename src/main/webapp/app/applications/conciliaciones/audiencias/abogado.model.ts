import { BaseEntity } from './../../../shared';

export class Abogado implements BaseEntity {
    constructor(
        public id?: number,
        public vNomabogad?: string,
        public nCodabousu?: number,
        public nUsuareg?: number,
        public tFecreg?: any,
        public nFlgactivo?: boolean,
        public nSedereg?: number,
        public nUsuaupd?: number,
        public tFecupd?: any,
        public nSedeupd?: number,
        public oficina?: BaseEntity,
        public legajoasigs?: BaseEntity[],
        public legtipdocs?: BaseEntity[],
        public falsoexps?: BaseEntity[],
        public concilias?: BaseEntity[],
    ) {
        this.nFlgactivo = false;
    }
}
