import { BaseEntity } from './../../../shared';
import { Perjuridica } from './../../../entities/perjuridica';
import { ComboModel } from '../../general/combobox.model';

export class FormregdenunciaModel implements BaseEntity {
    constructor(
        public id?: number,
        public desc_ciiu?: string,
        public desc_sectoeco?: string,
        public domicilioLegal?: string,
        public desc_estado?: string,
        public ddp_nombre?: string,
        public desc_dep?: string,
        public desc_prov?: string,
        public desc_dist?: string,
        public desc_tpoemp?: string,
        // a
        public ddp_tipvia?: string,
        public ddp_tipzon?: string,
        public ddp_nomvia?: string,
        public ddp_nomzon?: string,

        public flagLun?: boolean,
        public flagMar?: boolean,
        public flagMie?: boolean,
        public flagJue?: boolean,
        public flagVie?: boolean,
        public flagSab?: boolean,
        public flagDom?: boolean,
        public horaInicio?: boolean,
        public horaFin?: boolean,
        public numeroTrabajado?: boolean,
        public correoTrabajador?: boolean,
        public fechaCese?: string,
        public organizacionSindical?: string,
        public flagTrabajando?: boolean,
        public flagGruposindical?: boolean,
        public listaMotivos?: ComboModel[],
        public selectMotivos?: ComboModel,
        public listaDetalle?: ComboModel[],
        public selectDetalle?: ComboModel,
        public observaDenuncia?: string,
        public observaDenunciaDetalle?: string,
        public flagReservaIdentidad?: boolean,
        public flagDeclaracionVerdadera?: boolean
        // a
    ) {
        this.flagTrabajando = false;
        this.flagGruposindical = false;
        this.flagLun = false;
        this.flagMar = false;
        this.flagMie = false;
        this.flagJue = false;
        this.flagVie = false;
        this.flagSab = false;
        this.flagDom = false;
        this.flagReservaIdentidad = false;
    }
}
