import { BaseEntity } from './../../shared';

export class Resulnegoc implements BaseEntity {
    constructor(
        public id?: number,
        public nCodreneg?: number,
        public nCodfperf?: number,
        public tFecreneg?: any,
        public nAumento?: number,
        public nClausula?: number,
        public nGratifica?: number,
        public nAlimentac?: number,
        public nMovilidad?: number,
        public vUsuareg?: string,
        public tFecreg?: any,
        public nFlgactivo?: boolean,
        public nSedereg?: number,
        public vUsuaupd?: string,
        public tFecupd?: any,
        public nSedeupd?: number,
        public formperfil?: BaseEntity,
    ) {
        this.tFecreneg = '';
        this.nAumento = 0;
        this.nClausula = 0;
        this.nGratifica = 0;
        this.nAlimentac = 0;
        this.nMovilidad = 0;
        this.nFlgactivo = true;
    }
}
