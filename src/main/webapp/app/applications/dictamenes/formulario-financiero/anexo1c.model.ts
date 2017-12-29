import { BaseEntity } from '../../../shared/index';
import { Tabla } from './tabla.model';

export class Anexo1C implements BaseEntity {
    constructor(
        public id?: number,
        public listaMPNacional?: Tabla[],
        public listaMPImportada?: Tabla[],
        public subtotalMPNacional?: Tabla[],
        public subtotalMPImportada?: Tabla[],
        public listaGastosFinancieros?: Tabla[],
        public subtotalGastosFinancieros?: Tabla[],
        public ingresoTotalMP?: Tabla[],
    ) { }
}
