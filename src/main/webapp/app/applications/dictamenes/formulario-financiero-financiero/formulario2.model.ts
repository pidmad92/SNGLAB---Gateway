import { BaseEntity } from '../../../shared/index';
import { Tabla } from './tabla.model';

export class Formulario2 implements BaseEntity {
    constructor(
        public id?: number,
        // Tablas
        public listaActivoCorriente?: Tabla[],
        public listaActivoNoCorriente?: Tabla[],
        public listaPasivoCorriente?: Tabla[],
        public listaPasivoNoCorriente?: Tabla[],
        public listaPatrimonio?: Tabla[],
        // Totales
        public totalActivo?: Tabla,
        public totalPasivo?: Tabla,
        public totalPasivoPatrimonio?: Tabla,
    ) { }
}
