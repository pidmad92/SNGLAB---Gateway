import { BaseEntity } from '../../../shared/index';
import { Componente } from './componente.model';

export class Tabla implements BaseEntity {
    constructor(
        public id?: number,
        public descripcion?: string,
        public componentes?: Componente[],
    ) {}
}
