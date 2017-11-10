import { BaseEntity } from './../../shared';

export class Personanatur implements BaseEntity {
    constructor(
        public id?: number,
        public vNombres?: string,
        public vApepaterno?: string,
        public vApematerno?: string,
        public vNumdocumento?: string,
        public vTelefono?: string,
        public vCelular?: string,
        public vEmail?: string,
        public dFecnacimiento?: any,
        public csexo?: string,
        public cFlgestado?: string,
        public vUsuarioreg?: string,
        public dFechareg?: any,
        public nEliminar?: number,
        public nSedereg?: number,
        public vUsuarioupd?: string,
        public dFechaupd?: any,
        public nSedeupd?: number,
        public pernatudires?: BaseEntity[],
        public empleadors?: BaseEntity[],
        public trabajadors?: BaseEntity[],
        public sucesors?: BaseEntity[],
        public tipdocident?: BaseEntity,
    ) {
    }
}
