import { BaseEntity } from '../../../shared/index';
import { Tabla } from './tabla.model';

export class Formulario6 implements BaseEntity {
    constructor(
        public id?: number,
        // Tablas
        public listaCreditos ?: Tabla[],
        public listaCreditosHipotecarios ?: Tabla[],
        public listaCreditosConsumo ?: Tabla[],
        // Totales
        public totalCreditos ?: Tabla,
    ) { }
}
