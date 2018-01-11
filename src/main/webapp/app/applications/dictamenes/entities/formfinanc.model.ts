import { BaseEntity } from '../../../shared/index';

export class Formfinanc implements BaseEntity {
    constructor(
        public id?: number,
        public nCodffina?: number,
        public vUsuareg?: string,
        public tFecreg?: any,
        public nFlgactivo?: boolean,
        public nSedereg?: number,
        public vUsuaupd?: string,
        public tFecupd?: any,
        public nSedeupd?: number,
        public solFormularios?: BaseEntity[],
        public formfinancDetail?: BaseEntity[],
    ) {
        this.nFlgactivo = true;
    }
}
