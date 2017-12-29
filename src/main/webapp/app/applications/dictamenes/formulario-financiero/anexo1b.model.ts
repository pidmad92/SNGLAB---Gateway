import { BaseEntity } from '../../../shared/index';
import { Tabla } from './tabla.model';

export class Anexo1B implements BaseEntity {
    constructor(
        public id?: number,
        public listaProductos?: Tabla[],
    ) { }
}
