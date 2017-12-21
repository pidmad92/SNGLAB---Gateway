import { BaseEntity } from './../../shared';

export class Reglaboral implements BaseEntity {
    constructor(
        public id?: number,
        public nCodreglab?: number,
        public vDescreglab?: string,
        public vDesabrreg?: string,
        public nFlgpriv?: boolean,
        public nFlgpub?: boolean,
        public nOtros?: boolean,
        public vUsuareg?: string,
        public tFecreg?: any,
        public nFlgactivo?: boolean,
        public nSedereg?: number,
        public vUsuaupd?: string,
        public tFecupd?: any,
        public nSedeupd?: number,
        public formperfil?: BaseEntity,
    ) {
        this.nFlgactivo = true;
    }
}
