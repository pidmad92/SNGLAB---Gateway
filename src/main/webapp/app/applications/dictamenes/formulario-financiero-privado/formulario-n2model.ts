import { BaseEntity } from '../../../shared/index';
import { Tabla } from './tabla.model';

export class FormularioN2 implements BaseEntity {
    constructor(
        public id?: number,
        public listaActivoCorriente?: Tabla[],
        public listaActivoNoCorriente?: Tabla[],
        public listaPasivoCorriente?: Tabla[],
        public listaPasivoNoCorriente?: Tabla[],
        public listaPatrimonio?: Tabla[],
        // Totales
        public totalActivos?: Tabla,
        public totalPasivos?: Tabla,
        public totalPasivoPatrimonio?: Tabla,
    ) { }
}
