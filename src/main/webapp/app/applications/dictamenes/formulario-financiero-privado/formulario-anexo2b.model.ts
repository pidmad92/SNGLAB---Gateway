import { BaseEntity } from '../../../shared/index';
import { Tabla } from './tabla.model';

export class FormularioAnexo2B implements BaseEntity {
    constructor(
        public id?: number,
        public listaA?: Tabla[],
        public listaB?: Tabla[],
    ) { }
}
