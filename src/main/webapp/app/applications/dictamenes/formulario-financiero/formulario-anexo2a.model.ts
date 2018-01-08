import { BaseEntity } from '../../../shared/index';
import { Tabla } from './tabla.model';

export class FormularioAnexo2A implements BaseEntity {
    constructor(
        public id?: number,
        public lista1?: Tabla[],
        public lista2?: Tabla[],
        public lista3?: Tabla[],
        public lista4?: Tabla[],
        public lista5?: Tabla[],
        public lista6?: Tabla[],
        public lista7?: Tabla[],
        public lista8?: Tabla,
        public lista9?: Tabla,
        // Totales
        public total1?: Tabla,
        public total2?: Tabla,
        public total3?: Tabla,
        public total4?: Tabla,
        public total5?: Tabla,
        public total6?: Tabla,
    ) { }
}
