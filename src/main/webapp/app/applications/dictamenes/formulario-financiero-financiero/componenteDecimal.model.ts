import { BaseEntity } from '../../../shared/index';

export class ComponenteDecimal implements BaseEntity {
    constructor(
        public id?: number,
        public año?: number,
        public codigo?: string,
        public cantidad?: string,
        public vUsureg?: string,
        public tFecReg?: any,
        public nSedeReg?: number,
    ) {
        cantidad = '0';
    }
}
