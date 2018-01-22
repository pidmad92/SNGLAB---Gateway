import { BaseEntity } from '../../../shared/index';
import { Componente } from './componente.model';
import { ComponenteDecimal } from './componenteDecimal.model';

export class Tabla2 implements BaseEntity {
    constructor(
        public id?: number,
        public descripcion?: string,
        public unidadmedida?: string,
        public componentes?: ComponenteDecimal[],
    ) {}
}
