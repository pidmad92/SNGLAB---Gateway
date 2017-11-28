import { BaseEntity } from './../../shared';

export class Calperiodo implements BaseEntity {
    constructor(
        public id?: number,
        public nCalper?: number,
        public nCalper2?: number,
        public nNumper?: number,
        public tFecini?: any,
        public tFecfin?: any,
        public nTnocomput?: number,
        public nDgozados?: number,
        public nDadeudos?: number,
        public nAnobase?: number,
        public nUsuareg?: number,
        public tFecreg?: any,
        public nFlgactivo?: boolean,
        public nSedereg?: number,
        public nUsuaupd?: number,
        public tFecupd?: any,
        public nSedeupd?: number,
        public calbensoc?: BaseEntity,
        public segsalud?: BaseEntity,
        public estperical?: BaseEntity,
        public tipcalperi?: BaseEntity,
    ) {
        this.nFlgactivo = false;
    }
}
