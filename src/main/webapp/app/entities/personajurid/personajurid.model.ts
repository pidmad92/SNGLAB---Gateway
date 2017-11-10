import { BaseEntity } from './../../shared';

export class Personajurid implements BaseEntity {
    constructor(
        public id?: number,
        public vRazonsocial?: string,
        public vNombrealternativo?: string,
        public vNumdocumento?: string,
        public vEmail?: string,
        public vTelefono?: string,
        public vFax?: string,
        public cFlgestado?: string,
        public vUsuarioreg?: string,
        public dFechareg?: any,
        public nEliminar?: number,
        public nSedereg?: number,
        public vUsuarioupd?: string,
        public dFechaupd?: any,
        public nSedeupd?: number,
        public activecono?: BaseEntity,
        public perjuridires?: BaseEntity[],
        public empleadors?: BaseEntity[],
        public tipdocident?: BaseEntity,
    ) {
    }
}
