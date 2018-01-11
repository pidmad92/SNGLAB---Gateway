import { BaseEntity } from '../../../shared/index';
import { Tabla } from './tabla.model';

export class FormularioN3 implements BaseEntity {
    constructor(
        public id?: number,
        public listaGastosPersonal?: Tabla[],
    ) { }
}
