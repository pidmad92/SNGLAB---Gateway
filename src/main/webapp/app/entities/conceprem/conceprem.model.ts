import { BaseEntity } from './../../shared';

export class Conceprem implements BaseEntity {
    constructor(
        public id?: number,
        public vNomconrem?: string,
        public nValconrem?: number,
        public nUsuareg?: number,
        public tFecreg?: any,
        public nFlgactivo?: boolean,
        public nSedereg?: number,
        public nUsuaupd?: number,
        public tFecupd?: any,
        public nSedeupd?: number,
        public calrcmperi?: BaseEntity,
        public conremsups?: BaseEntity[],
        public conceprem?: BaseEntity,
        public tipcalconre?: BaseEntity,
        public tipconrem?: BaseEntity,
    ) {
        this.nFlgactivo = false;
    }
}
