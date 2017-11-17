import { BaseEntity } from './../../shared';

export class Direcnotif implements BaseEntity {
    constructor(
        public id?: number,
        public vDireccion?: string,
        public cflgtrabajador?: string,
        public vHojaenvio?: string,
        public vUsuarioreg?: string,
        public dFechareg?: any,
        public nEliminar?: number,
        public nSedereg?: number,
        public vUsuarioupd?: string,
        public dFechaupd?: any,
        public nSedeupd?: number,
        public notificacion?: BaseEntity,
    ) {
    }
}
