import { BaseEntity } from '../../../shared/index';
import { MantenimientoAudienciaComponent } from '../../defensa/mantenimientos/index';
import { Componente } from './componente.model';

export class Contrato implements BaseEntity {

        constructor(
            public id?: number,
            public codigo?: number,
            public anio?: number,
            public descripcion?: string,
            public componentes?: Componente[],
        ) {
            codigo = null;
            anio = 0;
            descripcion = '';
        }
    }
