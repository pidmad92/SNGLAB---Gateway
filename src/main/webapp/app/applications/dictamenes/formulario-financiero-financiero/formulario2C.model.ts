import { BaseEntity } from '../../../shared/index';
import { Tabla } from './tabla.model';

export class Formulario2C implements BaseEntity {
    constructor(
        public id?: number,
        // Tablas
        public listaACDisponible?: Tabla[],
        public listaACCateraCredNetos?: Tabla[],
        public listaACRefinanReestruc?: Tabla[],
        public listaACAtrasados?: Tabla[],
        public listaACOtros?: Tabla[],
        public listaANCCateraCredNetos?: Tabla[],
        public listaANCRefinanReestruc?: Tabla[],
        public listaANCAtrasados?: Tabla[],
        public listaANCOtros?: Tabla[],
        public listaPCOtros?: Tabla[],
        public listaPNCOtros?: Tabla[],
        // Totales
        public totalACOtros?: Tabla,
        public totalANCOtros?: Tabla,
        public totalACTotal?: Tabla,
        public totalANCTotal?: Tabla,
        public totalPCOtros?: Tabla,
        public totalPNCOtros?: Tabla,
    ) { }
}
