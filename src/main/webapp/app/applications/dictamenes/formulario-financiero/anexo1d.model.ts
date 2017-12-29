import { BaseEntity } from '../../../shared/index';
import { Tabla } from './tabla.model';

export class Anexo1D implements BaseEntity {
    constructor(
        public id?: number,
        public listaGastosVentasDistribucion?: Tabla[],
        public listaGastosVenDistriServPorTerceros?: Tabla[],
        public listaGastosDiversionGestion?: Tabla[],
        public listaProvisiones?: Tabla[],
        public listaGastosAdministracion?: Tabla[],
        public listaGastosDentroAdminServPorTerceros?: Tabla[],
        public listaIngresosFinancieros?: Tabla[],
        public listaGastosFinancieros?: Tabla[],
        public listaOtrosIngresos?: Tabla[],
        public listaOtrosEgresos?: Tabla[],

        public totalGastosVentasDistribucion?: Tabla,
        public totalGastosVenDistriServPorTerceros?: Tabla,
        public totalGastosDiversionGestion?: Tabla,
        public totalProvisiones?: Tabla,
        public totalGastosAdministracion?: Tabla,
        public totalGastosDentroAdminServPorTerceros?: Tabla,
        public totalIngresosFinancieros?: Tabla,
        public totalGastosFinancieros?: Tabla,
        public totalOtrosIngresos?: Tabla,
        public totalOtrosEgresos?: Tabla,
    ) { }
}
