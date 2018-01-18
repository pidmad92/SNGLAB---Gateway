import { BaseEntity } from '../../../shared/index';
import { Tabla } from './tabla.model';

export class Formulario4 implements BaseEntity {
    constructor(
        public id?: number,
        // Tablas
        public listaCredCoorporativos?: Tabla[],
        public listaCredGrandesEmpresas?: Tabla[],
        public listaCredMedianasEmpresas?: Tabla[],
        public listaCredPequeniasEmpresas?: Tabla[],
        public listaCredMicroEmpresas?: Tabla[],
        public listaCredConsumo?: Tabla[],
        public listaCredHipotecariosVivienda?: Tabla[],
        public listaCredDirectosSoles?: Tabla[],
        // Totales
        public totalCredCoorporativos?: Tabla,
        public totalCredGrandesEmpresas?: Tabla,
        public totalCredMedianasEmpresas?: Tabla,
        public totalCredPequeniasEmpresas?: Tabla,
        public totalCredMicroEmpresas?: Tabla,
        public totalCredConsumo?: Tabla,
        public totalCredHipotecariosVivienda?: Tabla,
        public totalCredDirectos?: Tabla,
    ) { }
}
