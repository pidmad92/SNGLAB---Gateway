import { BaseEntity } from './../../shared';

export class Formfinanc implements BaseEntity {
    constructor(
        public id?: number,
        public nCodffina?: number,
        public vCodform?: string,
        public vDesffina?: string,
        public vUndffina?: string,
        public nMonffina?: number,
        public nPorcffin?: number,
        public nAnioform?: number,
        public nMesform?: number,
        public vCodfila?: string,
        public vCodcolum?: string,
        public vUsuareg?: string,
        public tFecreg?: any,
        public nFlgactivo?: boolean,
        public nSedereg?: number,
        public vUsuaupd?: string,
        public tFecupd?: any,
        public nSedeupd?: number,
        public solFormularios?: BaseEntity[],
    ) {
        this.nFlgactivo = false;
    }
}
