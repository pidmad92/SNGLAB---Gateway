import { BaseEntity } from './../../shared';

export class Docexpedien implements BaseEntity {
    constructor(
        public id?: number,
        public vNumoficio?: string,
        public dFecha?: any,
        public nFolios?: number,
        public nNunresolucionrd?: string,
        public vUsuarioreg?: string,
        public dFechareg?: any,
        public nEliminar?: number,
        public nSedereg?: number,
        public vUsuarioupd?: string,
        public dFechaupd?: any,
        public nSedeupd?: number,
        public expediente?: BaseEntity,
        public dettipprov?: BaseEntity,
        public tipdocexp?: BaseEntity,
        public tipproveid?: BaseEntity,
    ) {
    }
}
