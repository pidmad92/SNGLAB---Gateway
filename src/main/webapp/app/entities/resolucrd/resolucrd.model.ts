import { BaseEntity } from './../../shared';

export class Resolucrd implements BaseEntity {
    constructor(
        public id?: number,
        public vNumresolucionsd?: string,
        public dFecresolucionsd?: any,
        public vTipodocempleador?: string,
        public vDocempleador?: string,
        public vNomempleador?: string,
        public vTipodoctrabajador?: string,
        public vDoctrabajador?: string,
        public vNomtrabajador?: string,
        public vDireccion?: string,
        public vTelefono?: string,
        public dFechaconciliacion?: any,
        public vHoraconciliacion?: string,
        public dFechanotificacion?: any,
        public vNumnotificacion?: string,
        public fMonMulta?: number,
        public vUsuarioreg?: string,
        public dFechareg?: any,
        public nEliminar?: number,
        public nSedereg?: number,
        public vUsuarioupd?: string,
        public dFechaupd?: any,
        public nSedeupd?: number,
        public tippersona?: BaseEntity,
        public expediente?: BaseEntity,
        public multas?: BaseEntity[],
    ) {
    }
}
