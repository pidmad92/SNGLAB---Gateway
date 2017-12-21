import { BaseEntity } from './../../shared';

export class Ususol implements BaseEntity {
    constructor(
        public id?: number,
        public vNombres?: string,
        public vTipousu?: string,
        public tFecenvio?: any,
        public vUsuareg?: string,
        public tFecreg?: any,
        public nFlgactivo?: boolean,
        public nSedereg?: number,
        public vUsuaupd?: string,
        public tFecupd?: any,
        public nSedeupd?: number,
        public ususolId?: BaseEntity,
        public solicitud?: BaseEntity
    ) {
        this.nFlgactivo = true;
    }
}
