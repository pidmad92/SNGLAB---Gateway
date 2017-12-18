import { BaseEntity } from './../../../shared';
import { Perjuridica } from './../../../entities/perjuridica';
import { ComboModel } from '../../general/combobox.model';

export class ConsinterModel implements BaseEntity {
    constructor(
        public id?: number,
        public serialize?: number,
        public codDenuncia?: string,
        public empleador?: string,
        public denunciante?: string,
        public origen?: string,
        public sectorEconomico?: string,
        public remipe?: string,
        public motivo?: string,
        public motivoDetalle?: string,
        public fecha?: string,
        public estado?: string,
        public groupheader?: string
    ) {
    }
}
