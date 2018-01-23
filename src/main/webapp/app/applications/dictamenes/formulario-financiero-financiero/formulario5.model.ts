import { BaseEntity } from '../../../shared/index';
import { Tabla } from './tabla.model';
import { Tabla2 } from './tabla2.model';

export class Formulario5 implements BaseEntity {
    constructor(
        public id?: number,
        // Tablas
        public listaCredCoorporativos?: Tabla2[],
        public listaCredGrandesEmpresas?: Tabla2[],
        public listaCredMedianasEmpresas?: Tabla2[],
        public listaCredPequeniasEmpresas?: Tabla2[],
        public listaCredMicroEmpresas?: Tabla2[],
        public listaCredConsumo?: Tabla2[],
        public listaCredHipotecariosVivienda?: Tabla2[],
        // Totales
        public totalCredCoorporativos?: Tabla2,
        public totalCredGrandesEmpresas?: Tabla2,
        public totalCredMedianasEmpresas?: Tabla2,
        public totalCredPequeniasEmpresas?: Tabla2,
        public totalCredMicroEmpresas?: Tabla2,
        public totalCredConsumo?: Tabla2,
        public totalCredHipotecariosVivienda?: Tabla2,
    ) { }
}
