import { BaseEntity } from './../../shared';

export class Datlaboral implements BaseEntity {
    constructor(
        public id?: number,
        public cFlgmantienesituacionlab?: string,
        public dFecvinculo?: any,
        public dFeccese?: any,
        public dFecfincontrato?: any,
        public vUsuarioreg?: string,
        public dFechareg?: any,
        public nEliminar?: number,
        public nSedereg?: number,
        public vUsuarioupd?: string,
        public dFechaupd?: any,
        public nSedeupd?: number,
        public dlabingpercs?: BaseEntity[],
        public atencions?: BaseEntity[],
        public empleador?: BaseEntity,
        public modacontrato?: BaseEntity,
        public motivocese?: BaseEntity,
        public trabajador?: BaseEntity,
        public subregilabo?: BaseEntity,
    ) {
    }
}
