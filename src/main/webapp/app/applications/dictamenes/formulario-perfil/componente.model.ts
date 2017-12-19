import { BaseEntity } from '../../../shared/index';
import { MantenimientoAudienciaComponent } from '../../defensa/mantenimientos/index';

export class Componente implements BaseEntity {

        constructor(
            public id?: number,
            public declegal?: string,
            public componente?: string,
            public cantidad?: number,
        ) {
            declegal = '';
            componente = '';
            cantidad = 0;
        }
    }
