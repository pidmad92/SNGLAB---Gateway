import { BaseEntity } from '../../../shared/index';

export class FormfinancDetalle implements BaseEntity {
    constructor(
        public id?: number,
        public nCodffina?: number,
        public nCodfdetal?: number,
        public vUndffina?: string,
        public vCompone?: string,
        public nValffina?: number,
        public vDesffina?: string,
        public vUsuareg?: string,
        public tFecreg?: any,
        public nFlgactivo?: boolean,
        public nSedereg?: number,
        public vUsuaupd?: string,
        public tFecupd?: any,
        public nSedeupd?: number,
    ) {
        this.nFlgactivo = true;
    }
}
