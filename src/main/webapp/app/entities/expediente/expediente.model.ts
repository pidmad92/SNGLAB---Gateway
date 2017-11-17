import { BaseEntity } from './../../shared';

export class Expediente implements BaseEntity {
    constructor(
        public id?: number,
        public vNumExpediente?: string,
        public nAnio?: number,
        public dFecregexp?: any,
        public vTipodocempleador?: string,
        public vDocempleador?: string,
        public vNomempleador?: string,
        public vTipodoctrabajador?: string,
        public vDoctrabajador?: string,
        public vNomtrabajador?: string,
        public cFlgexpobservado?: string,
        public vRegmesapartes?: string,
        public dFecmesapartes?: any,
        public vObservacion?: string,
        public cFlgarchivo?: string,
        public dFecArchivo?: any,
        public vObservacionarchivo?: string,
        public nCodusuarioarchivo?: number,
        public vNuminformearchivo?: string,
        public vUsuarioreg?: string,
        public dFechareg?: any,
        public nEliminar?: number,
        public nSedereg?: number,
        public vUsuarioupd?: string,
        public dFechaupd?: any,
        public nSedeupd?: number,
        public empleador?: BaseEntity,
        public tippersona?: BaseEntity,
        public trabajador?: BaseEntity,
        public conciliacions?: BaseEntity[],
        public docexpediens?: BaseEntity[],
        public resolucrds?: BaseEntity[],
        public notificacions?: BaseEntity[],
        public pase?: BaseEntity,
        public estexpedien?: BaseEntity,
        public resolutor?: BaseEntity,
    ) {
    }
}
