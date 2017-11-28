import { BaseEntity } from './../../shared';

export class Denuncia implements BaseEntity {
    constructor(
        public id?: number,
        public vCoddenu?: string,
        public vCodsececo?: string,
        public vCodciu?: string,
        public vDesremipe?: string,
        public vCoddepart?: string,
        public vCodprovin?: string,
        public vCoddistri?: string,
        public vDesvia?: string,
        public vDeszona?: string,
        public vDircomp?: string,
        public vDirdenu?: string,
        public tFecinitra?: any,
        public nFlaglun?: boolean,
        public nFlagmar?: boolean,
        public nFlagmie?: boolean,
        public nFlagjue?: boolean,
        public nFlagvie?: boolean,
        public nFlagsab?: boolean,
        public nFlagdom?: boolean,
        public tHorainit?: string,
        public tHorafint?: string,
        public vFlgtraba?: boolean,
        public vFlgrepre?: boolean,
        public tFeccese?: any,
        public vDesrepre?: string,
        public vObscalifi?: string,
        public vObsfin?: string,
        public vFlgestado?: string,
        public vUsuareg?: string,
        public tFecreg?: any,
        public nFlgactivo?: boolean,
        public nSedereg?: number,
        public vUsuaupd?: string,
        public tFecupd?: any,
        public nSedeupd?: number,
        public perjuridica?: BaseEntity,
        public denunte?: BaseEntity,
        public tipzona?: BaseEntity,
        public tipvia?: BaseEntity,
        public motfin?: BaseEntity,
        public infosoli?: BaseEntity,
        public calidenu?: BaseEntity,
        public oridenu?: BaseEntity,
        public datdenu?: BaseEntity,
    ) {
        this.nFlaglun = false;
        this.nFlagmar = false;
        this.nFlagmie = false;
        this.nFlagjue = false;
        this.nFlagvie = false;
        this.nFlagsab = false;
        this.nFlagdom = false;
        this.vFlgtraba = false;
        this.vFlgrepre = false;
        this.nFlgactivo = false;
    }
}
