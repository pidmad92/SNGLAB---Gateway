import { BaseEntity } from '../../../shared/index';
import { Tabla } from './tabla.model';

export class Anexo1A implements BaseEntity {
    constructor(
        public id?: number,
        public listaNacional?: Tabla[],
        public listaInternacional?: Tabla[],
        public subtotalNacional?: Tabla[],
        public subtotalInternacional?: Tabla[],
        public ingresoTotal?: Tabla[],
    ) { }
}
