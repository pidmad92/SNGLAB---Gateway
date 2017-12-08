import { BaseEntity } from './../../../shared';
import { Perjuridica } from './../../../entities/perjuridica';
import { ComboModel } from '../../general/combobox.model';

export class RegdenuModel implements BaseEntity {
    constructor(
        public id?: number,
        public descciiu?: string,
        public descsectoeco?: string,
        public domicilioLegal?: string,
        public domicilio?: string,
        public descestado?: string,
        public ddpnombre?: string,
        public descdep?: string,
        public descprov?: string,
        public descdist?: string,
        public desctpoemp?: string,
        // a
        public coddep?: string,
        public coddist?: string,
        public codprov?: string,
        public ddptipvia?: string,
        public ddptipzon?: string,
        public ddpnomvia?: string,
        public ddpnomzon?: string,

        public flagOtradireccion?: boolean,
        public coddep_c?: string,
        public coddist_c?: string,
        public codprov_c?: string,
        public ddptipvia_c?: string,
        public ddptipzon_c?: string,
        public ddpnomvia_c?: string,
        public ddpnomzon_c?: string,
        public domicilioLegal_c?: string,
        public domicilio_c?: string,
        public descdep_c?: string,
        public descprov_c?: string,
        public descdist_c?: string,

        public flaglun?: boolean,
        public flagmar?: boolean,
        public flagmie?: boolean,
        public flagjue?: boolean,
        public flagvie?: boolean,
        public flagsab?: boolean,
        public flagdom?: boolean,
        public horainicio?: string,
        public horafin?: string,
        public numerotrabajado?: string,
        public correotrabajador?: string,
        public fechacese?: any,
        public organizacionsindical?: string,
        public flagtrabajando?: boolean,
        public flaggruposindical?: boolean,
        public listamotivos?: ComboModel[],
        public selectmotivos?: ComboModel,
        public listadetalle?: ComboModel[],
        public selectdetalle?: ComboModel,
        public selectDepa?: ComboModel,
        public selectProv?: ComboModel,
        public selectDist?: ComboModel,
        public selectVia?: ComboModel,
        public selectZona?: ComboModel,
        public observadenuncia?: string,
        public observadenunciadetalle?: string,
        public flagreservaidentidad?: boolean,
        public flagdeclaracionverdadera?: boolean,
        public fechainitrabajo?: any,
        // a
        public horainiinspec?: string,
        public horafininspec?: string,
        public filedenuncia?: any[],
    ) {
        this.flagtrabajando = true;
        this.flaggruposindical = false;
        this.flaglun = false;
        this.flagmar = false;
        this.flagmie = false;
        this.flagjue = false;
        this.flagvie = false;
        this.flagsab = false;
        this.flagdom = false;
        this.flagreservaidentidad = false;
        this.flagOtradireccion = false;
        this.filedenuncia = [];
    }
}