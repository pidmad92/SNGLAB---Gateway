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
        public nBase?: number,
        public nUsuareg?: number,
        public tFecreg?: any,
        public nFlgactivo?: boolean,
        public nSedereg?: number,
        public nUsuaupd?: number,
        public tFecupd?: any,
        public nSedeupd?: number,
        public calbensoc?: BaseEntity,
        public interesperi?: BaseEntity,
        public calrcmperi?: BaseEntity,
        public estperical?: BaseEntity,
        public tipcalperi?: BaseEntity,
    ) {
        this.nFlgactivo = false;
    }
}
